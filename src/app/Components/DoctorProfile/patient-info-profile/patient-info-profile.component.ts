import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { AllowedPatientInfo } from 'src/app/Models/AllowedPatientInfo';
import { IllnessHistory } from 'src/app/Models/IllnessHistory';
import { MatPaginator } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { IllnessHistoryFilter } from 'src/app/Models/IllnessHistoryFilter';
import { HOST_URL } from 'src/app/config';
import { isUndefined } from 'typescript-collections/dist/lib/util';

@Component({
  selector: 'app-patient-info-profile',
  templateUrl: './patient-info-profile.component.html',
  styleUrls: ['./patient-info-profile.component.scss']
})
export class PatientInfoProfileComponent implements OnInit {
  userId: number;
  patient: AllowedPatientInfo;
  illnessHistories: IllnessHistory[] = [];
  filter: IllnessHistoryFilter;
  pageSize = 2;
  illnessHistoriesCount = 0;
  isProfileLoading = true;
  isIllnessHistoryLoading = true;
  defaultImage = '../../assets/img/default.png';
  avatarToShow: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activateRoute: ActivatedRoute,
    private docService: DoctorsService) {
    this.filter = new IllnessHistoryFilter();
    this.patient = new AllowedPatientInfo();
    this.avatarToShow = this.defaultImage;
  }

  ngOnInit() {
    this.userId = this.activateRoute.snapshot.params['id'];
    this.docService.getPatientInfo(this.userId).subscribe((patient) => {
      this.patient = patient;
      this.isProfileLoading = false;
      if (isUndefined(patient.avatarURL) || patient.avatarURL == null) {
        this.avatarToShow = this.defaultImage;
      } else {
        this.avatarToShow = HOST_URL + patient.avatarURL;
      }
    });

    this.paginator.pageSize = this.pageSize;

    this.paginator.page
      .pipe(
        switchMap(() => {
          this.isIllnessHistoryLoading = true;
          this.filter.pageIndex = this.paginator.pageIndex;
          this.filter.pageSize = this.paginator.pageSize;
          return this.docService.getPatientIllnessHistory(this.userId, this.filter);
        })
      ).subscribe(result => {
        console.log(result);
        this.illnessHistories = result.illnesses;
        this.illnessHistoriesCount = result.amount;
        for (const history of this.illnessHistories) {
          history.finishAppointmentTime = new Date();
          history.finishAppointmentTime.setTime(history.finishAppointmentTimeStamp);
        }
        this.isIllnessHistoryLoading = false;
      });
    this.paginator.page.emit();
  }

  onSearch($event) {
    this.paginator.pageIndex = 0;
    this.filter = $event;
    this.paginator.page.emit();
  }
}

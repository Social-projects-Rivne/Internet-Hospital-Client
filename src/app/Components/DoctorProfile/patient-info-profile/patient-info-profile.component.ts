import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { AllowedPatientInfo } from 'src/app/Models/AllowedPatientInfo';
import { IllnessHistory } from 'src/app/Models/IllnessHistory';
import { MatPaginator } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { IllnessHistoryFilter } from 'src/app/Models/IllnessHistoryFilter';

@Component({
  selector: 'app-patient-info-profile',
  templateUrl: './patient-info-profile.component.html',
  styleUrls: ['./patient-info-profile.component.scss']
})
export class PatientInfoProfileComponent implements OnInit {
  userId: number;
  patient: AllowedPatientInfo;
  illnessHistory: IllnessHistory;
  filter: IllnessHistoryFilter;
  pageSize = 5;
  isProfileLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activateRoute: ActivatedRoute,
    private docService: DoctorsService) { }

  ngOnInit() {
    this.userId = this.activateRoute.snapshot.params['id'];
    this.docService.getPatientInfo(this.userId).subscribe((patient) => this.patient = patient);

    this.paginator.pageSize = this.pageSize;
    // this.paginator.page
    //   .pipe(
    //     switchMap(() => {
    //       this.isProfileLoading = true;
    //       this.filter.pageIndex = this.paginator.pageIndex;
    //       this.filter.pageSize = this.paginator.pageSize;
    //       return this.appService.getAllDoctorAppointments(this.filter);
    //     })
    //   ).subscribe(result => {
    //     this.appointments = result.appointments;
    //     this.appointmentCount = result.quantity;
    //     this.isProfileLoading = false;
    //   });
  }

}

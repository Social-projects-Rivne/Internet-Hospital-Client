import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersProfileService } from '../../../Services/users-profile.service';
import { ImageValidationService } from '../../../Services/image-validation.service';
import { NotificationService } from '../../../Services/notification.service';
import { HOST_URL } from '../../../config';
import { IllnessHistory } from 'src/app/Models/IllnessHistory';
import { ICurrentUser } from '../../../Models/CurrentUser';
import { PatientSettings } from '../../../Models/ProfileSettings/PatientSettings';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { Patient } from '../../../Models/Patient';
import { IllnessHistoryFilter } from '../../../Models/IllnessHistoryFilter';
import { PaginationService } from '../../../Services/pagination.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { UpdatePatientService } from '../../../Services/update-patient.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Observable } from 'rxjs';

const TOKEN = 'currentUser';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {

  constructor(private patientService: UsersProfileService, private imageValidator: ImageValidationService,
    private notification: NotificationService, private storage: LocalStorageService,
    private pagService: PaginationService, private updateService: UpdatePatientService,
    private authenticationService: AuthenticationService) {
  }
  private filter: IllnessHistoryFilter;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  isPatient: Observable<boolean>;
  showLikeRow = true;
  user: ICurrentUser;
  token = TOKEN;
  patient: Patient = null;
  tempHistory: IllnessHistory[] = null;

  defaultImage = '../../assets/img/default.png';
  fileAvatar: File = null;
  imageToShow = this.defaultImage;

  patientSettings = PatientSettings;

  currentMenuItem = 1;

  changeSettings(id: number) {
    this.currentMenuItem = id;
  }

  getImageFromService() {
    this.patientService.getImage().subscribe((data: any) => {
      this.imageToShow = HOST_URL + data.avatarURL;
    }
    );
  }

  ngOnInit() {
    this.isPatient = this.authenticationService.isPatient();
    let stringDate: string;
    this.patientService.getProfile().subscribe((profile: any) => { this.patient = profile,
       this.updateService.patient = profile,
       stringDate = new DatePipe('en-US').transform(profile.birthDate, 'MMMM d, y');
       this.patient.birthDate = stringDate;
       this.updateService.setCurrentProfile(); });
    this.patientService.getHistories();
    this.getImageFromService();
    this.filter = new IllnessHistoryFilter();
  }
  onSearch($event) {
    this.filter = $event;
    this.filter.CheckIfPropertyExist();
    this.paginator.firstPage();
    const event = new PageEvent();
    event.pageSize = this.pagService.pageSize;
    event.pageIndex = this.pagService.pageIndex - 1;
    event.length = this.patientService.illnessHistoriesAmount;
    this.pageSwitch(event);
  }
  pageSwitch(event: PageEvent) {
    this.pagService.change(event);
    this.patientService.httpOptions.params = this.patientService.httpOptions.params.set('page', this.pagService.pageIndex.toString());
    if (this.filter.isWithParams === true) {
      this.patientService.getHistories(this.filter.fromDate, this.filter.toDate);
    } else {
      this.patientService.getHistories();
    }
  }

  getAvatar(files: FileList) {
    this.fileAvatar = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files.item(0));

    reader.onload = (event: any) => {
      if (this.imageValidator.isImageFile(event.target.result)) {
        this.patientService.updateAvatar(this.fileAvatar).subscribe(_ => {
          this.imageToShow = event.target.result;

          this.user = JSON.parse(localStorage.getItem(this.token));

          this.patientService.getImage().subscribe((data: any) => {
            this.user.user_avatar = data.avatarURL;
            this.storage.setItem(this.token, JSON.stringify(this.user), data.avatarURL);
          });
        });
      } else {
        this.notification.error('Only image file is acceptable!');
      }
    };
  }
}

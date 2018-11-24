import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersProfileService } from '../../../Services/users-profile.service';
import { ImageValidationService } from '../../../Services/image-validation.service';
import { NotificationService } from '../../../Services/notification.service';
import { DoctorsService } from '../../../Services/doctors.service';
import { HOST_URL } from '../../../config';
import { IllnessHistory } from '../../../Models/Illness-history';
import { ICurrentUser } from '../../../Models/CurrentUser';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { Patient } from '../../../Models/Patient';
import { DoctorFilter } from '../../../Models/DoctorFilter';
import { PaginationService } from '../../../Services/pagination.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

const TOKEN = 'currentUser';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {

  constructor(private patientService: UsersProfileService, private imageValidator: ImageValidationService,
    private notification: NotificationService, private doctorService: DoctorsService, private storage: LocalStorageService,
    private pagService: PaginationService) {
  }
  // firstName = 'Vasul';
  // secondName = 'Pochtarenko';
  // lastName = 'Ivanovich';
  // today = new Date();
  // date = this.today.getDate() + '/' + this.today.getMonth() + '/' + this.today.getFullYear();


  private filter: DoctorFilter;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  user: ICurrentUser;
  token = TOKEN;
  patient: Patient;

  tempHistory: IllnessHistory[] = null;
  //  = [
  //   { id: 2, patientId: 4, doctorId: 2, dateTime: this.date, diagnosis: 'Cancer', symptoms: 'Feels bad', treatment: 'Drink tea' },
  //   { id: 2, patientId: 4, doctorId: 2, dateTime: this.date, diagnosis: 'Cancer', symptoms: 'Feels bad', treatment: 'Drink tea' },
  //   { id: 2, patientId: 4, doctorId: 2, dateTime: this.date, diagnosis: 'Cancer', symptoms: 'Feels bad', treatment: 'Drink tea' },
  //   { id: 2, patientId: 4, doctorId: 2, dateTime: this.date, diagnosis: 'Cancer', symptoms: 'Feels bad', treatment: 'Drink tea' },
  // ];

  tempText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
   Dolorum nulla harum architecto velit saepe cumque amet voluptas rem repellat dignissimos dicta,
   quasi a, recusandae, nesciunt dolores aperiam eius tempore ad.`;

  defaultImage = '../../assets/img/default.png';
  fileAvatar: File = null;
  imageToShow = this.defaultImage;

  getImageFromService() {
    this.patientService.getImage().subscribe((data: any) => {
      this.imageToShow = HOST_URL + data.avatarURL, console.log(data);
    }
    );
  }

  ngOnInit() {
    // this.filter = new DoctorFilter;
    console.log('work');
    this.patientService.getProfile().subscribe((profile: any) => { this.patient = profile,
       this.tempHistory = this.patient.illnessHistory, console.log(profile); });
    // let dateToShow = formatDate(this.patient.birthDate, )
    // this.patient.birthDate = formatDate()
    this.getImageFromService();
    this.doctorService.getSpecializations();
  }
  // onSearch($event) {
  //   this.filter = $event;
  //   this.filter.CheckIfPropertyExist();
  //   this.paginator.firstPage();
  //   const event = new PageEvent();
  //   event.pageSize = this.pagService.pageSize;
  //   event.pageIndex = this.pagService.pageIndex - 1;
  //   // event.length = this.service.doctorsAmount;
  //   // this.pageSwitch(event);
  // }
  // pageSwitch(event: PageEvent) {
  //   this.pagService.change(event);
  //   this.service.httpOptions.params = this.service.httpOptions.params.set('page', this.pagService.pageIndex.toString());
  //   if (this.filter.isWithParams === true) {
  //     this.service.getDoctors(this.filter.searchKey, + this.filter.selectedSpecialization);
  //   } else {
  //     this.service.getDoctors();
  //   }
  //   window.scroll(0, 0);
  // }

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

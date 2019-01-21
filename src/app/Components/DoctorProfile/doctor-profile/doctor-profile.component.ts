import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../../Services/doctors.service';
import { DoctorDetails } from '../../../Models/DoctorDetails';
import { HOST_URL } from '../../../config';
import { ImageValidationService } from '../../../Services/image-validation.service';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { ICurrentUser } from '../../../Models/CurrentUser';
import { NotificationService } from '../../../Services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Specialization } from '../../../Models/Specialization';
import { DoctorSettings } from 'src/app/Models/ProfileSettings/DoctorSettings';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication.service';

const TOKEN = 'currentUser';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  doctor: DoctorDetails;
  defaultImage = '../../assets/img/default.png';
  fileAvatar: File = null;
  imageToShow = this.defaultImage;
  specializations: Specialization[];
  isApprovedDoctor: Observable<boolean>;
  user: ICurrentUser;
  token = TOKEN;

  doctorSettings = DoctorSettings;
  currentMenuItem = 1;

  changeSettings(id: number) {
    this.currentMenuItem = id;
  }

  getImageFromService() {
    this.doctorService.getImage().subscribe((data: any) => {
      this.imageToShow = HOST_URL + data.avatarURL;
    },
    error => {
      this.notification.error('Error');
    });
  }
  constructor(private doctorService: DoctorsService, private imageValidator: ImageValidationService,
    private storage: LocalStorageService, private notification: NotificationService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isApprovedDoctor = this.authenticationService.isApprovedDoctor();
    this.getImageFromService();
    this.doctorService.getDoctor().subscribe(
      (data: any) => {
        this.doctor = data;
      });
  }

  getAvatar(files: FileList) {
    this.fileAvatar = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(files.item(0));
    reader.onload = (event: any) => {
      if (this.imageValidator.isImageFile(event.target.result)) {
        this.doctorService.updateAvatar(this.fileAvatar).subscribe(_ => {
          this.imageToShow = event.target.result;

          this.user = JSON.parse(localStorage.getItem(this.token));

          this.doctorService.getImage().subscribe((data: any) => {
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

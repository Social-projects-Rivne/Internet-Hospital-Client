import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersProfileService } from '../../../Services/users-profile.service';
import { ImageValidationService } from '../../../Services/image-validation.service';
import { NotificationService } from '../../../Services/notification.service';
import { HOST_URL } from '../../../config';
import { IllnessHistory } from '../../../Models/Illness-history';
import { ICurrentUser } from '../../../Models/CurrentUser';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { Patient } from '../../../Models/Patient';
import { IllnessHistoryFilter } from '../../../Models/IllnessHistoryFilter';
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
    private notification: NotificationService, private storage: LocalStorageService,
    private pagService: PaginationService) {
  }
  private filter: IllnessHistoryFilter;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  showLikeRow = true;
  user: ICurrentUser;
  token = TOKEN;
  patient: Patient;

  tempHistory: IllnessHistory[] = null;

  tempText = `Lorem ipsum dolor sit amet consectetur adipisicing elit.
   Dolorum nulla harum architecto velit saepe cumque amet voluptas rem repellat dignissimos dicta,
   quasi a, recusandae, nesciunt dolores aperiam eius tempore ad.`;

  defaultImage = '../../assets/img/default.png';
  fileAvatar: File = null;
  imageToShow = this.defaultImage;

  getImageFromService() {
    this.patientService.getImage().subscribe((data: any) => {
      this.imageToShow = HOST_URL + data.avatarURL;
    }
    );
  }

  ngOnInit() {
    this.patientService.getProfile().subscribe((profile: any) => { this.patient = profile,
       this.tempHistory = this.patient.illnessHistory; });
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

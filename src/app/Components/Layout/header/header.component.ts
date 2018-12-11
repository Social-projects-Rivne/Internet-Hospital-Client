import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Observable } from 'rxjs';
import { HOST_URL } from '../../../config';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private storage: LocalStorageService,
              private message: MessageService) { }

  isLoggedIn: Observable<boolean>;
  isPatient: Observable<boolean>;
  isDoctor: Observable<boolean>;
  isModerator: Observable<boolean>;
  isAdmin: Observable<boolean>;
  ifUnread: Observable<boolean>;
  unreadCount: Observable<number>;
  userAvatar: string;
  defaultImage = '../../assets/img/default.png';
  notifications = [];
  page = 1;
  load = false;

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.isPatient = this.authenticationService.isPatient();
    this.isDoctor = this.authenticationService.isDoctor();
    this.isModerator = this.authenticationService.isModerator();
    this.isAdmin = this.authenticationService.isAdmin();
    this.ifUnread = this.message.ifUnread();
    this.unreadCount = this.message.unreadCount();
    this.authenticationService.getAvatarURL()
      .subscribe(value => this.userAvatar = value);

    this.storage.watchStorage().subscribe((data: any) => {
      this.userAvatar = HOST_URL + data;
    });
    if (this.authenticationService.hasAccessToken()) {
      this.message.startConnection();
    }
  }

  onScroll() {
    this.page = this.page + 1;
    this.getItems();
  }

  menuOpened() {
    this.getItems();
  }

  menuClosed() {
    this.page = 1;
    this.notifications = [];
  }

  addItems(res) {
    if (res !== undefined) {
      res.forEach(item => {
        this.notifications.push(item);
      });
    }
  }

  getItems() {
    this.load = true;
    this.message.getNotifications(this.page)
      .subscribe((data: any) => {
        this.addItems(data.entities);
        this.load = false;
      },
      () => {
        this.load = false;
      });
  }

  changeStatus(item: any) {
    this.message.changeStatus(item.id)
    .subscribe(() => {
      item.isRead = !item.isRead;
    });
  }
}

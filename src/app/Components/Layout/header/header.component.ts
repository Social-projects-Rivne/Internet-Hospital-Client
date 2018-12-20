import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Observable } from 'rxjs';
import { HOST_URL, LOAD_PAGES } from '../../../config';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;
  constructor(private authenticationService: AuthenticationService,
    private storage: LocalStorageService,
    private messageService: MessageService) { }

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
  endofload = false;

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.isPatient = this.authenticationService.isPatient();
    this.isDoctor = this.authenticationService.isDoctor();
    this.isModerator = this.authenticationService.isModerator();
    this.isAdmin = this.authenticationService.isAdmin();
    this.ifUnread = this.messageService.ifUnread();
    this.unreadCount = this.messageService.unreadCount();
    this.authenticationService.getAvatarURL()
      .subscribe(value => this.userAvatar = value);

    this.storage.watchStorage().subscribe((data: any) => {
      this.userAvatar = HOST_URL + data;
    });
  }

  onScroll() {
    this.page++;
    this.getItems();
  }

  menuOpened() {
    this.page = 1;
    this.notifications = [];
    this.endofload = false;
    this.getItems();
  }

  menuClosed() {
    if (this.page === 2) {
      this.panel.nativeElement.scrollTop += 8000;
    }
  }

  addItems(res) {
    res.entities.forEach(item => {
      this.notifications.push(item);
    });
    if (res.entityAmount === LOAD_PAGES && this.page === 2) {
      this.endofload = true;
    }
  }

  getItems() {
    this.load = true;
    this.messageService.getNotifications(this.page, LOAD_PAGES)
      .subscribe((data: any) => {
        this.addItems(data);
        this.load = false;
      },
        () => {
          this.load = false;
        });
  }

  changeStatus(item: any) {
    this.messageService.changeStatus(item.id)
      .subscribe(() => {
        item.isRead = !item.isRead;
      });
  }

  checkAll() {
    this.load = true;
    this.messageService.checkAllNotifications()
      .subscribe(() => {
        this.notifications.forEach(item => {
          item.isRead = true;
        });
        this.load = false;
      },
        () => {
          this.load = false;
        });
  }
}

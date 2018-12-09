import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Observable } from 'rxjs';
import { HOST_URL, API_DOCTORS } from '../../../config';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private storage: LocalStorageService, private http: HttpClient) { }

  isLoggedIn: Observable<boolean>;
  isPatient: Observable<boolean>;
  isDoctor: Observable<boolean>;
  isModerator: Observable<boolean>;
  isAdmin: Observable<boolean>;
  userAvatar: string;
  defaultImage = '../../assets/img/default.png';
  testArray = [];
  page = 1;
  url = HOST_URL + API_DOCTORS;
  load = false;

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.isPatient = this.authenticationService.isPatient();
    this.isDoctor = this.authenticationService.isDoctor();
    this.isModerator = this.authenticationService.isModerator();
    this.isAdmin = this.authenticationService.isAdmin();
    this.authenticationService.getAvatarURL()
      .subscribe(value => this.userAvatar = value);

    this.storage.watchStorage().subscribe((data: any) => {
      this.userAvatar = HOST_URL + data;
    });
  }

  onScroll() {
    console.log('Scrolled');
    this.page = this.page + 1;
    this.getItems();
  }

  menuOpened() {
    this.load = true;
    this.getItems();
  }

  menuClosed() {
    this.page = 1;
    this.testArray = [];
  }

  success(res) {
    console.log(res);
    if (res !== undefined) {
      res.forEach(item => {
        this.testArray.push(item);
      });
    }
  }

  getItems() {
    this.http.get('https://localhost:44357/api/notification' + '?page=' + this.page.toString() + '&pagecount=' + 5)
      .subscribe((data: any) => {
        console.log(data);
        this.success(data.entities);
        this.load = false;
      },
      error => {
        this.load = false;
      });
  }

  changeStatus(item: any) {
    console.log(item);
    this.http.patch('https://localhost:44357/api/notification/change', item.id).subscribe(() => {
      item.isRead = !item.isRead;
    });
  }
}

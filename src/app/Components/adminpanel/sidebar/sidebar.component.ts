import { Component, OnInit } from '@angular/core';
import { CONTENTS, MODERATORS_MNG, REQUESTS_MNG, USERS_MNG } from '../routesConfig';
import { ADMIN_PANEL } from '../../../config';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAdmin: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService) { }

  users = '/'  + ADMIN_PANEL +  '/' + USERS_MNG;
  moders = '/'  + ADMIN_PANEL +  '/' + MODERATORS_MNG;
  contents = '/' + ADMIN_PANEL + '/' + CONTENTS;
  requests = '/' + ADMIN_PANEL + '/' + REQUESTS_MNG;

  ngOnInit() {
    this.isAdmin = this.authenticationService.isAdmin();
  }
}

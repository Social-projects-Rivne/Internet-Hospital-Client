import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { NotificationService } from '../notification.service';
import { HOST_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  url = HOST_URL + '/api/UserList/';

  constructor(private _http: HttpClient) { }

  getUserList() {
    const typeUrl = this.url + 'UserList';
    return this._http.get(typeUrl);
  }

}

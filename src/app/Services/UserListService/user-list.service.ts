import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { HOST_URL } from 'src/app/config';
import { UserListModel } from 'src/app/Models/UserListModel';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  url = HOST_URL + '/api/userlist';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getUserList() {
    const typeUrl = this.url;
    return this.http.get(typeUrl, this.httpOptions);
  }

  StatusConverter(Users: UserListModel[]) {
    Users.forEach(element => {
      if (element.statusId === 1) {
        element.statusName = 'Banned';
        element.statusDescription = 'Banned user who has violated our rules';
      }
      if (element.statusId === 2) {
        element.statusName = 'New';
        element.statusDescription = 'New user registered in our system';
      }
      if (element.statusId === 3) {
        element.statusName = 'Approved';
        element.statusDescription = 'Approved user with checked data';
      }
      if (element.statusId === 4) {
        element.statusName = 'Not approved';
        element.statusDescription = 'Not approved, because user`s data was invalid';
      }
      if (element.statusId === 5) {
        element.statusName = 'Deleted';
        element.statusDescription = 'Deleted user by admin';
      }
      if (element.statusId === 6) {
        element.statusName = 'Active';
        element.statusDescription = 'Active moderator';
      }
    });
    return Users;
  }

}

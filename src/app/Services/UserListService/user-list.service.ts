import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { HOST_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  url = HOST_URL + '/api/userlist';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};

  constructor(private http: HttpClient) { }

  getUserList() {
    const typeUrl = this.url;
    return this.http.get(typeUrl, this.httpOptions);
  }

}

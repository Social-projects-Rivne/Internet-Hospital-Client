import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CreatingModerator } from '../../../Models/CreatingModerator';
import { HOST_URL } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  url = HOST_URL + '/api/Moderator';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  postModerator(moderator: CreatingModerator) {
    const body = JSON.stringify(moderator);
    return this.http.post<CreatingModerator>(this.url, body, this.httpOptions);
  }
}

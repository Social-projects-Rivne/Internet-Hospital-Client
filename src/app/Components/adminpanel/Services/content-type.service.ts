import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { HOST_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {

  url = HOST_URL + '/api/Article/type';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  createContentType(typeName: string) {
    return this.http.post(this.url, typeName, this.httpOptions);
  }

  getContentType() {
    return this.http.get(this.url);
  }
}

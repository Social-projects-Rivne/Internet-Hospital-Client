import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { HOST_URL } from '../../../config';

import { Content } from '../../../Models/Content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  url = HOST_URL + '/api/Content';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  putContent(content: Content) {
    const formData = new FormData();
    for (let i = 0; i < content.images.length; ++i) {
      formData.append('Images', content.images[i]);
    }
    formData.append('Id', content.id.toString());
    formData.append('Title', content.title);
    formData.append('Body', content.body);
    formData.append('Source', content.source);

    // place method for sending
  }
}
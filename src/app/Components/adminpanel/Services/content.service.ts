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
    for (let i = 0; i < content.slides.length; ++i) {
      formData.append('Images', content.slides[i]);
    }
    formData.append('Id', content.id.toString());
    formData.append('Title', content.title);
    formData.append('Body', content.shortBody);
    formData.append('Article', content.article.toString());
    // formData.append('Types', content.types);

    // place method for sending
  }
}

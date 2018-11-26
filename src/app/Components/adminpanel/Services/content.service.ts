import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { HOST_URL } from '../../../config';

import { CreatingContent } from '../../../Models/Content/CreatingContent';

@Injectable({
  providedIn: 'root'
})

export class ContentService {

  url = HOST_URL + '/api/Article';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private http: HttpClient) { }

  postContent(content: CreatingContent) {
    const formData = new FormData();
    formData.append('title', content.title);
    formData.append('article', content.article);
    formData.append('shortDescription', content.shortDescription);
    for (let i = 0; i < content.typeIds.length; ++i) {
      formData.append('typeIds', content.typeIds[i].toString());
    }
    for (let i = 0; i < content.articlePreviewAttachments.length; ++i) {
      formData.append( 'articlePreviewAttachment', content.articlePreviewAttachments[i]);
    }
    for (let i = 0; i < content.articlePreviewAttachments.length; ++i) {
      formData.append( 'articleAttachment', content.articleAttachments[i]);
    }
    console.log(formData);
    console.log(content);
    console.log(this.url);
    return this.http.post(this.url, formData);
  }
}

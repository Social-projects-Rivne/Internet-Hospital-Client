import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { HOST_URL } from 'src/app/config';

import { CreatingContent } from 'src/app/Models/Content/CreatingContent';
import { ContentModerateFilters } from 'src/app/Models/Content/ContentModerateFilters';

const PAGE = 'page';
const PAGE_SIZE = 'pageSize';
const SEARCH = 'search';
const INCLUDE_ONLY_ACTIVE = 'includeOnlyActive';
const FROM = 'from';
const TO = 'to';
const TYPE_IDS = 'typeIds';

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

  getShortModeratorContent(filters: ContentModerateFilters) {
    let url = this.url + `?${PAGE}=${filters.page + 1}`
              + `&${PAGE_SIZE}=${filters.pageSize}`
              + `&${INCLUDE_ONLY_ACTIVE}=${filters.includeAll}`;
    if (filters.search) {
      url += `&${SEARCH}=${filters.search}`;
    }
    if (filters.from) {
      url += `&${FROM}=${filters.from}`;
    }
    if (filters.to) {
      url += `&${TO}=${filters.to}`;
    }
    if (filters.typeIds && filters.typeIds.length > 0) {
      url += `&${TYPE_IDS}=${ filters.typeIds ? filters.typeIds.join(TYPE_IDS) : ''}`;
    }
    return this.http.get(url);
  }
}

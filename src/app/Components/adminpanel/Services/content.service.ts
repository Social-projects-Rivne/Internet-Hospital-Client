import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { HOST_URL } from 'src/app/config';

import { CreatingContent } from 'src/app/Models/Content/CreatingContent';
import { EditedContent } from 'src/app/Models/Content/EditedContent';
import { ContentModerateFilters } from 'src/app/Models/Content/ContentModerateFilters';

const PAGE = 'page';
const PAGE_SIZE = 'pageSize';
const SEARCH = 'search';
const INCLUDE_ONLY_ACTIVE = 'includeOnlyActive';
const FROM = 'from';
const TO = 'to';
const TYPE_IDS = 'typeIds';

const MODERATE_URL_PART = '/moderate';

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
      formData.append( 'articlePreviewAttachments', content.articlePreviewAttachments[i]);
    }
    for (let i = 0; i < content.articleAttachments.length; ++i) {
      formData.append( 'articleAttachments', content.articleAttachments[i]);
    }
    console.log(content);

    return this.http.post(this.url + MODERATE_URL_PART, formData);
  }

  updateContent(content: EditedContent) {
    const formData = new FormData();
    formData.append('id', content.id.toString());
    formData.append('title', content.title);
    formData.append('article', content.article);
    formData.append('shortDescription', content.shortDescription);
    for (let i = 0; i < content.typeIds.length; ++i) {
      formData.append('typeIds', content.typeIds[i].toString());
    }
    for (let i = 0; i < content.articlePreviewAttachments.length; ++i) {
      formData.append( 'articlePreviewAttachments', content.articlePreviewAttachments[i]);
    }
    for (let i = 0; i < content.articleAttachments.length; ++i) {
      formData.append( 'articleAttachments', content.articleAttachments[i]);
    }
    for (let i = 0; i < content.deletedArticleAttachmentPaths.length; ++i) {
      formData.append( 'deletedArticleAttachmentPaths', content.deletedArticleAttachmentPaths[i]);
    }
    for (let i = 0; i < content.deletedPreviewAttachmentPaths.length; ++i) {
      formData.append( 'deletedPreviewAttachmentPaths', content.deletedPreviewAttachmentPaths[i]);
    }
    console.log(content);
    return this.http.put(this.url + MODERATE_URL_PART, formData);
  }

  getShortModeratorContent(filters: ContentModerateFilters) {
    let url = this.url + MODERATE_URL_PART
              + `?${PAGE}=${filters.page + 1}`
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

  getContentForEditing(id: number) {
    const url = `${this.url}${MODERATE_URL_PART}/${id}`;
    return this.http.get(url);
  }

  deleteContent(id: number) {
    return this.http.delete(`${this.url}${MODERATE_URL_PART}/${id}`);
  }
}

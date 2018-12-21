import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HOST_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class HomeContentService {
  url = HOST_URL + '/api/Article';

  constructor(private http: HttpClient) { }

  getShortModeratorContent(amount: number, lastId?: number) {
    let url = this.url + '?AmountOfArticles=' + amount;
    if (lastId) {
      url += '&LastArticleId=' +  lastId;
    }
    return this.http.get(url);
  }
}

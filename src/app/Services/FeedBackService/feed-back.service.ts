import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HOST_URL } from 'src/app/config';
import { NotificationService } from '../../Services/notification.service';
import { PaginationService } from '../pagination.service';
import { PageEvent } from '@angular/material';
import { RequestFilter } from 'src/app/Models/RequestFilter';

const SEARCH_NAME = 'SearchByName';
const SEARCH_STATUS = 'SearchByType';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

  url = HOST_URL + '/api/feedback/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
      .set('page', this._paginationService.pageIndex.toString())
      .set('pagecount', this._paginationService.pageSize.toString())
  };

  constructor(private http: HttpClient,
    private _notification: NotificationService,
    private _paginationService: PaginationService
  ) { }

  form: FormGroup = new FormGroup({
    Text: new FormControl('', Validators.required),
    TypeId: new FormControl('', Validators.required),
  });

  CreateFeedBack() {
    const typeUrl = this.url + 'create';
    return this.http.post(typeUrl, { Text: this.form.value['Text'], TypeId: this.form.value['TypeId'] });
  }

  getFeedBackTypes() {
    const typeUrl = this.url + 'feedbacktypes';
    return this.http.get(typeUrl);
  }

  getFeedBackViewModels(filter?: RequestFilter) {
    let typeUrl = this.url + 'getviewfeedbacks';
    this.httpOptions.params =
      this.httpOptions.params.set('page', this._paginationService.pageIndex.toString());

      typeUrl += `?page=${this._paginationService.pageIndex}&`;
      typeUrl += `pagecount=${this._paginationService.pageSize}`;

    if (filter != null) {
      if (filter.searchKey !== undefined && filter.searchKey !== '') {
        typeUrl += `?${SEARCH_NAME}=${filter.searchKey}&`;
      }
      if (filter.selectedType !== 0 && filter.selectedType !== undefined) {
        typeUrl += `?${SEARCH_STATUS}=${filter.selectedType}`;
      }
    }
    return this.http.get(typeUrl);
  }

}

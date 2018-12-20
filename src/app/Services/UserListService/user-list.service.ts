import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { HOST_URL } from 'src/app/config';
import { PaginationService } from '../pagination.service';
import { Observable } from 'rxjs';

const INCLUDE_ALL = 'includeAll';
const PAGE = 'page';
const PAGE_SIZE = 'pageSize';
const SEARCH_BY_NAME = 'searchByName';
const SORT = 'sort';
const ORDER_BY = 'order';
const SELECTED_STATUS = 'selectedStatus';

@Injectable({
  providedIn: 'root'
})
export class UserListService {


  url = HOST_URL + '/api/userlist/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
      .set('page', this._paginationService.pageIndex.toString())
      .set('pagecount', this._paginationService.userPageSize.toString())
  };

  constructor(private http: HttpClient,
              private _paginationService: PaginationService) { }

  getUserList(sort: string,
    order: string,
    searchByName: string,
    page: number,
    includeAll: boolean,
    pageSize: number,
    selectedStatus: string): Observable<any> {
    let url = this.url + `?${PAGE}=${page + 1}&`
      + `${PAGE_SIZE}=${pageSize}&`
      + `${INCLUDE_ALL}=${includeAll}&`;
    if (searchByName) {
      url += `${SEARCH_BY_NAME}=${searchByName}&`;
    }
    if (order) {
      url += `${ORDER_BY}=${order}&`;
    }
    if (sort) {
      url += `${SORT}=${sort}`;
    }
    if (selectedStatus) {
      url += `${SELECTED_STATUS}=${selectedStatus}`;
    }
    return this.http.get<any>(url, this.httpOptions);
  }

  getStatuses() {
    const typeUrl = this.url + 'getstatuses';
    return this.http.get(typeUrl, this.httpOptions);
  }
}

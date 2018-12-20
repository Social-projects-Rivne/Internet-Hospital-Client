import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { HOST_URL } from 'src/app/config';
import { UserListModel } from 'src/app/Models/UserListModel';
import { UserListFilter } from 'src/app/Models/UserListFilter';
import { stringify } from '@angular/core/src/render3/util';
import { filterQueryId } from '@angular/core/src/view/util';
import { PaginationService } from '../pagination.service';
import { PageEvent } from '@angular/material';
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

  constructor(private http: HttpClient, private _paginationService: PaginationService) { }

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

  // getUserList(filter?: UserListFilter, event?: PageEvent) {
  //   let typeUrl = this.url + 'getparams';
  //   this.httpOptions.params =
  //   this.httpOptions.params.set('page', this._paginationService.pageIndex.toString());

  //   if (filter != null) {
  //       if (filter.searchKey !== undefined && filter.searchKey !== '') {
  //         typeUrl += `?${SEARCH_NAME}=${filter.searchKey}&`;
  //       }
  //       if (filter.selectedStatus !== 0 && filter.selectedStatus !== undefined) {
  //         typeUrl += `?${SEARCH_STATUS}=${filter.selectedStatus}`;
  //       }
  //   }
  //   return this.http.get(typeUrl, this.httpOptions);
  // }

  getStatuses() {
    const typeUrl = this.url + 'getstatuses';
    return this.http.get(typeUrl, this.httpOptions);
  }

  StatusConverter(Users: any) {

    Users.forEach(element => {
      if (element.statusId === 1 || element.statusName === 'Banned') {
        element.statusId = 1;
        element.statusName = 'Banned';
        element.statusDescription = 'Banned user who has violated our rules';
      }
      if (element.statusId === 2 || element.statusName === 'New') {
        element.statusId = 2;
        element.statusName = 'New';
        element.statusDescription = 'New user registered in our system';
      }
      if (element.statusId === 3 || element.statusName === 'Approved') {
        element.statusId = 3;
        element.statusName = 'Approved';
        element.statusDescription = 'Approved user with checked data';
      }
      if (element.statusId === 4 || element.statusName === 'Not approved') {
        element.statusId = 4;
        element.statusName = 'Not approved';
        element.statusDescription = 'Not approved, because user`s data was invalid';
      }
      if (element.statusId === 5 || element.statusName === 'Deleted') {
        element.statusId = 5;
        element.statusName = 'Deleted';
        element.statusDescription = 'Deleted user by admin';
      }
      if (element.statusId === 6 || element.statusName === 'Active') {
        element.statusId = 6;
        element.statusName = 'Active';
        element.statusDescription = 'Active moderator';
      }
    });
    return Users;
  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { HOST_URL } from 'src/app/config';
import { UserListModel } from 'src/app/Models/UserListModel';
import { UserListFilter } from 'src/app/Models/UserListFilter';
import { stringify } from '@angular/core/src/render3/util';
import { filterQueryId } from '@angular/core/src/view/util';
import { PaginationService } from '../pagination.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  url = HOST_URL + '/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
    .set('page', this.paginationService.pageIndex.toString())
    .set('pagecount', this.paginationService.userPageSize.toString())
  };

  constructor(private http: HttpClient, private paginationService: PaginationService) { }

  getUserList() {
    const typeUrl = this.url + 'userlist/getparams';
    return this.http.get(typeUrl, this.httpOptions);
  }
  getUserListParams(filter: UserListFilter) {
    const typeUrl = this.url + 'userlist/getparams';

    // if (filter.searchKey != null && filter.searchKey !== '' ) {
    //   this.httpOptions.params = this.httpOptions.params.set('searchbyname', UserListFilter.name);
    // } else {
    //   this.httpOptions.params = this.httpOptions.params.delete('searchbyname');
    // }
    // if (filter.selectedStatus != null) {
    //   this.httpOptions.params = this.httpOptions.params.set('searchbyspecialization', filter.searchKey.toString());
    // } else {
    //   this.httpOptions.params = this.httpOptions.params.delete('searchbyspecialization');
    // }
    return this.http.get(typeUrl, this.httpOptions);
  }

  StatusConverter(Users: any) {

    console.log(Users);

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

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListService } from 'src/app/Services/UserListService/user-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserListModel } from 'src/app/Models/UserListModel';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { UserListFilter } from 'src/app/Models/UserListFilter';
import { PaginationService } from 'src/app/Services/pagination.service';
import { EventEmitter } from 'events';
import { UserStatus } from 'src/app/Models/UserStatus';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<UserListModel>;
  public statuses: UserStatus;
  private filter: UserListFilter;
  public searchInput = '';
  public selectedStatus = 0;
  usersAmount: number;

  isLoadingResults = true;
  isRateLimitReached = false;

  displayedColumns = ['id', 'firstName', 'secondName', 'thirdName', 'birthDate', 'email', 'statusName'];

  constructor(
    private _userListService: UserListService,
    private _notificationService: NotificationService,
    private _paginationService: PaginationService,
  ) {
    this.filter = new UserListFilter();
  }

  ngOnInit() {
    this._userListService.getUserList().subscribe((result: any) => {
      result.users.sort((x1, x2) => x1.id - x2.id);
      this.dataSource = this._userListService.StatusConverter(result.users);
      this.usersAmount = result.count;
      this.isLoadingResults = false;
      if (this.usersAmount === 0) {
        this._notificationService.error('There is no users for this request');
      }
    },
      error => {
        this._notificationService.error(error);
      });

    this._userListService.getStatuses().subscribe((result: any) => {
      this.statuses = result;
    },
      error => {
        this._notificationService.error(error);
      });
  }

  onSearch() {
    this.filter.searchKey = this.searchInput;
    this.filter.selectedStatus = this.selectedStatus;

    this.paginator.firstPage();
    const event = new PageEvent();
    event.pageSize = this._paginationService.userPageSize;
    event.pageIndex = this._paginationService.pageIndex - 1;
    event.length = this.usersAmount;

    this.pageSwitch(event);
  }

  onClear() {
    this.searchInput = '';
    this.selectedStatus = 0;
    this.ngOnInit();
  }

  pageSwitch(event: PageEvent) {
    this._paginationService.change(event);

    this._userListService.getUserList(this.filter, event).subscribe((result: any) => {
      result.users.sort((x1, x2) => x1.id - x2.id);
      this.dataSource = this._userListService.StatusConverter(result.users);
      this.usersAmount = result.count;
      if (this.usersAmount === 0) {
        this._notificationService.error('There is no users for this request');
      }
    },
      error => {
        this._notificationService.error(error);
      });
    window.scroll(0, 0);
  }

}

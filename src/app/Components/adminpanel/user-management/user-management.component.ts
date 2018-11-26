import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListService } from 'src/app/Services/UserListService/user-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserListModel } from 'src/app/Models/UserListModel';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { UserListFilter } from 'src/app/Models/UserListFilter';
import { PaginationService } from 'src/app/Services/pagination.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<UserListModel>;
  private filter: UserListFilter;
  public searchInput = '';
  public selectedStatus = '';
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
      this.dataSource = this._userListService.StatusConverter(result.users);
      this.usersAmount = result.count;
      this.isLoadingResults = false;
    },
      error => {
        this._notificationService.error(error);
      });
  }

  onSearch() {
    this.paginator.firstPage();
    const event = new PageEvent();
    event.pageSize = this._paginationService.userPageSize;
    event.pageIndex = this._paginationService.pageIndex - 1;
    event.length = this.usersAmount;
    this.pageSwitch(event);
  }

  pageSwitch(event: PageEvent) {
    this._paginationService.change(event);
    this._userListService.httpOptions.params =
      this._userListService.httpOptions.params.set('page',
        this._paginationService.pageIndex.toString());

    this._userListService.getUserList().subscribe((result: any) => {
      this.dataSource = result.users;
      this.usersAmount = result.count;
    },
      error => {
        this._notificationService.error(error);
      });
    window.scroll(0, 0);
  }

  applyFilter(filterValue: any) {
    this.searchInput = filterValue;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.sort = this.sort;
  }

}

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
  public Users: UserListModel[] = [];
  public Types: UserListModel[] = [];
  private filter: UserListFilter;
  public searchInput = '';
  public selectedStatus = '';

  displayedColumns = ['id', 'firstName', 'secondName', 'thirdName', 'birthDate', 'email', 'statusName'];

  constructor(
    private _userListService: UserListService,
    private _notificationService: NotificationService,
    private _paginationService: PaginationService,
    ) {
      this.filter = new UserListFilter();
    }

    ngOnInit() {
      this._userListService.getUserList().subscribe((types: any) => {
        this.Users = types;
        this.Users = this._userListService.StatusConverter(this.Users);
        this.dataSource = new MatTableDataSource(this.Users);
        this.ngAfterViewInit();
      },
        error => {
          this._notificationService.error('Server error');
      });
      this._userListService.getUserList().subscribe((types: any) => {
        this.Types = types;
        this.Types.sort((x1, x2) => x1.statusId - x2.statusId);
        this.Types = this._userListService.StatusConverter(this.Users);
        this.Types.sort((x1, x2) => x1.statusId - x2.statusId);
        this.Types = this.uniq(this.Types);
      },
        error => {
          this._notificationService.error('Server error');
      });
  }

  searchClick() {
    this.filter.searchKey = this.searchInput;
    this.filter.selectedStatus = this.selectedStatus;
    this.filter.CheckIfPropertyExist();
    this.paginator.firstPage();
    const pageevent = new PageEvent();
    pageevent.pageSize = this._paginationService.pageSize;
    pageevent.pageIndex = this._paginationService.pageIndex - 1;
    // pageEvent.length = this.
    this._paginationService.change(pageevent);
    this._userListService.httpOptions.params =
                                              this._userListService.httpOptions.params.set('page',
                                              this._paginationService.pageIndex.toString());
    if (this.filter.isWithParams === true) {
      this._userListService.getUserListParams(this.filter);
    } else {
      this._userListService.getUserList();
    }
  }

  uniq(Users: UserListModel[]) {
    return Users.filter(function (item, pos, ary) {
      return !pos || item.statusId !== ary[pos - 1].statusId;
    });
  }

  applyFilter(filterValue: any) {
    this.searchInput = filterValue;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.sort = this.sort;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

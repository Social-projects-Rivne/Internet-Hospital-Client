import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListService } from 'src/app/Services/UserListService/user-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserListModel } from 'src/app/Models/UserListModel';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { UserListFilter } from 'src/app/Models/UserListFilter';
import { PaginationService } from 'src/app/Services/pagination.service';
import { EventEmitter } from 'events';
import { UserStatus } from 'src/app/Models/UserStatus';
import { FilteredResults } from 'src/app/Models/FilteredResults';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DEFAULT_AMOUNT_OF_PATIENTS_ON_PAGE } from '../../MyPatients/active-patients/active-patients.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {



  displayedColumns = ['select', 'firstName', 'secondName', 'thirdName', 'birthDate', 'email', 'statusName'];
  dataSource: UserListModel[] = [];
  isLoadingResults = true;
  includeAll = false;
  amountOfUsers = 0;
  pageSizeOptions = [5, 10, 15, 20, 30, 50];
  search = '';
  selected = [];
  description = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  content: FilteredResults<UserListModel> = new FilteredResults<UserListModel>();

  // statuses: UserStatus;
  // filter: UserListFilter;
  // searchInput = '';
  // selectedStatus = 0;
  // usersAmount: number;



  constructor(private service: UserListService,
              private _notificationService: NotificationService,
              private _paginationService: PaginationService) {
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = DEFAULT_AMOUNT_OF_PATIENTS_ON_PAGE;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getUserList(
            this.sort.active,
            this.sort.direction,
            this.search,
            this.paginator.pageIndex,
            this.includeAll,
            this.paginator.pageSize);
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.amountOfUsers = data.amount;
          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
  }

  // onSearch() {
  //   this.filter.searchKey = this.searchInput;
  //   this.filter.selectedStatus = this.selectedStatus;

  //   this.paginator.firstPage();
  //   const event = new PageEvent();
  //   event.pageSize = this._paginationService.userPageSize;
  //   event.pageIndex = this._paginationService.pageIndex - 1;
  //   event.length = this.usersAmount;

  //   this.pageSwitch(event);
  // }

  // onClear() {
  //   this.searchInput = '';
  //   this.selectedStatus = 0;
  //   this.ngOnInit();
  // }

  // pageSwitch(event: PageEvent) {
  //   this._paginationService.change(event);
  //   this.isLoadingResults = true;
  //   this._userListService.getUserList(this.filter, event).subscribe((result: any) => {
  //     result.users.sort((x1, x2) => x1.id - x2.id);
  //     this.dataSource = this._userListService.StatusConverter(result.users);
  //     this.usersAmount = result.count;
  //     this.isLoadingResults = false;
  //     if (this.usersAmount === 0) {
  //       this._notificationService.error('There is no users for this request');
  //     }
  //   },
  //     error => {
  //       this._notificationService.error(error);
  //     });
  //   window.scroll(0, 0);
  // }

  select(event, id) {
    const index = this.selected.indexOf(id);
    if (event.checked) {
      if (index === -1) {
        this.selected.push(id);
      }
    } else if (index !== -1) {
      this.selected.splice(index, 1);
    }
  }
}

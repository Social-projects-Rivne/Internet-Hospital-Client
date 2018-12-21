import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListService } from 'src/app/Services/UserListService/user-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserListModel } from 'src/app/Models/UserListModel';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { FilteredResults } from 'src/app/Models/FilteredResults';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DEFAULT_AMOUNT_OF_PATIENTS_ON_PAGE } from '../../MyPatients/active-patients/active-patients.component';
import { UserStatus } from 'src/app/Models/UserStatus';

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
  selectedStatus = '';
  selected = [];
  description = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  content: FilteredResults<UserListModel> = new FilteredResults<UserListModel>();
  statuses: UserStatus;


  constructor(private service: UserListService,
              private _notificationService: NotificationService) {
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
            this.paginator.pageSize,
            this.selectedStatus);
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
      this.service.getStatuses().subscribe((result: any) => {
        this.statuses = result;
      },
      error => {
        this._notificationService.error(error);
      });
  }

  onSearch() {
    this.paginator.firstPage();
  }

  onClear() {
    this.selectedStatus = undefined;
    this.ngOnInit();
  }

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

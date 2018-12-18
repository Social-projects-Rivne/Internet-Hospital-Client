import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { FilteredResults } from 'src/app/Models/FilteredResults';
import { MyBlackListModel } from 'src/app/Models/MyBlackListModel';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { DEFAULT_AMOUNT_OF_PATIENTS_ON_PAGE } from '../active-patients/active-patients.component';
import { merge, of as observableOf  } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DialogService } from 'src/app/Services/dialog.service';
import { Router } from '@angular/router';
import { MY_PATIENTS } from 'src/app/config';

@Component({
  selector: 'app-black-list',
  templateUrl: './black-list.component.html',
  styleUrls: ['./black-list.component.scss']
})
export class BlackListComponent implements OnInit {
  displayedColumns = ['select', 'firstName', 'secondName', 'thirdName', 'dateOfBanned', 'description'];
  dataSource: MyBlackListModel[] = [];
  isLoadingResults = true;
  includeAll = false;
  amountOfPatients = 0;
  pageSizeOptions = [5, 10, 15, 20, 30, 50];
  search = '';
  selected = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  content: FilteredResults<MyBlackListModel> = new FilteredResults<MyBlackListModel>();

  constructor(private service: DoctorsService,
              private notification: NotificationService,
              private dialogService: DialogService,
              private router: Router) { }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = DEFAULT_AMOUNT_OF_PATIENTS_ON_PAGE;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getMyBlackList(
            this.sort.active,
            this.sort.direction,
            this.search,
            this.paginator.pageIndex,
            this.includeAll,
            this.paginator.pageSize);
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.amountOfPatients = data.amount;
          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
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

  removeFromBlackListSelected() {
    this.dialogService.openConfirmDialog('Are you sure to unbanned this patient(s)?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.isLoadingResults = true;
        this.service.removeFromBlackListSelected(this.selected).subscribe( _ => {
          this.selected = [];
          this.notification.success('Patient(s) were unbanned!');
          this.isLoadingResults = false;
          this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(() =>
            this.router.navigate([MY_PATIENTS]));
        }, error => {
          this.isLoadingResults = false;
          this.notification.error(error);
        });
      }
    });
  }

}

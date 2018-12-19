import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { PatientInfo } from 'src/app/Models/PatientInfo';
import { MatPaginator, MatSort } from '@angular/material';
import { FilteredResults } from 'src/app/Models/FilteredResults';
import { NotificationService } from 'src/app/Services/notification.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { Router } from '@angular/router';
import { MY_PATIENTS } from 'src/app/config';

export const DEFAULT_AMOUNT_OF_PATIENTS_ON_PAGE = 15;

@Component({
  selector: 'app-active-patients',
  templateUrl: './active-patients.component.html',
  styleUrls: ['./active-patients.component.scss']
})
export class ActivePatientsComponent implements OnInit {
  displayedColumns = ['select', 'firstName', 'secondName', 'thirdName', 'email'];
  dataSource: PatientInfo[] = [];
  isLoadingResults = true;
  includeAll = false;
  amountOfPatients = 0;
  pageSizeOptions = [5, 10, 15, 20, 30, 50];
  search = '';
  selected = [];
  description = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  content: FilteredResults<PatientInfo> = new FilteredResults<PatientInfo>();

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
          return this.service.getMyPatients(
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

  addToBlackListSelected() {
    this.dialogService.openConfirmDialog('Are you sure to banned this patient(s)?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.isLoadingResults = true;
        this.service.addToBlackListSelected(this.selected, this.description).subscribe( _ => {
          this.selected = [];
          this.notification.success('Patient(s) were banned!');
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

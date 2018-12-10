import { Component, OnInit, ViewChild } from '@angular/core';
import { MyPatients } from 'src/app/Models/MyPatients';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { PatientInfo } from 'src/app/Models/PatientInfo';
import { MatPaginator, MatSort } from '@angular/material';

export const DEFAULT_AMOUNT_OF_PATIENTS_ON_PAGE = 15;

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss']
})
export class MyPatientsComponent implements OnInit {
  displayedColumns = ['select', 'firstName', 'secondName', 'thirdName', 'email'];
  dataSource: PatientInfo[] = [];
  isLoadingResults = true;
  isRateLimitReached = false;
  includeAll = false;
  amountOfPatients = 0;
  pageSizeOptions = [5, 10, 15, 20, 30, 50];
  search = '';
  selected = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: DoctorsService) { }

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
        map((data: MyPatients) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.amountOfPatients = data.amountOfAllFiltered;
          return data.myPatients;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
  }

  select(event, id) {
    // method for added to black list
  }
}

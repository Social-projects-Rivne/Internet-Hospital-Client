import { Component, OnInit, ViewChild } from '@angular/core';
import { MyPatients } from 'src/app/Models/MyPatients';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { PatientInfo } from 'src/app/Models/PatientInfo';
import { MatPaginator } from '@angular/material';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: DoctorsService) { }

  ngOnInit() {
    this.paginator.pageSize = DEFAULT_AMOUNT_OF_PATIENTS_ON_PAGE;
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getMyPatients(
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

}

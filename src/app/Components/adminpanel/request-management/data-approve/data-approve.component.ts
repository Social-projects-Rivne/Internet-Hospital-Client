import { Component, OnInit, ViewChild } from '@angular/core';
import { ModeratorService } from '../../Services/moderator.service';
import { PatientToDoctorModel } from '../../../../Models/PatientToDoctorModel';
import { PatientToDoctorList } from '../../../../Models/PatientToDoctorList';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of as observableOf } from 'rxjs';
import { DialogService } from 'src/app/Services/dialog.service';
import { HOST_URL} from '../../../../config';
import { NotificationService } from '../../../../Services/notification.service';

const DEFAULT_AMOUNT_OF_PATIENT_ON_PAGE = 5;

@Component({
  selector: 'app-data-approve',
  templateUrl: './data-approve.component.html',
  styleUrls: ['./data-approve.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class DataApproveComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  hostUrl = HOST_URL;
  usersAmount = 0;
  patientToDoctorModels: PatientToDoctorModel[] = [];
  columnsToDisplay: string[] = ['email', 'requestTime', 'type'];
  expandedElement: PatientToDoctorModel | null;
  isLoadingResults = true;
  constructor(private service: ModeratorService, public dialog: MatDialog,
              private dialogService: DialogService,
              private notification: NotificationService) { }

  ngOnInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = DEFAULT_AMOUNT_OF_PATIENT_ON_PAGE;
    // merge(this.sort.sortChange, this.paginator.page)
      this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          // const s = this.patientToDoctorModels[0].license;
          return this.service.getPatientBecomeDoctorRequests(this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map((data: PatientToDoctorList) => {
          this.isLoadingResults = false;
          this.usersAmount = data.entityAmount;
          return data.entities;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
          this.patientToDoctorModels = data;
        });

      // this.sort.sortChange.subscribe(() => {
      //   this.paginator.pageIndex = 0;
      //   this.isLoadingResults = true;
      // });


    // this.service.getPatientBecomeDoctorRequests()
    // .subscribe((data: any) => {
    //   console.log(data);
    //   this.patientToDoctorModels = data;
    // });
  }

  openDialog(id: number, isApproved: boolean) {
    console.log('in dialog ' + id + '   ' + isApproved);
    this.dialogService.openConfirmDialog('Are you sure to commit this action?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.handlePatientToDoctorRequest(id, isApproved)
        .subscribe(() => {
          this.notification.success('Unsubscribed successfully');
        },
        error => {
          this.notification.error(error);
        });
      }
    });
  }


}

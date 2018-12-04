import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { PreviousAppointment } from 'src/app/Models/PreviousAppointment';
import { MatPaginator, PageEvent } from '@angular/material';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppointmentStatus } from 'src/app/Models/AppointmentStatus';
import { PreviousAppointmentFilter } from 'src/app/Models/PreviousAppointmentFilter';

@Component({
  selector: 'app-previous-appointments',
  templateUrl: './previous-appointments.component.html',
  styleUrls: ['./previous-appointments.component.scss']
})
export class PreviousAppointmentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;

  previousAppointments: PreviousAppointment[];
  pageSize = 7;
  prevAppointCount: number;
  statuses: AppointmentStatus[];
  isStatusesResult = true;
  isAppointmentsResult = true;

  constructor(private docService: DoctorsService) {
    this.pageEvent = new PageEvent();
   }

  ngOnInit() {
    this.paginator.pageIndex = 1;
    this.paginator.pageSize = this.pageSize;
    this.docService.getAppointmentStatuses().subscribe(
      statuses => {
        this.initializeAppoitmentStatus(statuses);
        this.isStatusesResult = false;
      }
    );
    // this.docService.getPreviousAppointment().subscribe(
    //   result => {
    //   this.previousAppointments = result.appointments;
    //   this.prevAppointCount = result.quantity;
    //   this.isAppointmentsResult = false;
    //   }
    // );
  }

  initializeAppoitmentStatus(initializeAppoitmentStatus: string[]) {
    let i = 1;
    initializeAppoitmentStatus.forEach((element) => {
      this.statuses.push(new AppointmentStatus(element, i++));
    });
  }

  onSearch(event: PreviousAppointmentFilter) {
    // selectedStatus
    // searchKey
    // // {searchKey : $event.searchKey, selectedStatus: $event.selectedStatus };
    // const previousAppointmentFilter = new PreviousAppointmentFilter();

    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageIndex = 1;
    // this.paginator.firstPage();
    this.paginator.page
      .pipe(
        switchMap(() => {
          this.isAppointmentsResult = true;
          return this.docService.getPreviousAppointment(event,
            this.paginator.pageIndex,
            this.paginator.pageSize);
        })
      ).subscribe(
        result => {
        this.previousAppointments = result.appointments;
        this.prevAppointCount = result.quantity;
        this.isAppointmentsResult = false;
        });

        // const event = new PageEvent();
        // event.pageIndex = 1;
        // event.pageSize = 5;
        // event.length = this.prevAppointCount;
        // this.pageSwitch(event);

    // this.docService.getPreviousAppointment($event).subscribe(
    //   result => {
    //   this.previousAppointments = result.appointments;
    //   this.prevAppointCount = result.quantity;
    //   this.isAppointmentsResult = false;
     // }
    // );
  }

  pageSwitch(event: PageEvent) {

  }
}

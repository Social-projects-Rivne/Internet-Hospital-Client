import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { PreviousAppointment } from 'src/app/Models/PreviousAppointment';
import { MatPaginator } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { AppointmentStatus } from 'src/app/Models/AppointmentStatus';
import { PreviousAppointmentFilter } from 'src/app/Models/PreviousAppointmentFilter';

@Component({
  selector: 'app-previous-appointments',
  templateUrl: './previous-appointments.component.html',
  styleUrls: ['./previous-appointments.component.scss']
})
export class PreviousAppointmentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  previousAppointments: PreviousAppointment[];
  statuses: AppointmentStatus[] = [];
  prevAppointCount: number;
  filter: PreviousAppointmentFilter = null;
  isStatusesResult = true;
  isAppointmentsResult = true;
  pageSize = 5;

  constructor(private docService: DoctorsService) {
  }

  ngOnInit() {
    this.paginator.pageSize = this.pageSize;

    this.docService.getAppointmentStatuses().subscribe(
      statuses => {
        this.initializeAppoitmentStatus(statuses);
        this.isStatusesResult = false;
      }
    );

    this.paginator.page
      .pipe(
        switchMap(() => {
          this.isAppointmentsResult = true;
          return this.docService.getPreviousAppointment(
            this.filter,
            this.paginator.pageIndex,
            this.paginator.pageSize);
        })
      ).subscribe(result => {
        this.previousAppointments = result.appointments;
        this.prevAppointCount = result.quantity;
        this.isAppointmentsResult = false;
      });

    this.paginator.page.emit();
  }

  initializeAppoitmentStatus(initializeAppoitmentStatus: string[]) {
    let i = 1;
    initializeAppoitmentStatus.forEach((element) => {
      this.statuses.push(new AppointmentStatus(element, i++));
    });
  }

  onSearch($event: PreviousAppointmentFilter) {
    this.paginator.pageIndex = 0;
    this.filter = $event;
    this.paginator.page.emit();
  }
}

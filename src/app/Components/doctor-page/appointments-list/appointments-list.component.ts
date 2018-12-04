import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../../DoctorPlans/Appointment';
import { DoctorplansService } from '../../DoctorPlans/doctorplans.service';
import { PaginationService } from '../../../Services/pagination.service';
import { MatPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AppointmentFilter } from 'src/app/Models/AppointmentFilter';
import { NotificationService } from '../../../Services/notification.service';
import { DatePipe } from '@angular/common';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  doctorId;

  appointmentList: Appointment[] = [];
  appointmentsAmount: number;
  private filter: AppointmentFilter;

  constructor(private service: DoctorplansService,
    private pagService: PaginationService,
    private activateRoute: ActivatedRoute,
    private notification: NotificationService,
    private datePipe: DatePipe) {
    this.filter = new AppointmentFilter();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
    .set('page', '1')
    .set('pagecount', this.pagService.pageSize.toString())
  };

  ngOnInit() {
    this.getDoctorId();
    this.httpOptions.params = this.httpOptions.params.set('doctorId', this.doctorId.toString());
    this.service.getDoctorAppointments(this.httpOptions).subscribe((result: any) => {
      this.appointmentList = result.appointments;
      this.appointmentsAmount = result.quantity;
    },
    error => {
      this.notification.error(error);
    });
  }

  getDoctorId() {
    this.doctorId = this.activateRoute.snapshot.params['id'];
  }

  onSearch() {
    this.paginator.firstPage();
    const event = new PageEvent();
    event.pageSize = this.pagService.pageSize;
    event.pageIndex = this.pagService.pageIndex - 1;
    event.length = this.appointmentsAmount;
    this.pageSwitch(event);
  }

  pageSwitch(event: PageEvent) {
    this.pagService.change(event);
    this.checkFilters();
    this.httpOptions.params = this.httpOptions.params.set('page', this.pagService.pageIndex.toString());
    this.service.getDoctorAppointments(this.httpOptions).subscribe((result: any) => {
      this.appointmentList = result.appointments;
      this.appointmentsAmount = result.quantity;
    },
    error => {
      this.onClear();
      this.onSearch();
      this.notification.error(error);
    });
    window.scroll(0, 0);
  }

  checkFilters() {
    if (this.filter.from) {
      this.httpOptions.params = this.httpOptions.params.set('from', this.datePipe.transform(this.filter.from, 'short'));
    } else {
      this.httpOptions.params = this.httpOptions.params.delete('from');
    }

    if (this.filter.till) {
      this.httpOptions.params = this.httpOptions.params.set('till', this.datePipe.transform(this.filter.till, 'short'));
    } else {
      this.httpOptions.params = this.httpOptions.params.delete('till');
    }
  }

  onClear() {
    this.filter.from = null;
    this.filter.till = null;
  }
}

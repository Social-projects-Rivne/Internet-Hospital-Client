import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../../DoctorPlans/Appointment';
import { DoctorplansService } from '../../DoctorPlans/doctorplans.service';
import { PaginationService } from '../../../Services/pagination.service';
import { MatPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AppointmentFilter } from 'src/app/Models/AppointmentFilter';
import { NotificationService } from '../../../Services/notification.service';

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
    private notification: NotificationService) {
    this.filter = new AppointmentFilter();
  }

  ngOnInit() {
    this.getDoctorId();
    this.service.getDoctorAppointments(this.doctorId).subscribe((result: any) => {
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
    this.service.httpOptions.params = this.service.httpOptions.params.set('page', this.pagService.pageIndex.toString());
    this.service.getDoctorAppointments(this.doctorId, this.filter.from, this.filter.till).subscribe((result: any) => {
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

  onClear() {
    this.filter.from = null;
    this.filter.till = null;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { MatPaginator } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { AppointmentStatus } from 'src/app/Models/AppointmentStatus';
import { DoctorAppointmentFilter } from 'src/app/Models/DoctorAppointmentFilter';
import { Appointment } from '../../DoctorPlans/Appointment';
import { DoctorplansService } from '../../DoctorPlans/doctorplans.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss']
})
export class DoctorAppointmentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  appointments: Appointment[];
  statuses: AppointmentStatus[] = [];
  appointmentCount: number;
  filter: DoctorAppointmentFilter;
  isStatusesResult = true;
  isAppointmentsResult = true;
  pageSize = 5;

  constructor(private appService: DoctorplansService) {
    this.filter = new DoctorAppointmentFilter();
  }

  ngOnInit() {
    this.paginator.pageSize = this.pageSize;

    this.appService.getAppointmentStatuses().subscribe(
      statuses => {
        this.initializeAppoitmentStatus(statuses);
        this.isStatusesResult = false;
      }
    );

    this.paginator.page
      .pipe(
        switchMap(() => {
          this.isAppointmentsResult = true;
          this.filter.pageIndex = this.paginator.pageIndex;
          this.filter.pageSize = this.paginator.pageSize;
          return this.appService.getAllDoctorAppointments(this.filter);
        })
      ).subscribe(result => {
        this.appointments = result.appointments;
        this.appointmentCount = result.quantity;
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

  onSearch($event: DoctorAppointmentFilter) {
    this.paginator.pageIndex = 0;
    this.filter = $event;
    this.paginator.page.emit();
  }
}

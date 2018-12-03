import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../DoctorPlans/Appointment';
import { AppointmentStatus } from 'src/app/Models/AppointmentStatus';

@Component({
  selector: 'app-previous-appointments',
  templateUrl: './previous-appointments.component.html',
  styleUrls: ['./previous-appointments.component.scss']
})
export class PreviousAppointmentsComponent implements OnInit {

  previousAppointments: Appointment[];
  pageSize = 5;
  prevAppointCount: number;
  statuses: AppointmentStatus[];
  isLoadingResults = true;

  constructor() { }

  ngOnInit() {

  }

}

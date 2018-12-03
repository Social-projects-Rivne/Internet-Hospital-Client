import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { PreviousAppointment } from 'src/app/Models/PreviousAppointment';

@Component({
  selector: 'app-previous-appointments',
  templateUrl: './previous-appointments.component.html',
  styleUrls: ['./previous-appointments.component.scss']
})
export class PreviousAppointmentsComponent implements OnInit {

  previousAppointments: PreviousAppointment[];
  pageSize = 5;
  prevAppointCount: number;
  statuses: string[];
  isStatusesResult = true;
  isAppointmentsResult = true;

  constructor(private docService: DoctorsService) { }

  ngOnInit() {
    this.docService.getAppointmentStatuses().subscribe(
      statuses => { this.statuses = statuses; console.log(this.statuses); this.isStatusesResult = false; }
    );
    this.docService.getPreviousAppointment().subscribe(
      previousAppointments => {
      this.previousAppointments = previousAppointments;
        console.log(this.previousAppointments);
        this.isAppointmentsResult = false;
      }
    );
  }

}

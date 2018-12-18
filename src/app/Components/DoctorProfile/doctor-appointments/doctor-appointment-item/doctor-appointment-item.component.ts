import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FILL_ILLNESS, PATIENT_INFO } from 'src/app/config';
import { Appointment } from 'src/app/Components/DoctorPlans/Appointment';
import { DataSharingService } from 'src/app/Services/date-sharing.service';

@Component({
  selector: 'app-doctor-appointment-appointment-item',
  templateUrl: './doctor-appointment-item.component.html',
  styleUrls: ['./doctor-appointment-item.component.scss']
})
export class DoctorAppointmentItemComponent implements OnInit {

  @Input()
  appointment: Appointment;

  constructor(private router: Router, private dateSharing: DataSharingService) { }

  ngOnInit() {
  }

  onFinish() {
    console.log(this.appointment.startTime);
    this.dateSharing.changeDate(this.appointment.startTime);
    this.router.navigate([FILL_ILLNESS + `/${this.appointment.id}`]);
  }

  onWatchInfo() {
    this.router.navigate([PATIENT_INFO + `/${this.appointment.userId}`]);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FILL_ILLNESS } from 'src/app/config';
import { Appointment } from 'src/app/Components/DoctorPlans/Appointment';

@Component({
  selector: 'app-doctor-appointment-appointment-item',
  templateUrl: './doctor-appointment-item.component.html',
  styleUrls: ['./doctor-appointment-item.component.scss']
})
export class DoctorAppointmentItemComponent implements OnInit {

  @Input()
  appointment: Appointment;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onFinish() {
    this.router.navigate([FILL_ILLNESS + `/${this.appointment.id}`]);
  }
}

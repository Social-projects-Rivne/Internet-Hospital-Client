import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from '../../../DoctorPlans/Appointment';

@Component({
  selector: 'app-appointments-item',
  templateUrl: './appointments-item.component.html',
  styleUrls: ['./appointments-item.component.scss']
})
export class AppointmentsItemComponent implements OnInit {
  @Input()
  appointment: Appointment;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { PreviousAppointment } from 'src/app/Models/PreviousAppointment';

@Component({
  selector: 'app-previous-appointment-item',
  templateUrl: './previous-appointment-item.component.html',
  styleUrls: ['./previous-appointment-item.component.scss']
})
export class PreviousAppointmentItemComponent implements OnInit {

  @Input()
  prevApp: PreviousAppointment;

  constructor() { }

  ngOnInit() {
  }

}

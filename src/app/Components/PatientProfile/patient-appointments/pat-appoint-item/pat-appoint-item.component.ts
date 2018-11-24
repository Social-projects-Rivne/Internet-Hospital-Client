import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from 'src/app/Components/DoctorPlans/Appointment';
import { DoctorplansService } from 'src/app/Components/DoctorPlans/doctorplans.service';

@Component({
  selector: 'app-pat-appoint-item',
  templateUrl: './pat-appoint-item.component.html',
  styleUrls: ['./pat-appoint-item.component.scss']
})
export class PatAppointItemComponent implements OnInit {
  @Input()
  patAppointment: Appointment;

  constructor(private service: DoctorplansService) { }

  ngOnInit() {
  }

  onUnsubscribeToAppointment() {
    this.service.unsubscribeToAppointment(this.patAppointment.id).subscribe();
  }
}

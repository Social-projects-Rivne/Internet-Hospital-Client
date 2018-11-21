import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from '../../../DoctorPlans/Appointment';
import { DoctorplansService } from 'src/app/Components/DoctorPlans/doctorplans.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointments-item',
  templateUrl: './appointments-item.component.html',
  styleUrls: ['./appointments-item.component.scss']
})
export class AppointmentsItemComponent implements OnInit {
  @Input()
  appointment: Appointment;

  constructor(private service: DoctorplansService) { }

  ngOnInit() {
  }

  onSubscribeToAppointment() {
    this.service.subscribePatientToAppointment(this.appointment.id).subscribe();
  }
}

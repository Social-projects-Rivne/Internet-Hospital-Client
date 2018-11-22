import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from '../../../DoctorPlans/Appointment';
import { DoctorplansService } from 'src/app/Components/DoctorPlans/doctorplans.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-appointments-item',
  templateUrl: './appointments-item.component.html',
  styleUrls: ['./appointments-item.component.scss']
})
export class AppointmentsItemComponent implements OnInit {
  @Input()
  appointment: Appointment;
  isPatient: Observable<boolean>;

  constructor(private service: DoctorplansService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isPatient = this.authenticationService.isPatient();
  }

  onSubscribeToAppointment() {
    this.service.subscribePatientToAppointment(this.appointment.id).subscribe();
  }
}

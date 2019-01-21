import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from '../../../DoctorPlans/Appointment';
import { DoctorplansService } from 'src/app/Components/DoctorPlans/doctorplans.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Observable } from 'rxjs';
import { USERS_PROFILE } from 'src/app/config';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-appointments-item',
  templateUrl: './appointments-item.component.html',
  styleUrls: ['./appointments-item.component.scss']
})
export class AppointmentsItemComponent implements OnInit {
  @Input()
  appointment: Appointment;
  isAllow = false;
  isPatient: Observable<boolean>;

  constructor(private service: DoctorplansService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private notification: NotificationService) { }

  load = false;

  ngOnInit() {
    this.isPatient = this.authenticationService.isPatient();
  }

  onSubscribeToAppointment() {
    this.load = true;
    this.service.subscribePatientToAppointment(this.appointment.id, this.isAllow)
    .subscribe(() => {
      this.load = false;
      this.router.navigate([USERS_PROFILE, {appointments: true}]);
      this.notification.success('You have been successfully subscribed for appointment');
    },
      error => {
        this.notification.error(error);
        this.load = false;
      });
  }
}

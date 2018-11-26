import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from 'src/app/Components/DoctorPlans/Appointment';
import { DoctorplansService } from 'src/app/Components/DoctorPlans/doctorplans.service';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/Services/dialog.service';
import { Router } from '@angular/router';
import { USERS_PROFILE } from 'src/app/config';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-pat-appoint-item',
  templateUrl: './pat-appoint-item.component.html',
  styleUrls: ['./pat-appoint-item.component.scss']
})
export class PatAppointItemComponent implements OnInit {
  @Input()
  patAppointment: Appointment;

  constructor(private service: DoctorplansService,
              private dialogService: DialogService,
              private router: Router,
              private notification: NotificationService) { }

  ngOnInit() {
  }

  onUnsubscribeToAppointment() {
    this.dialogService.openConfirmDialog('Are you sure to unsubscribe this appointment?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.service.unsubscribeToAppointment(this.patAppointment.id).subscribe(
          data => {
            this.notification.success('Unsubscribed successfully');
          },
          error => {
            this.notification.error(error);
          });
        //  this.router.navigate([USERS_PROFILE]));
        // this.service.getPatientAppointments();
      }
    });
  }
}
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { DatePipe } from '@angular/common';
import { DataSharingService } from '../date-sharing.service';
import { MY_PLANS } from 'src/app/config';

@Injectable()
export class FinishAppointmentGuard implements CanActivate {

    constructor(private notification: NotificationService,
                private datePipe: DatePipe,
                private dateSharing: DataSharingService,
                private router: Router) { }

    appointmentStart: Date;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.dateSharing.transferDate.subscribe(date => this.appointmentStart = date);

        if (!this.appointmentStart) {
            this.router.navigate([MY_PLANS]);
        }
        const start = this.appointmentStart;
        const now = new Date();

        if (start > now) {
            this.notification.error('Please wait for the appointment beginning');
            return false;
        }
        return true;
    }
}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
import { NotificationService } from '../notification.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class FinishAppointmentGuard implements CanActivate {

    constructor(private notification: NotificationService,
                private datePipe: DatePipe) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const appointmentStart = route.params['start'];
        const now = this.datePipe.transform(new Date(), 'short');

        if (!appointmentStart) {
            this.notification.error('UUUU');
            return false;
        }
        if (appointmentStart > now) {
            this.notification.error('Please wait for the appointment beginning');
            return false;
        }
        return true;
    }
}

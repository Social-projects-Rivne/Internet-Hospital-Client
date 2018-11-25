import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NotificationService } from '../notification.service';
import { DatePipe } from '@angular/common';
import { DataSharingService } from '../date-sharing.service';

@Injectable()
export class FinishAppointmentGuard implements CanActivate {

    constructor(private notification: NotificationService,
                private datePipe: DatePipe,
                private dateSharing: DataSharingService) { }

    appointmentStart: Date;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.dateSharing.transferDate.subscribe(date => this.appointmentStart = date);

        if (!this.appointmentStart) {
            return false;
        }
        const start = this.datePipe.transform(this.appointmentStart, 'short');
        const now = this.datePipe.transform(new Date(), 'short');

        if (start > now) {
            this.notification.error('Please wait for the appointment beginning');
            return false;
        }
        return true;
    }
}

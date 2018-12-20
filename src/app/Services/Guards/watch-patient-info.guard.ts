import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DOCTOR_PROFILE } from 'src/app/config';
import { PatientIdSharingService } from '../patient-id-sharing.service';

@Injectable()
export class WatchPatientInfoGuard implements CanActivate {

    constructor(private router: Router, private idSharing: PatientIdSharingService) { }

    id: number;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.idSharing.transferId.subscribe(date => this.id = date);
        if (!this.id || isNaN(this.id)) {
            this.router.navigate([DOCTOR_PROFILE]);
            return false;
        }
        return true;
    }
}

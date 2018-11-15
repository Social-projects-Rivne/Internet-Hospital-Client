import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
@Injectable()
export class PatientGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService) { }

    canActivate() {
        return this.authenticationService.hasPatientRole()
            && this.authenticationService.isApprovedPatient();
    }
}

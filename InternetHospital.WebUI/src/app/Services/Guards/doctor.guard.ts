import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
@Injectable()
export class DoctorGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService) { }

    canActivate() {
        return this.authenticationService.hasDoctorRole()
            && this.authenticationService.isApprovedDoctor();
    }
}

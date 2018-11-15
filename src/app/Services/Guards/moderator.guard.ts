import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../../Services/authentication.service';
@Injectable()
export class ModeratorGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService) { }

    canActivate() {
        return this.authenticationService.hasModeratorRole();
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router} from '@angular/router';
import { ICurrentUser } from '../Models/CurrentUser';
import { HOST_URL } from '../../app/config';
import { SIGN_IN } from '../../app/config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';
import { MessageService } from './message.service';

const PATIENT = 'Patient';
const DOCTOR = 'Doctor';
const MODERATOR = 'Moderator';
const ADMIN = 'Admin';
const TOKEN = 'currentUser';
const DEFAULT_AVATAR = '../../assets/img/default-avatar.png';

@Injectable()
export class  AuthenticationService  {

    constructor(private http: HttpClient,
                private router: Router,
                private tokenService: TokenService,
                private messageService: MessageService) { }

    url = HOST_URL;
    jwtHelper = new JwtHelperService();
    token = TOKEN;

    private AvatarURL = new BehaviorSubject<string>(this.checkAvatarUrl());

    // check if user is logged
    private isLoginSubject = new BehaviorSubject<boolean>(this.hasAccessToken());

    // check if user is a patient
    private isPatientSubject = new BehaviorSubject<boolean>(this.hasPatientRole());

    // check if user is a doctor
    private isDoctorSubject = new BehaviorSubject<boolean>(this.hasDoctorRole());

    // check if user is a moderator
    private isModeratorSubject = new BehaviorSubject<boolean>(this.hasModeratorRole());

    // check if user is an admin
    private isAdminSubject = new BehaviorSubject<boolean>(this.hasAdminRole());


    // get an access token
    login(username: string, password: string): Observable<ICurrentUser> {
        return this.http.post<ICurrentUser>(this.url + `/api/Signin`, { username: username, password: password })
            .pipe(map(user => {
                if (user && user.access_token) {
                    // save tokens into local storage
                    localStorage.setItem(TOKEN, JSON.stringify(user));
                    // set flag that a user is logged in
                    this.isLoginSubject.next(true);
                    // connect to SignalR websocket
                    this.messageService.startConnection();
                    // set user role depending on the token claims
                    this.setUserRole();
                    this.AvatarURL.next(this.checkAvatarUrl());
                }
                return user;
            }));
    }
    getAvatarURL(): Observable<string> {
        return this.AvatarURL.asObservable();
    }
    checkAvatarUrl(): string {
        if (localStorage.getItem(TOKEN)) {
            const currentUser = JSON.parse(localStorage.getItem(TOKEN));
            if (currentUser.user_avatar) {
                return this.url + currentUser.user_avatar;
            }
        }
        return DEFAULT_AVATAR;
    }

    private setUserRole() {
        if (this.hasPatientRole()) {
            this.isPatientSubject.next(true);
        } else if (this.hasDoctorRole()) {
            this.isDoctorSubject.next(true);
        } else if (this.hasModeratorRole()) {
            this.isModeratorSubject.next(true);
        } else if (this.hasAdminRole()) {
            this.isAdminSubject.next(true);
        } else {
            this.logout();
        }
    }
    isLoggedIn(): Observable<boolean> {
        return this.isLoginSubject.asObservable();
    }
    hasAccessToken(): boolean {
        if (localStorage.getItem(TOKEN)) {
            return true;
        }
        return false;
    }
    isPatient(): Observable<boolean> {
        return this.isPatientSubject.asObservable();
    }
    hasPatientRole(): boolean {
        if (this.getUserRole() === PATIENT) {
            return true;
        }
        return false;
    }
    isDoctor(): Observable<boolean> {
        return this.isDoctorSubject.asObservable();
    }
    hasDoctorRole(): boolean {
        if (this.getUserRole() === DOCTOR) {
            return true;
        }
        return false;
    }
    isModerator(): Observable<boolean> {
        return this.isModeratorSubject.asObservable();
    }
    hasModeratorRole(): boolean {
        if (this.getUserRole() === MODERATOR) {
            return true;
        }
        return false;
    }
    isAdmin(): Observable<boolean> {
        return this.isAdminSubject.asObservable();
    }
    hasAdminRole(): boolean {
        if (this.getUserRole() === ADMIN) {
            return true;
        }
        return false;
    }

    // return if user is approved doctor
    isApprovedPatient(): boolean {
        if (localStorage.getItem(TOKEN)) {
            const tokenPayload = this.getTokenPayload();
            if (tokenPayload['ApprovedPatient'] !== undefined) {
                return true;
            }
        }
        return false;
    }

    // return if user is approved doctor
    isApprovedDoctor(): boolean {
        if (localStorage.getItem(TOKEN)) {
            const tokenPayload = this.getTokenPayload();
            if (tokenPayload['ApprovedDoctor'] !== undefined) {
                return true;
            }
        }
        return false;
    }

    // return user role
    private getUserRole(): string {
        if (localStorage.getItem(TOKEN)) {
            const tokenPayload = this.getTokenPayload();
            return tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        }
    }

    private getTokenPayload(): string {
        return this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem(TOKEN)).access_token);
    }


    // refresh access token
    refreshToken(): Observable<ICurrentUser> {
        return this.tokenService.refresh()
          .pipe(
            map(user => {
                if (user && user.access_token) {
                    localStorage.setItem(TOKEN, JSON.stringify(user));
                }
              return <ICurrentUser>user;
          }));
    }

    // get a token of logged user
    getAuthToken(): string {
        return this.tokenService.getAuthToken();
    }

    // log out user
    logout() {
        // clear localStorage
        localStorage.removeItem(TOKEN);
        // disconnect SignalR socket
        this.messageService.stopConnection();
        // set all flags about user status to false
        this.removeAllAuthorizeFlags();
        // redirect to sign in page
        this.router.navigate([SIGN_IN]);
    }
    private removeAllAuthorizeFlags() {
        this.isLoginSubject.next(false);
        this.isPatientSubject.next(false);
        this.isDoctorSubject.next(false);
        this.isModeratorSubject.next(false);
        this.isAdminSubject.next(false);
    }
}

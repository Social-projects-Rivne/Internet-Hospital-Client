import { Injectable } from '@angular/core';
import { HOST_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { ICurrentUser } from '../Models/CurrentUser';

const TOKEN = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor(private http: HttpClient) { }

    refresh() {
        const currentUser = JSON.parse(localStorage.getItem(TOKEN));
        const token = currentUser.refresh_token;
        return this.http.post<ICurrentUser>(HOST_URL + '/api/Signin/refresh', { RefreshToken: token });
    }

    getAuthToken(): string {
        const currentUser = JSON.parse(localStorage.getItem(TOKEN));
        if (currentUser != null) {
            return currentUser.access_token;
        }
        return '';
    }
}

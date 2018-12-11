import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Observable, BehaviorSubject } from 'rxjs';
import { HOST_URL } from '../config';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    hubConnection: HubConnection;
    audio = new Audio();

    constructor(private http: HttpClient, private tokenService: TokenService) {
        this.audio.src = '.../../assets/beep.wav';
        this.audio.load();
        this.createConnection();
        this.registerOnServerEvents();
    }

    /* Observable items */
    private ifUnreadMessage = new BehaviorSubject<boolean>(true);
    private unReadMessages = new BehaviorSubject<number>(0);

    ifUnread(): Observable<boolean> {
        return this.ifUnreadMessage.asObservable();
    }
    unreadCount(): Observable<number> {
        return this.unReadMessages.asObservable();
    }

    /* Work with API*/
    getNotifications(page: number) {
        return this.http.get(HOST_URL + '/api/notification?page=' + page.toString() + '&pagecount=' + 5);
    }

    changeStatus(id: number) {
        return this.http.patch(HOST_URL + '/api/notification/change', id);
    }

    /* SignalR settings */
    private createConnection() {
        this.hubConnection = new HubConnectionBuilder()
        .withUrl(HOST_URL + '/notifications', { accessTokenFactory: () => this.tokenService.getAuthToken()})
        .build();
    }

    private registerOnServerEvents(): void {
        this.hubConnection.on('Notify', (count: number) => {
            this.audio.play();
            if (count > 0) {
                this.ifUnreadMessage.next(true);
                this.unReadMessages.next(count);
            } else {
                this.ifUnreadMessage.next(false);
                this.unReadMessages.next(0);
            }
        });
        this.hubConnection.on('OnLoad', (count: number) => {
            if (count > 0) {
                this.ifUnreadMessage.next(true);
                this.unReadMessages.next(count);
            } else {
                this.ifUnreadMessage.next(false);
                this.unReadMessages.next(0);
            }
        });
        this.hubConnection.onclose((e) => {
            console.log('Disconnect');
        });
    }

    startConnection() {
        this.hubConnection
        .start()
        .then(() => {
            console.log('Hub connection started');
        }).catch(err => {
            console.log(err);
            this.tokenService.refresh().subscribe(
                user => {
                    if (user && user.access_token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.startConnection();
                    }
                }
            );
        });
    }

    stopConnection() {
        this.hubConnection.stop();
    }
}

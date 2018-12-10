import { Injectable } from '@angular/core';
import {HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

    hubConnection: HubConnection;
    refresh = false;
    audio = new Audio();
    constructor() {
        this.audio.src = '.../../assets/beep.wav';
        this.audio.load();
        this.createConnection();
        this.registerOnServerEvents();
        this.connect();
    }
    count = 0;

    private ifUnreadMessage = new BehaviorSubject<boolean>(this.hasUnread());
    private unReadMessages = new BehaviorSubject<number>(this.howMany());
    ifUnread(): Observable<boolean> {
        return this.ifUnreadMessage.asObservable();
    }
    private hasUnread(): boolean {
        return this.count > 0;
    }

    unreadCount(): Observable<number> {
        return this.unReadMessages.asObservable();
    }
    private howMany(): number {
        return this.count;
    }

    connect() {
        this.startConnection();
    }

    private createConnection() {
        this.hubConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:44357' + '/notifications', { accessTokenFactory: () => this.getAuthToken()})
        .build();
    }

    public stopConnection() {
        this.hubConnection.stop();
    }

    getAuthToken(): string {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != null) {
            return currentUser.access_token;
        }
        return '';
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
    }

    private startConnection(): void {
        this.hubConnection
        .start()
        .then(() => {
            console.log('Hub connection started');
        });
    }
}

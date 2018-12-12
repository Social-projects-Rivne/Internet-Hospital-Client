import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IllnessHistory } from '../Models/IllnessHistory';
import { PaginationService } from './pagination.service';
import { HOST_URL, PATIENT_GET_AVATAR, PATIENT_UPDATE_AVATAR, API_PATIENT, PATIENT_GET_HISTORIES } from '../config';
import { DatePipe } from '@angular/common';
import { setMilliseconds } from 'date-fns';

const start = 'searchfromdate';
const end = 'searchtodate';

@Injectable({
    providedIn: 'root'
})
export class UsersProfileService {

    illnessHistories: IllnessHistory[];
    illnessHistoriesAmount: number;

    url = HOST_URL + PATIENT_GET_AVATAR;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        params: new HttpParams()
            .set('page', this.paginationService.pageIndex.toString())
            .set('pagecount', this.paginationService.pageSize.toString())
    };

    constructor(private http: HttpClient, private paginationService: PaginationService, private datePipe: DatePipe) { }

    getImage() {
        return this.http.get(this.url);
    }

    updateAvatar(fileAvatar: File = null) {
        const formData = new FormData();
        formData.append('Image', fileAvatar);
        return this.http.put(HOST_URL + PATIENT_UPDATE_AVATAR, formData);
    }

    getProfile() {
        const getUrl = HOST_URL + API_PATIENT;
        return this.http.get(getUrl);
    }

    getHistories(fromDate?: Date, toDate?: Date) {
        const historiesUrl = HOST_URL + PATIENT_GET_HISTORIES;
        if (fromDate !== null && fromDate !== undefined) {
            this.httpOptions.params = this.httpOptions.params.set(start, fromDate.toDateString());
        } else {
            this.httpOptions.params = this.httpOptions.params.delete(start);
        }
        if (toDate !== null && toDate !== undefined) {
            this.httpOptions.params = this.httpOptions.params.set(end, toDate.toDateString());
        } else {
            this.httpOptions.params = this.httpOptions.params.delete(end);
        }
        this.http.get(historiesUrl, this.httpOptions)
            .subscribe((result: any) => {
                console.log(result);
                this.illnessHistories = result.histories;
                this.illnessHistoriesAmount = result.totalHistories;
                for (const history of this.illnessHistories) {
                    history.finishAppointmentTime = new Date(null);
                    console.log(history.finishAppointmentTime);
                    history.finishAppointmentTime.setTime(history.finishAppointmentTimeStamp.valueOf());
                    console.log(history.finishAppointmentTimeStamp.valueOf());
                    console.log(history.finishAppointmentTime);

                    const ticks = history.finishAppointmentTimeStamp.valueOf();
                    const fff = ticks * 1000;
                    const todayTicks = new Date().setMilliseconds(fff);
                    // const diff = fff - todayTicks;
                    console.log(fff);
                    console.log(todayTicks);
                    // console.log(diff);
                    // const days = Math.floor(diff / (24 * 60 * 60 * 1000));
                    // const hours = (diff / (60 * 60 * 1000)) % 24;
                    // const mins = (diff / (60 * 1000)) % 60;

                    // console.log(hours);
                    const hh = Math.floor(ticks / 3600);
                    const mm = Math.floor((ticks % 3600) / 60);
                    const ss = ticks % 60;
                    // console.log(this.pad(hh, 2) + ':' + this.pad(mm, 2) + ':' + this.pad(ss, 2) );
                }
            });
    }
    pad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }
}

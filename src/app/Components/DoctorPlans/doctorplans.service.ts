import { Injectable } from '@angular/core';
import { HOST_URL } from 'src/app/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Appointment } from './Appointment';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/Services/pagination.service';

const DOCTOR_ID = 'DoctorId'
const PAGE = 'page';
const PAGE_COUNT = 'pageCount';
const FROM = 'From';
const TILL = 'Till'

@Injectable({
  providedIn: 'root'
})
export class DoctorplansService {
  appointmentList: Appointment[];
  appointmentsAmount: number;

  url = HOST_URL + '/api/Appointments/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
      .set('page', this.paginationService.pageIndex.toString())
      .set('pagecount', this.paginationService.pageSize.toString())
  };

  // getDoctorAppointments(id: number) {
  //   const appointmentsUrl = `${this.url}/${id}`;
  //   return this.http.get(appointmentsUrl, this.httpOptions);
  // }

  getDoctorAppointments(name?: string) {
    const appointmentsUrl = this.url;

    this.http.get(appointmentsUrl, this.httpOptions)
    .subscribe((result: any) => {
      this.appointmentList = result.appointments;
      this.appointmentsAmount = result.quantity;
  });
  }

  constructor(private http: HttpClient,
              private datePipe: DatePipe,
              private paginationService: PaginationService) { }

  // getAppointmentExtended(
  //   doctorId: number,
  //   pageCount: number,
  //   page: number,
  //   From: Date,
  //   Till: Date): Observable<Appointment[]> {
  //   const url = this.url + `/available?${DOCTOR_ID}=${doctorId}&`
  //     + `${PAGE}=${page + 1}&`
  //     + `${PAGE_COUNT}=${pageCount}&`
  //     + `${FROM}=${From.toUTCString()}&`
  //     + `${TILL}=${Till.toUTCString()}&`;
  //   return this.http.get<Appointment[]>(url, this.httpOptions);
  // }

  deleteAppointment(appointmentId: number | string) {
    const specUrl = HOST_URL + '/api/Appointments/delete';
    return this.http.request('delete', specUrl, { body: { id: appointmentId } });
  }

  cancelAppointment(appointmentId: number | string) {
    const specUrl = HOST_URL + '/api/Appointments/cancel';
    return this.http.post(specUrl, { id: appointmentId });
  }

  getAppointments() {
    const specUrl = HOST_URL + '/api/Appointments';
    return this.http.get<Appointment[]>(specUrl);
  }

  getMyAppointments(id: number) {
    const specUrl = HOST_URL + `/api/Appointments/getavailable/${id}`;
    return this.http.get<any>(specUrl);
  }

  addAppointment(start: Date, end: Date) {
    const specUrl = HOST_URL + '/api/Appointments/create';
    return this.http.post(specUrl, {
      starttime: this.datePipe.transform(start, 'short'),
      endtime: this.datePipe.transform(end, 'short')
    });
  }
}

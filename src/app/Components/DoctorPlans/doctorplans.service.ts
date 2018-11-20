import { Injectable } from '@angular/core';
import { HOST_URL } from 'src/app/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Appointment } from './Appointment';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/Services/pagination.service';
import { map } from 'rxjs/operators';
import { element } from '@angular/core/src/render3/instructions';

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

  getDoctorAppointments(id?: number) {
    const appointmentsUrl = this.url;

    this.http.get(appointmentsUrl, this.httpOptions)
    //.pipe(
      //map<Appointment>(res => res.list.map(element => ({
        //...element,
        //startTime: this.datePipe.transform(element.startTime, 'short')
      //})))
      //map(val => val.startTime = this.datePipe.transform(val.startTime, 'short'))
    //)
    .subscribe((result: any ) => {
      this.appointmentList = result.appointments;
      this.appointmentsAmount = result.quantity;       
  });
  } 

  transformDate(date) {
    return this.datePipe.transform(date, 'short');
  }

  // this.appointmentList.forEach(appointment => {
  //   return this.datePipe.transform(appointment.startTime, 'yyyy-MM-dd');
  // });  

  // {
  //   starttime: this.datePipe.transform(start, 'short'),
  //   endtime: this.datePipe.transform(end, 'short')
  // }

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

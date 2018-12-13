import { Injectable } from '@angular/core';
import { HOST_URL } from 'src/app/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Appointment } from './Appointment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DoctorplansService {

  constructor(private http: HttpClient,
    private datePipe: DatePipe) { }

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

  addAppointment(start: Date, end: Date) {
    const utcStartTime = new Date(start.toUTCString());
    const utcEndTime = new Date(end.toUTCString());
    const specUrl = HOST_URL + '/api/Appointments/create';
    return this.http.post(specUrl, {
      starttime: this.datePipe.transform(utcStartTime, 'short'),
      endtime: this.datePipe.transform(utcEndTime, 'short')
    });
  }

  getDoctorAppointments(httpOptions: object) {
    const specUrl = HOST_URL + '/api/Appointments/available';
    return this.http.get(specUrl, httpOptions);
  }

  subscribePatientToAppointment(appointmentId: number) {
    const scecUrl = HOST_URL + '/api/Appointments/subscribe';
    return this.http.post(scecUrl, { Id: appointmentId });
  }

  getPatientAppointments() {
    const specUrl = HOST_URL + '/api/Appointments/forpatient';
    return this.http.get<Appointment[]>(specUrl);
  }

  unsubscribeToAppointment(appointmentId: number) {
    const scecUrl = HOST_URL + '/api/Appointments/unsubscribe';
    return this.http.post(scecUrl, { id: appointmentId });
  }
}

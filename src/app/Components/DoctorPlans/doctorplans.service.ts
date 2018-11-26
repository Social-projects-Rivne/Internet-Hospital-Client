import { Injectable } from '@angular/core';
import { HOST_URL } from 'src/app/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Appointment } from './Appointment';
import { DatePipe } from '@angular/common';
import { PaginationService } from 'src/app/Services/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorplansService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
      .set('page', this.paginationService.pageIndex.toString())
      .set('pagecount', this.paginationService.pageSize.toString())
  };

  constructor(private http: HttpClient,
              private datePipe: DatePipe,
              private paginationService: PaginationService) { }

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
    const specUrl = HOST_URL + '/api/Appointments/create';
    return this.http.post(specUrl, {
      starttime: this.datePipe.transform(start, 'short'),
      endtime: this.datePipe.transform(end, 'short')
    });
  }

  getDoctorAppointments(id: number, filterFrom?, filterTill?) {
    const specUrl = HOST_URL + '/api/Appointments/available';
    this.httpOptions.params = this.httpOptions.params.set('doctorId', id.toString());

    if (filterFrom) {
      this.httpOptions.params = this.httpOptions.params.set('from', this.datePipe.transform(filterFrom, 'short'));
    } else {
      this.httpOptions.params = this.httpOptions.params.delete('from');
    }

    if (filterTill) {
      this.httpOptions.params = this.httpOptions.params.set('till', this.datePipe.transform(filterTill, 'short'));
    } else {
      this.httpOptions.params = this.httpOptions.params.delete('till');
    }

    return this.http.get(specUrl, this.httpOptions);
  }

  subscribePatientToAppointment(appointmentId: number) {
    const scecUrl = HOST_URL + '/api/Appointments/subscribe';
    return this.http.post(scecUrl, { Id: appointmentId });
  }
}

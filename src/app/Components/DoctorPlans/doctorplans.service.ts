import { Injectable } from '@angular/core';
import { HOST_URL } from 'src/app/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Appointment } from './Appointment';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/Services/pagination.service';
import { map } from 'rxjs/operators';
import { element } from '@angular/core/src/render3/instructions';
import { AppointmentFilter } from 'src/app/Models/AppointmentFilter';

@Injectable({
  providedIn: 'root'
})
export class DoctorplansService {
  appointmentList: Appointment[];
  appointmentsAmount: number;

  url = HOST_URL + '/api/Appointments/available/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
      .set('page', this.paginationService.pageIndex.toString())
      .set('pagecount', this.paginationService.pageSize.toString())
  };

  getDoctorAppointments(id: number, filterFrom?, filterTill?) {
    console.log(filterFrom);
    const appointmentsUrl = this.url;
    this.httpOptions.params = this.httpOptions.params.set('doctorId', id.toString());
    if(filterFrom) {
      if(filterFrom) {
        this.httpOptions.params = this.httpOptions.params.set('from', this.datePipe.transform(filterFrom, 'short'));
      }
      else {
        this.httpOptions.params = this.httpOptions.params.delete('from');
      }

      if(filterTill) {
         this.httpOptions.params = this.httpOptions.params.set('till', this.datePipe.transform(filterTill, 'short'));
       }
       else {
         this.httpOptions.params = this.httpOptions.params.delete('till');
       }
    }

    this.http.get(appointmentsUrl, this.httpOptions)
    // .pipe(
    //   map(result => result.map(element => ({
    //     ...element,
    //     startTime: this.datePipe.transform(element.startTime, 'short')
    //   })))
    //   //map(val => val = this.datePipe.transform(val.startTime, 'short'))
    // )
    .subscribe((result: any ) => {
      this.appointmentList = result.appointments;
      this.appointmentsAmount = result.quantity;
      console.log(result.appointments);
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
}

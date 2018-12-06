import { Injectable } from '@angular/core';
import { HOST_URL, API_DOCTORS, DOCTOR_GET_AVATAR, DOCTOR_UPDATE_AVATAR, DOCTOR_GET_PROFILE } from '../config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaginationService } from './pagination.service';
import { Specialization } from '../Models/Specialization';
import { FormGroup } from '@angular/forms';
import { IllnessHistory } from '../Models/IllnessHistory';
import { DatePipe } from '@angular/common';
import { PreviousAppointment } from '../Models/PreviousAppointment';
import { PreviousAppointmentFilter } from '../Models/PreviousAppointmentFilter';

const searchbyname = 'searchbyname';
const searchbyspecialization = 'searchbyspecialization';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  url = HOST_URL + API_DOCTORS;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams()
      .set('pagecount', this.paginationService.pageSize.toString())
  };

  getDoctor(id?: number) {
    if (id !== null && id !== undefined) {
      const doctorsUrl = `${this.url}/${id}`;
      return this.http.get(doctorsUrl, this.httpOptions);
    } else {
      const getProfile = HOST_URL + DOCTOR_GET_PROFILE;
      return this.http.get(getProfile);
    }
  }

  constructor(private http: HttpClient,
    private paginationService: PaginationService,
    private datePipe: DatePipe) { }

  getImage() {
    return this.http.get(HOST_URL + DOCTOR_GET_AVATAR);
  }

  updateAvatar(fileAvatar: File = null) {
    const formData = new FormData();
    formData.append('Image', fileAvatar);
    return this.http.put(HOST_URL + DOCTOR_UPDATE_AVATAR, formData);
  }

  getDoctors(name?: string, specialization?: number) {
    const doctorsUrl = this.url;
    if (name != null && name !== '') {
      this.httpOptions.params = this.httpOptions.params.set(searchbyname, name);
    } else {
      this.httpOptions.params = this.httpOptions.params.delete(searchbyname);
    }

    if (specialization !== 0 && !isNaN(specialization)) {
      this.httpOptions.params = this.httpOptions.params.set(searchbyspecialization, specialization.toString());
    } else {
      this.httpOptions.params = this.httpOptions.params.delete(searchbyspecialization);
    }
    return this.http.get(doctorsUrl, this.httpOptions);
  }

  getSpecializations() {
    const specUrl = this.url + '/specializations';
    return this.http.get<Specialization[]>(specUrl);
  }

  getPreviousAppointment(filter: PreviousAppointmentFilter, pageIndex: number, pageSize: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
    };

    if (pageIndex) {
      httpOptions.params = httpOptions.params.set('page', (pageIndex + 1).toString());
    } else {
      httpOptions.params = httpOptions.params.delete('page');
    }

    if (pageSize) {
      httpOptions.params = httpOptions.params.set('pageCount', pageSize.toString());
    } else {
      httpOptions.params = httpOptions.params.delete('pageCount');
    }

    if (filter) {
      if (filter.searchKey) {
        httpOptions.params = httpOptions.params.set(searchbyname, filter.searchKey);
      } else {
        httpOptions.params = httpOptions.params.delete(searchbyname);
      }
      if (filter.from) {
        httpOptions.params = httpOptions.params.set('from', filter.from.toDateString());
      } else {
        httpOptions.params = httpOptions.params.delete('from');
      }
      if (filter.till) {
        httpOptions.params = httpOptions.params.set('till', filter.till.toDateString());
      } else {
        httpOptions.params = httpOptions.params.delete('till');
      }
      if (filter.statuses) {
        httpOptions.params = httpOptions.params.delete('statuses');
        filter.statuses.forEach((element) => {
          httpOptions.params = httpOptions.params.append('statuses', element.toString());
        });
      } else {
        httpOptions.params = httpOptions.params.delete('statuses');
      }
    }

    const specUrl = this.url + '/previousappointments';
    return this.http.get<any>(specUrl, httpOptions);
  }

  getAppointmentStatuses() {
    const specUrl = this.url + '/appointmentstatuses';
    return this.http.get<string[]>(specUrl);
  }

  fillIllness(form: FormGroup, appointmentId: number) {
    let illnessHistory = new IllnessHistory();
    illnessHistory = form.value;
    illnessHistory.appointmentId = appointmentId;
    illnessHistory.finishAppointmentTime = this.datePipe.transform(new Date(), 'short');
    const url = HOST_URL + '/api/Doctors/illnesshistory';
    return this.http.post(url, illnessHistory);
  }
}

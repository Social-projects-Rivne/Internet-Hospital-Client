import { Injectable } from '@angular/core';
import { HOST_URL, API_DOCTORS, DOCTOR_GET_AVATAR, DOCTOR_UPDATE_AVATAR, DOCTOR_GET_PROFILE } from '../config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PaginationService } from './pagination.service';
import { Specialization } from '../Models/Specialization';
import { FormGroup } from '@angular/forms';
import { IllnessHistory } from '../Models/IllnessHistory';
import { DatePipe } from '@angular/common';
import { DoctorAppointmentFilter } from '../Models/DoctorAppointmentFilter';
import { AllowedPatientInfo } from '../Models/AllowedPatientInfo';
import { IllnessHistoryFilter } from '../Models/IllnessHistoryFilter';
import { Observable } from 'rxjs';

const searchbyname = 'searchbyname';
const searchbyspecialization = 'searchbyspecialization';
const INCLUDE_ALL = 'includeAll';
const PAGE = 'page';
const PAGE_SIZE = 'pageSize';
const SEARCH_BY_NAME = 'searchByName';
const SORT = 'sort';
const ORDER_BY = 'order';

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

  getPatientInfo(userId: number) {
    const specUrl = this.url + `/getpatientinfo/?userId=${userId}`;
    return this.http.get<AllowedPatientInfo>(specUrl);
  }

  getPatientIllnessHistory(userId: number, filter: IllnessHistoryFilter) {
    let specUrl = this.url + `/getpatientillnesshistory`;
    if (filter) {
      specUrl += filter.getUrl();
    }
    specUrl += `&userId=${userId}`;
    return this.http.get<IllnessHistory[]>(specUrl);
  }

  fillIllness(form: FormGroup, appointmentId: number) {
    let illnessHistory = new IllnessHistory();
    illnessHistory = form.value;
    illnessHistory.appointmentId = appointmentId;
    illnessHistory.finishAppointmentTime = new Date(new Date().toUTCString());
    illnessHistory.finishAppointmentTimeStamp = illnessHistory.finishAppointmentTime.valueOf();
    const url = HOST_URL + '/api/Doctors/illnesshistory';
    return this.http.post(url, illnessHistory);
  }

  getMyPatients(sort: string,
    order: string,
    searchByName: string,
    page: number,
    includeAll: boolean,
    pageSize: number): Observable<any> {
    let url = this.url + '/mypatients' + `?${PAGE}=${page + 1}&`
      + `${PAGE_SIZE}=${pageSize}&`
      + `${INCLUDE_ALL}=${includeAll}&`;
    if (searchByName) {
      url += `${SEARCH_BY_NAME}=${searchByName}&`;
    }
    if (order) {
      url += `${ORDER_BY}=${order}&`;
    }
    if (sort) {
      url += `${SORT}=${sort}`;
    }
    return this.http.get<any>(url, this.httpOptions);
  }

  addToBlackListSelected(userId: number[], description?: string) {
    const specUrl = HOST_URL + '/api/Doctors/addtoblacklist';

    return this.http.post(specUrl, {
      id: userId,
      description: description,
    }, this.httpOptions);
  }

  getMyBlackList(sort: string,
                  order: string,
                  searchByName: string,
                  page: number,
                  includeAll: boolean,
                  pageSize: number): Observable<any> {
    let url = this.url + '/myblacklist' + `?${PAGE}=${page + 1}&`
      + `${PAGE_SIZE}=${pageSize}&`
      + `${INCLUDE_ALL}=${includeAll}&`;
    if (searchByName) {
      url += `${SEARCH_BY_NAME}=${searchByName}&`;
    }
    if (order) {
      url += `${ORDER_BY}=${order}&`;
    }
    if (sort) {
      url += `${SORT}=${sort}`;
    }
    return this.http.get<any>(url, this.httpOptions);
  }

  removeFromBlackListSelected(userId: number[]) {
    const specUrl = HOST_URL + '/api/Doctors/removefromblacklist';

    return this.http.post(specUrl, {
      id: userId,
    }, this.httpOptions);
  }
}

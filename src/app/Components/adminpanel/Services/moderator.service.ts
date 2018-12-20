import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CreatingModerator } from '../../../Models/CreatingModerator';
import { HOST_URL, GET_PATIENT_TO_DOCTOR_REQUESTS,
                   HANDLE_PATIENT_TO_DOCTOR_REQUEST } from '../../../config';
import { Observable } from 'rxjs';
import { ModeratorsData } from '../../../Models/ModeratorsData';
import { PatientToDoctorList } from '../../../Models/PatientToDoctorList';

const PAGE = 'page';
const PAGE_SIZE = 'pageSize';
const PAGE_INDEX = 'pageIndex';
const SEARCH_BY_NAME = 'searchByName';
const INCLUDE_ALL = 'includeAll';
const SORT = 'sort';
const ORDER_BY = 'order';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  url = HOST_URL + '/api/Moderator';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getFilteredModeratorsExtended(sort: string,
                                order: string,
                                searchByName: string,
                                page: number,
                                includeAll: boolean,
                                pageSize: number): Observable<ModeratorsData> {
    const url = this.url + `?${PAGE}=${page + 1}&`
              + `${PAGE_SIZE}=${pageSize}&`
              + `${INCLUDE_ALL}=${includeAll}&`
              + `${SEARCH_BY_NAME}=${searchByName}&`
              + `${ORDER_BY}=${order}&`
              + `${SORT}=${sort}`;
    return this.http.get<ModeratorsData>(url, this.httpOptions);
  }

  postModerator(moderator: CreatingModerator) {
    const body = JSON.stringify(moderator);
    return this.http.post<CreatingModerator>(this.url, body, this.httpOptions);
  }

  deleteModerator(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  deleteModerators(ids: number[]) {
    return this.http.delete(`${this.url}/?ids=${ids.join('&ids=')}`);
  }

  getPatientBecomeDoctorRequests(pageIndex: number, pageSize: number): Observable<PatientToDoctorList> {
    const url = `${HOST_URL}/${GET_PATIENT_TO_DOCTOR_REQUESTS}`
      + `?${PAGE_INDEX}=${pageIndex + 1}&${PAGE_SIZE}=${pageSize}`;
    return this.http.get<PatientToDoctorList>(url, this.httpOptions);
  }

  handlePatientToDoctorRequest(idUser: number, isApprovedUser: boolean) {
    const url = `${HOST_URL}/${HANDLE_PATIENT_TO_DOCTOR_REQUEST}`;
    return this.http.post(url, { id: idUser, isApproved: isApprovedUser }, this.httpOptions);
  }
}

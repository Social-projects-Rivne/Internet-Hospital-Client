import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class PatientIdSharingService {

  private dateSource = new BehaviorSubject(null);
  transferId = this.dateSource.asObservable();

  changeId(id: number) {
    this.dateSource.next(id);
  }
}

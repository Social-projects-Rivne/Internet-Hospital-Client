import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DataSharingService {

  private dateSource = new BehaviorSubject(null);
  transferDate = this.dateSource.asObservable();

  changeDate(start: Date) {
    this.dateSource.next(start);
  }
}

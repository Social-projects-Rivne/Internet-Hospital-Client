import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DoctorAppointmentFilter } from 'src/app/Models/DoctorAppointmentFilter';
import { AppointmentStatus } from 'src/app/Models/AppointmentStatus';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-doctor-appointments-search-item',
  templateUrl: './doctor-appointments-search-item.component.html',
  styleUrls: ['./doctor-appointments-search-item.component.scss']
})
export class DoctorAppointmentsSearchItemComponent implements OnInit {

  @Input()
  statuses: AppointmentStatus[];
  @Output()
  search = new EventEmitter<DoctorAppointmentFilter>();

  filter: DoctorAppointmentFilter;

  constructor(private notification: NotificationService) {
     this.filter = new DoctorAppointmentFilter();
   }

  ngOnInit() {

  }

  onSearch() {
    if (this.filter.till <= this.filter.from) {
      this.notification.error('We don`t have a time machine!');
    } else {
      this.filter.statuses = [];
      this.statuses.forEach((element) => {
        if (element.checked === true) {
          this.filter.statuses.push(element.value);
        }
      });
      this.search.emit(this.filter);
    }
  }

  beginDate($event: any) {
    this.filter.from = $event.target.value;
  }

  finishDate($event: any) {
    this.filter.till = $event.target.value;
  }

  onSearchClear() {
    this.filter.searchKey = '';
  }

  onFromClear() {
    this.filter.from = undefined;
  }

  onTillClear() {
    this.filter.till = undefined;
  }
}

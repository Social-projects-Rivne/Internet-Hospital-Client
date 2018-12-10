import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PreviousAppointmentFilter } from 'src/app/Models/PreviousAppointmentFilter';
import { AppointmentStatus } from 'src/app/Models/AppointmentStatus';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-previous-search-item',
  templateUrl: './previous-search-item.component.html',
  styleUrls: ['./previous-search-item.component.scss']
})
export class PreviousSearchItemComponent implements OnInit {

  @Input()
  statuses: AppointmentStatus[];
  @Output()
  search = new EventEmitter<PreviousAppointmentFilter>();

  filter: PreviousAppointmentFilter;

  constructor(private notification: NotificationService) {
     this.filter = new PreviousAppointmentFilter();
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

  beginDate($event) {
    this.filter.from = $event.target.value;
  }

  finishDate($event) {
    this.filter.till = $event.target.value;
  }

  onSearchClear() {
    this.filter.searchKey = '';
  }

  onFromClear() {
    this.filter.from = null;
  }

  onTillClear() {
    this.filter.till = null;
  }
}

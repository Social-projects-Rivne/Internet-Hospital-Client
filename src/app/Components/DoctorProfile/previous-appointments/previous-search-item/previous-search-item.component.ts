import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PreviousAppointmentFilter } from 'src/app/Models/PreviousAppointmentFilter';
import { AppointmentStatus } from 'src/app/Models/AppointmentStatus';

@Component({
  selector: 'app-previous-search-item',
  templateUrl: './previous-search-item.component.html',
  styleUrls: ['./previous-search-item.component.scss']
})
export class PreviousSearchItemComponent implements OnInit {

  @Input()
  statuses: string[];
  @Output()
  search = new EventEmitter<PreviousAppointmentFilter>();

  selectedStatuses: AppointmentStatus[];
  searchKey: string;
  dateFrom: Date;
  dateTill: Date;

  constructor() { }

  ngOnInit() {

  }

  selected($event) {

  }

  onSearch() {
    const statusValues = new Number[this.selectedStatuses.length];
    this.selectedStatuses.forEach((element) => {
      statusValues.push(element.value);
    });
    this.search.emit(new PreviousAppointmentFilter(this.searchKey, statusValues, this.dateFrom, this.dateTill));
  }

  onSearchClear() {
    this.searchKey = '';
  }
}

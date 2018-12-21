import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IllnessHistoryFilter } from '../../../../Models/IllnessHistoryFilter';

@Component({
  selector: 'app-illness-history-search-item',
  templateUrl: './illness-history-search-item.component.html',
  styleUrls: ['./illness-history-search-item.component.scss']
})
export class IllnessHistorySearchItemComponent implements OnInit {

  startDate: Date = null;
  endDate: Date = null;

  @Output()
  search = new EventEmitter();
  filter = new IllnessHistoryFilter();

  constructor() { }

  ngOnInit() {

  }

  onSearch() {
    this.search.emit(this.filter);
  }

  beginDate(date: any) {
    this.startDate = date.target.value;
  }

  finishDate(date: any) {
    this.endDate = date.target.value;
  }

  onFromClear() {
    this.filter.fromDate = null;
  }

  onTillClear() {
    this.filter.toDate = null;
  }

  dateFilter = (endDate?: Date): boolean => {
    if (this.startDate !== null) {
      return endDate >= this.startDate && endDate <= new Date();
    } else {
      return endDate <= new Date();
    }
  }

  startDateFilter = (startDate?: Date): boolean => {
    if (this.endDate !== null) {
      return startDate <= new Date() && startDate <= this.endDate;
    } else {
      return startDate <= new Date();
    }
  }
}

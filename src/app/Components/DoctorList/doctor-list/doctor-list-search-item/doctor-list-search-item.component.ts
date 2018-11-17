import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Specialization } from 'src/app/Models/Specialization';
import { DoctorFilter } from '../../../../Models/DoctorFilter';

@Component({
  selector: 'app-doctor-list-search-item',
  templateUrl: './doctor-list-search-item.component.html',
  styleUrls: ['./doctor-list-search-item.component.scss']
})
export class DoctorListSearchItemComponent implements OnInit {
  @Input()
  specializations: Specialization[];
  @Output()
  search = new EventEmitter();

  filter = new DoctorFilter();

  constructor() { }

  ngOnInit() {
  }

  onSearch() {
    this.search.emit(this.filter);
  }

  onSearchClear() {
    this.filter.searchKey = '';
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-previous-search-item',
  templateUrl: './previous-search-item.component.html',
  styleUrls: ['./previous-search-item.component.scss']
})
export class PreviousSearchItemComponent implements OnInit {

  @Input()statuses: string[];
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShortContentWithEditors } from '../../../../Models/Content/ShortContentWithEditors';
import { HOST_URL } from 'src/app/config';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss']
})

export class ContentItemComponent implements OnInit {

  @Input() content: ShortContentWithEditors;

  @Output() deleted = new EventEmitter();
  @Output() changed = new EventEmitter();

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.content.previewImageUrls.length; ++i) {
      this.content.previewImageUrls[i] = HOST_URL + this.content.previewImageUrls[i];
    }
  }

  delete() {
    this.deleted.emit();
  }

  edit() {
    this.changed.emit();
  }
}

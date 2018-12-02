import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShortContentWithEditors } from '../../../../Models/Content/ShortContentWithEditors';
import { HOST_URL } from 'src/app/config';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss']
})

export class ContentItemComponent implements OnInit {

  url = HOST_URL;
  imgs = [];

  constructor() {
  }

  @Input() content: ShortContentWithEditors;

  @Output() deleted = new EventEmitter();
  @Output() changed = new EventEmitter();


  ngOnInit() {
    this.content.previewImageUrls.forEach( img => {
      this.imgs.push(HOST_URL + img);
    });
  }

  delete() {
    this.deleted.emit();
  }

  edit() {
    this.changed.emit();
  }
}

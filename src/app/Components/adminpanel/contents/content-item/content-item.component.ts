import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
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

  height = 0;

  @Input() content: ShortContentWithEditors;

  @Output() deleted = new EventEmitter();
  @Output() changed = new EventEmitter();

  @HostListener('window:resize')
  onResize() {
    this.setSliderHeigth();
  }

  constructor() {
  }

  ngOnInit() {
    this.content.previewImageUrls.forEach( img => {
      this.imgs.push(HOST_URL + img);
    });
    this.setSliderHeigth();
  }

  setSliderHeigth() {
    const currWidth = document.getElementById('slideshow-container').offsetWidth;
    this.height = Math.trunc(currWidth / 16 * 9);
  }

  delete() {
    this.deleted.emit();
  }

  edit() {
    this.changed.emit();
  }
}

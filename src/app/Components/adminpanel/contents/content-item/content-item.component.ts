import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShortContentWithEditors } from '../../../../Models/Content/ShortContentWithEditors';
import { HOST_URL } from 'src/app/config';
import { animate, state, style, transition, trigger } from '@angular/animations';

const SLIDE_TIME_IN_MSC = 10000;

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss'],
  animations: [
    trigger('imageDisplay', [
      state('displayed', style({opacity: '1'})),
      state('hidden', style({opacity: '0'})),
      transition('displayed <=> hidden', animate('1000ms cubic-bezier(0.74, 0.97, 0.91, 1)')),
    ]),
  ],
})

export class ContentItemComponent implements OnInit {

  url = HOST_URL;
  imgs = [];
  slideIndex = 0;
  timer = 0;
  height = 0;

  @Input() content: ShortContentWithEditors;

  @Output() deleted = new EventEmitter();
  @Output() changed = new EventEmitter();

  constructor() {
    this.setPlay();
  }

  setPlay() {
    this.timer = window.setTimeout(() => {
      this.nextImg();
    }, SLIDE_TIME_IN_MSC);
  }

  nextImg() {
    window.clearTimeout(this.timer);
    if (this.slideIndex < this.content.previewImageUrls.length - 1) {
      this.slideIndex++;
    } else {
      this.slideIndex = 0;
    }
    this.setPlay();
  }

  prevImg() {
    window.clearTimeout(this.timer);
    if (this.slideIndex !== 0) {
      this.slideIndex--;
    } else {
      this.slideIndex = this.content.previewImageUrls.length - 1;
    }
    this.setPlay();
  }

  ngOnInit() {
  }

  delete() {
    this.deleted.emit();
  }

  edit() {
    this.changed.emit();
  }
}

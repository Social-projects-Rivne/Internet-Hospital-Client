import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ShortContentWithEditors } from '../../../../Models/Content/ShortContentWithEditors';
import { HOST_URL } from 'src/app/config';

const SLIDE_TIME_IN_MSC = 3500;

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss'],
  animations: [
    trigger('imageDisplay', [
      state('displayed', style({opacity: '1'})),
      state('hidden', style({opacity: '0'})),
      transition('displayed <=> hidden', animate('500ms cubic-bezier(0.74, 0.97, 0.91, 1)')),
    ]),
  ],
})

export class ContentItemComponent implements OnInit, OnDestroy {

  url = HOST_URL;

  constructor() {
  }

  slideIndex = 0;
  timer: number;
  @Input() content: ShortContentWithEditors;

  @Output() deleted = new EventEmitter();
  @Output() changed = new EventEmitter();

  ngOnInit() {
    this.setAutoplay();
  }

  ngOnDestroy() {
    window.clearInterval(this.timer);
  }

  setAutoplay() {
    this.timer = window.setInterval(() => {
      this.nextImg();
    }, SLIDE_TIME_IN_MSC);
  }

  delete() {
    this.deleted.emit();
  }

  nextImg() {
    window.clearInterval(this.timer);
    if (this.slideIndex < this.content.previewImageUrls.length - 1) {
      this.slideIndex++;
    } else {
      this.slideIndex = 0;
    }
    this.setAutoplay();
  }

  prevImg() {
    window.clearInterval(this.timer);
    if (this.slideIndex !== 0) {
      this.slideIndex--;
    } else {
      this.slideIndex = this.content.previewImageUrls.length - 1;
    }
    this.setAutoplay();
  }

  edit() {
    this.changed.emit();
  }
}

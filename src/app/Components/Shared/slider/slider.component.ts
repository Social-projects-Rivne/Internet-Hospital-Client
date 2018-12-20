import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

const SLIDE_TIME_IN_MSC = 10000;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('imageDisplay', [
      state('displayed', style({opacity: '1'})),
      state('hidden', style({opacity: '0'})),
      transition('displayed <=> hidden', animate('1000ms cubic-bezier(0.74, 0.97, 0.91, 1)')),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() slideDelayTime = SLIDE_TIME_IN_MSC;
  slideIndex = 0;
  timer = 0;

  constructor() {}

  setPlay() {
    this.timer = window.setTimeout(() => {
      this.nextImg();
    }, this.slideDelayTime);
  }

  nextImg() {
    window.clearTimeout(this.timer);
    if (this.slideIndex < this.images.length - 1) {
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
      this.slideIndex = this.images.length - 1;
    }
    this.setPlay();
  }

  ngOnInit() {
    this.setPlay();
  }
}

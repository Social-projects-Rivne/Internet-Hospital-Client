import { Component, OnInit, OnDestroy, Input } from '@angular/core';
const SLIDE_TIME_IN_MSC = 3000;

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, OnDestroy {

  slideIndex = 0;
  timer: number;
  @Input() images: string[];
  @Input() slideChangeDelay = SLIDE_TIME_IN_MSC;

  constructor() { }

  ngOnInit() {
    console.log(this.images);
    this.setAutoplay();
  }

  setAutoplay() {
    this.timer = window.setTimeout(() => {
      this.nextImg();
    }, SLIDE_TIME_IN_MSC);
  }

  nextImg() {
    window.clearTimeout(this.timer);
    if (this.slideIndex < this.images.length - 1) {
      this.slideIndex++;
    } else {
      this.slideIndex = 0;
    }
    this.setAutoplay();
  }

  prevImg() {
    if (this.slideIndex !== 0) {
      this.slideIndex--;
    } else {
      this.slideIndex = this.images.length - 1;
    }
    this.setAutoplay();
  }

  ngOnDestroy() {
    window.clearInterval(this.timer);
  }
}

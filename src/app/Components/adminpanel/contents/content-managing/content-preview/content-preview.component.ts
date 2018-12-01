import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContentHandlingService } from '../../../Services/content-handling.service';

const SLIDE_TIME_IN_MSC = 3500;

@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss'],
})

export class ContentPreviewComponent implements OnInit, OnDestroy {


  constructor(private handlingService: ContentHandlingService) {
  }

  date = Date.now();

  slideIndex = 0;
  timer: number;

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

  nextImg() {
    window.clearInterval(this.timer);
    if (this.slideIndex < this.handlingService.croppedImgs.length - 1) {
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
      this.slideIndex = this.handlingService.croppedImgs.length - 1;
    }
    this.setAutoplay();
  }
}

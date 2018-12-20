import { Component, OnInit } from '@angular/core';
import { ContentHandlingService } from '../../../Services/content-handling.service';
import { ImagesCroppingService } from '../../../Services/images-cropping.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

const SLIDE_TIME_IN_MSC = 10000;

@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss'],
  animations: [
    trigger('imageDisplay', [
      state('displayed', style({opacity: '1'})),
      state('hidden', style({opacity: '0'})),
      transition('displayed <=> hidden', animate('1000ms cubic-bezier(0.74, 0.97, 0.91, 1)')),
    ]),
  ],
})

export class ContentPreviewComponent implements OnInit {

  slideIndex = 0;
  timer = 0;
  date = Date.now();

  constructor(private handlingService: ContentHandlingService,
              private previewImgsService: ImagesCroppingService) {
  }

  ngOnInit() {
    this.setPlay();
  }

  setPlay() {
    this.timer = window.setTimeout(() => {
      this.nextImg();
    }, SLIDE_TIME_IN_MSC);
  }

  nextImg() {
    window.clearTimeout(this.timer);
    if (this.slideIndex < this.previewImgsService.croppedImgs.length - 1) {
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
      this.slideIndex = this.previewImgsService.croppedImgs.length - 1;
    }
    this.setPlay();
  }
}

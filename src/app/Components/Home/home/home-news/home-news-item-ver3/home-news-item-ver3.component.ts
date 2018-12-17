import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ShortContentWithEditors } from 'src/app/Models/Content/ShortContentWithEditors';
import { HOST_URL } from 'src/app/config';

const SLIDE_TIME_IN_MSC = 10000;

@Component({
  selector: 'app-home-news-item-ver3',
  templateUrl: './home-news-item-ver3.component.html',
  styleUrls: ['./home-news-item-ver3.component.scss'],
  animations: [
    trigger('imageDisplay', [
      state('displayed', style({opacity: '1'})),
      state('hidden', style({opacity: '0'})),
      transition('displayed <=> hidden', animate('1000ms cubic-bezier(0.74, 0.97, 0.91, 1)')),
    ]),
  ],

})

export class HomeNewsItemVer3Component implements OnInit {

  imageUrls = [];
  slideIndex = 0;
  timer = 0;
  @Input() content: ShortContentWithEditors;

  constructor() { }

  ngOnInit() {
    this.content.previewImageUrls.forEach(item => {
      this.imageUrls.push(HOST_URL + item);
    });
    this.setPlay();
  }

  setPlay() {
    this.timer = window.setTimeout(() => {
      this.nextImg();
    }, SLIDE_TIME_IN_MSC);
  }

  nextImg() {
    window.clearTimeout(this.timer);
    if (this.slideIndex < this.imageUrls.length - 1) {
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
      this.slideIndex = this.imageUrls.length - 1;
    }
    this.setPlay();
  }
}

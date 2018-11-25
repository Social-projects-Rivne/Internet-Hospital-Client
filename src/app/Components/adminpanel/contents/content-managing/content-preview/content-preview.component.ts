import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ContentEditingService } from '../../../services/content-editing.service';

const SLIDE_TIME_IN_MSC = 3500;

@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss'],
  animations: [
    trigger('imageDisplay', [
      state('displayed', style({ opacity: '1' })),
      state('hidden', style({ opacity: '0' })),
      transition('displayed <=> hidden', animate('500ms cubic-bezier(0.74, 0.97, 0.91, 1)')),
    ]),
  ],
})

export class ContentPreviewComponent implements OnInit {


  constructor(private editingContentService: ContentEditingService) {
    console.log(this.editingContentService.form);
  }

  slideIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.nextImg();
    }, SLIDE_TIME_IN_MSC);
  }

  nextImg() {
    if (this.slideIndex < this.editingContentService.croppedImgs.length - 1) {
      this.slideIndex++;
    } else {
      this.slideIndex = 0;
    }
  }

  prevImg() {
    if (this.slideIndex !== 0) {
      this.slideIndex--;
    } else {
      this.slideIndex = this.editingContentService.croppedImgs.length - 1;
    }
  }
}

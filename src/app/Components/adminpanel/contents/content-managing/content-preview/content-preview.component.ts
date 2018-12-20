import { Component, OnInit } from '@angular/core';
import { ContentHandlingService } from '../../../Services/content-handling.service';
import { ImagesCroppingService } from '../../../Services/images-cropping.service';

const SLIDE_TIME_IN_MSC = 10000;

@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss']
})

export class ContentPreviewComponent implements OnInit {

  slideIndex = 0;
  timer = 0;
  date = Date.now();

  constructor(private handlingService: ContentHandlingService,
              private previewImgsService: ImagesCroppingService) {
  }

  ngOnInit() {
  }
}

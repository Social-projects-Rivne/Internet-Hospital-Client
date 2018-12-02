import { Component, OnInit, HostListener } from '@angular/core';
import { ContentHandlingService } from '../../../Services/content-handling.service';
import { ImagesCroppingService } from '../../../Services/images-cropping.service';


@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss'],
})

export class ContentPreviewComponent implements OnInit {

  height = 0;
  date = Date.now();

  @HostListener('window:resize')
  onResize() {
    const currWidth = document.getElementById('slideshow-container').offsetWidth;
    this.height = Math.trunc(currWidth / 16 * 9);
  }

  constructor(private handlingService: ContentHandlingService,
              private previewImgsService: ImagesCroppingService) {
  }


  ngOnInit() {
    const currWidth = document.getElementById('slideshow-container').offsetWidth;
    this.height = Math.trunc(currWidth / 16 * 9);
  }
}

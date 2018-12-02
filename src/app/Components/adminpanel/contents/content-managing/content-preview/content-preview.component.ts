import { Component, OnInit } from '@angular/core';
import { ContentHandlingService } from '../../../Services/content-handling.service';

@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss'],
})

export class ContentPreviewComponent implements OnInit {

  constructor(private handlingService: ContentHandlingService) {
  }

  date = Date.now();

  ngOnInit() {
  }
}

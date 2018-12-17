import { Component, OnInit, Input } from '@angular/core';
import { ShortContentWithEditors } from 'src/app/Models/Content/ShortContentWithEditors';
import { HOST_URL } from 'src/app/config';

@Component({
  selector: 'app-home-news-item',
  templateUrl: './home-news-item.component.html',
  styleUrls: ['./home-news-item.component.scss']
})
export class HomeNewsItemComponent implements OnInit {
  height = 500;
  imageUrls = [];
  @Input()
  content: ShortContentWithEditors;

  constructor() { }

  ngOnInit() {
    this.content.previewImageUrls.forEach(item => {
      this.imageUrls.push(HOST_URL + item);
    });
  }

}

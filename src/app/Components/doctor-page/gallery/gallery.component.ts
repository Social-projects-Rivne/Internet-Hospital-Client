import { Component, Input, HostListener, AfterContentChecked } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImageModalDialogComponent } from './image-modal-dialog.component';
import { Overlay } from '@angular/cdk/overlay';
import { GalleryModel } from '../../../Models/GalleryModel';
import { HOST_URL } from 'src/app/config';

const SUM_OF_WIDTH_OF_SWITCH_BUTTONS = 80;
const WIDTH_OF_1_IMG = 134;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements AfterContentChecked {
  url = HOST_URL;
  @Input() images: string[];
  startIndex = 0;
  widthOf1Image = WIDTH_OF_1_IMG;
  amountOfPicsOnScreen = 1;

  @HostListener('window:resize')
  onResize() {
    const currWidth = document.getElementById('gallery-container').offsetWidth;
    this.amountOfPicsOnScreen = Math.trunc((currWidth - SUM_OF_WIDTH_OF_SWITCH_BUTTONS)
                                              / WIDTH_OF_1_IMG);
                                              // console.log(this.amountOfPicsOnScreen);

  }

  constructor(private dialog: MatDialog, private overlay: Overlay) {}

  ngAfterContentChecked() {
    const currWidth = document.getElementById('gallery-container').offsetWidth;
    this.amountOfPicsOnScreen = Math.trunc((currWidth - SUM_OF_WIDTH_OF_SWITCH_BUTTONS)
                                              / WIDTH_OF_1_IMG);
                                              // console.log(this.amountOfPicsOnScreen, currWidth);
  }

  next() {
    if (this.startIndex >= this.images.length - this.amountOfPicsOnScreen + 1) {
      this.startIndex++;
    } else {
      this.startIndex = 0;
    }
    console.log(this.startIndex);
  }

  previous() {
    if (this.startIndex = 0) {
      this.startIndex = this.images.length + this.amountOfPicsOnScreen;
    }
    console.log(this.startIndex);
  }

  openDialog(i) {
    const strategy = this.overlay.scrollStrategies.block();
    const data = new GalleryModel();
    data.images = this.images;
    data.selected = i;
    this.dialog.open(ImageModalDialogComponent, {
      panelClass: 'custom-dialog-container',
      scrollStrategy: strategy,
      autoFocus: true,
      data: data
    });
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent  {

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {imagePath: string}) {}

    click(): void {
      this.dialogRef.close();
    }

}

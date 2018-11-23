import { Component, OnInit } from '@angular/core';

import { Content } from '../../../../../Models/Content';
import { ImageValidationService } from '../../../../../Services/image-validation.service';
import { ContentService } from '../../../services/content.service';
import { ContentEditingService } from '../../../services/content-editing.service';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

const MAX_WIDTH_IMG = 2000;
const MAX_HEIGHT_IMG = 2000;
const MIN_WIDTH_IMG = 300;
const MIN_HEIGHT_IMG = 300;

@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.scss']
})

export class ContentEditComponent implements OnInit {

  currentImgIndex = -1;
  editorContent = '';
  constructor(private dataService: ContentService, private contentService: ContentEditingService,
    private imgService: ImageValidationService) {
  }

  ngOnInit() {
  }

  onClear() {
    this.contentService.clearImages();
    this.currentImgIndex = -1;
    this.editorContent = '';
  }

  handleFileInput(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      if (this.imgService.isImageFile(event.target.result) === false) {
        // notification service will replace this alert in future
      } else if (this.contentService.imgs.includes(event.target.result)) {
        // notification service will replace this alert in future
      } else {
        const img = new Image();

        img.onload = () => {
          if (this.imgService.hasImageValidSize(MAX_HEIGHT_IMG, MAX_WIDTH_IMG,
            MIN_HEIGHT_IMG, MIN_WIDTH_IMG,
            img.height, img.width)) {
            this.contentService.imgsFiles.push(file);
            this.contentService.imgs.push(img.src);
            this.currentImgIndex = this.contentService.imgs.length - 1;
          } else {
            this.contentService.form.invalid;
            // notification service will replace this alert in future
            alert('Image is invalid! It might be too big or too small.');
          }
        };
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    console.log(this.contentService.form);
    // this.service.putContent(this.content.Id, this.imgs); // .pipe(first()).subscribe(res => console.log(res));
    // this.service.form.reset();
    // this.service.initializeFormGroup();
  }

  convertBlobToFile(blob: Blob, fileName: string): File {
    const b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>b;
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    if (event.file != null) {
      if (this.contentService.croppedImgs.length < this.contentService.imgs.length) {
        this.contentService.croppedImgs.push(event.base64);
        console.log(this.contentService.imgsFiles);
        this.contentService.croppedFiles.push(this.convertBlobToFile(event.file,
          this.contentService.imgsFiles[this.currentImgIndex].name));

        console.log(this.contentService.croppedFiles);
        console.log(this.contentService.imgsFiles);


      } else {
        this.contentService.croppedImgs[this.currentImgIndex] = event.base64;
        this.contentService.croppedFiles[this.currentImgIndex] =
          this.convertBlobToFile(event.file, this.contentService.imgsFiles[this.currentImgIndex].name);
        console.log(this.contentService.croppedImgs);
        console.log(this.contentService.imgsFiles);

      }
    }
  }

  imageLoaded() {
    console.log('all good!');
  }
  loadImageFailed() {
    console.log('not all good!');
  }

  delete(i) {
    this.contentService.croppedFiles.splice(i, 1);
    this.contentService.croppedImgs.splice(i, 1);
    this.contentService.imgs.splice(i, 1);
    this.contentService.imgsFiles.splice(i, 1);
    if (i === this.currentImgIndex) {
      this.currentImgIndex = -1;
    }
    console.log(this.contentService.croppedFiles, this.contentService.croppedImgs);
  }

  putInCropper(i) {
    this.currentImgIndex = i;
  }
}

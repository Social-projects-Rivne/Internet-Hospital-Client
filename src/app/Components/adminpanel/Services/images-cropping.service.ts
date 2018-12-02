import { Injectable } from '@angular/core';
import { ImageValidationService } from '../../../Services/image-validation.service';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { NotificationService } from 'src/app/Services/notification.service';

const MAX_WIDTH_IMG = 2000;
const MAX_HEIGHT_IMG = 2000;
const MIN_WIDTH_IMG = 300;
const MIN_HEIGHT_IMG = 300;
const EDITED_IMAGE = 'Edited';
const UNCHANGED_IMAGE = 'Unchanged';


@Injectable({
  providedIn: 'root'
})
export class ImagesCroppingService {

  croppingImgIndex = -1;

  imgs: string[] = [];
  croppedImgs: string[] = [];
  croppedFiles: File[] = [];

  existingImgsUrls: string[] = [];
  existingImagesStatuses: string[] = [];
  deletedImgsUrls: string[] = [];

  constructor(private imgService: ImageValidationService,
    private notificationService: NotificationService) { }

  handleFileInput(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      if (this.imgService.isImageFile(event.target.result) === false) {
        this.notificationService.error('File isn\'t an image!');
      } else if (this.imgs.includes(event.target.result)) {
        this.notificationService.error('You already added this image!');
      } else {
        const img = new Image();

        img.onload = () => {
          if (this.imgService.hasImageValidSize(MAX_HEIGHT_IMG, MAX_WIDTH_IMG,
            MIN_HEIGHT_IMG, MIN_WIDTH_IMG,
            img.height, img.width)) {
            this.imgs.push(img.src);
            this.croppingImgIndex = this.imgs.length - 1;
          } else {
            this.notificationService.error('Not valid size!');
          }
        };
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.file != null) {

      const type = event.file.type;
      const name = `${this.croppingImgIndex + 1}.${type.slice(type.indexOf('/') + 1)}`;
      const croppedFile = new File([event.file], name, { lastModified: Date.now() });

      if (this.croppedImgs.length < this.imgs.length) {
        this.croppedImgs.push(event.base64);
        this.croppedFiles.push(croppedFile);
      } else {
        this.croppedImgs[this.croppingImgIndex] = event.base64;
        this.croppedFiles[this.croppingImgIndex] = croppedFile;

        if (this.croppingImgIndex < this.existingImgsUrls.length) {
          let imgStatus = EDITED_IMAGE;
          if (this.imgs[this.croppingImgIndex] === this.croppedImgs[this.croppingImgIndex]) {
            imgStatus = UNCHANGED_IMAGE;
          }
          this.existingImagesStatuses[this.croppingImgIndex] = imgStatus;
        }
      }
    }
  }

  changeCurrentIndex(i) {
    this.croppingImgIndex = i;
  }


  delete(i) {
    this.removeExistingImg(i);
    this.croppedFiles.splice(i, 1);
    this.croppedImgs.splice(i, 1);
    this.imgs.splice(i, 1);
    if (i === this.croppingImgIndex) {
      this.croppingImgIndex = -1;
    }
  }

  removeExistingImg(i) {
    if (this.existingImgsUrls.length > i) {
      this.deletedImgsUrls.push(this.existingImgsUrls[i]);
      this.existingImagesStatuses.splice(i, 1);
      this.existingImgsUrls.splice(i, 1);
    }
  }

  getCroppedImageFiles() {
    let files = [];
    const files2 = this.croppedFiles.slice(0, this.existingImgsUrls.length).filter((img, i) => {
      return this.existingImagesStatuses[i] !== UNCHANGED_IMAGE;
    });
    console.log(files2);
    console.log(this.croppedFiles);
    console.log(this.existingImgsUrls);
    files = files2.concat(this.croppedFiles.slice(this.existingImgsUrls.length));
    console.log(files);
    return files;
  }

  getDeletedImgUrls() {
    let deletedWithEdited = this.deletedImgsUrls;
    deletedWithEdited = deletedWithEdited.concat(this.existingImgsUrls.filter((img, i) => {
      return this.existingImagesStatuses[i] !== UNCHANGED_IMAGE;
    }));
    console.log(deletedWithEdited);
    return deletedWithEdited;
  }

  clearCropping() {
    this.croppedFiles = [];
    this.croppedImgs = [];
    this.deletedImgsUrls = [];
    this.existingImagesStatuses = [];
    this.existingImgsUrls = [];
    this.imgs = [];
    this.croppingImgIndex = -1;
  }
}

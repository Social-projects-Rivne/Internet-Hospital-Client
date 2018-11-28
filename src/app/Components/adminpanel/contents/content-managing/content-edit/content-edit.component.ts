import { Component, OnInit } from '@angular/core';

import { ImageValidationService } from '../../../../../Services/image-validation.service';
import { ContentService } from '../../../services/content.service';
import { ContentEditingService } from '../../../services/content-editing.service';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { HOST_URL } from 'src/app/config';
import * as collections from 'typescript-collections';

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
  froalaImgsToSend: File[] = [];
  froalaImgsAll = new collections.Dictionary<string, File>();
  counter = 0;
  article = '';

  froalaOptions: Object = {
    events: {
      'froalaEditor.image.beforeUpload': (event, editor, files: FileList) => {
        if (files.length) {
          this.froalaImgsAll.setValue(`id-${++this.counter}`, files.item(0));
          const count = this.counter;
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const result = e.target.result;
            editor.image.insert(result, true, { 'id': `id-${count}` }, editor.image.get());
          };
          reader.readAsDataURL(files[0]);
        }
        editor.popups.hideAll();
        return false;
      },
      'froalaEditor.video.beforeUpload': (event, editor, img) => {
        console.log('UPLOAD VIDEO');
        return false;
      }
    },
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
  };

  // USE: before sending: this.froalaImgsToSend = getFroalaResultBody();
  getFroalaResultBody(): string {
    return this.handleFroalaResult();
  }

  handleFroalaResult(): string {
    const froalaDiv = document.createElement('div');
    froalaDiv.innerHTML = this.article.slice();
    const img = froalaDiv.getElementsByTagName('img');
    for (let i = 0; i < img.length; i++) {
      const id = img.item(i).getAttribute('data-id');
      if (this.froalaImgsAll.containsKey(id)) {
        const file = this.froalaImgsAll.getValue(id);
        this.froalaImgsToSend.push(file);
        img.item(i).src = `${HOST_URL}/${this.getUrlFroalaImg()}/Img_${i + 1}${this.getExtension(file.name)}`;
      }
    }
    return froalaDiv.innerHTML;
  }

  // TODO: we can create in config.ts ARTICLE_NEWS_URL = 'Images/HomePage/Article'; instead of this method
  getUrlFroalaImg(): string {
    return 'HomePage/%$#@_article_id_@$#%/Attachments';
  }

  getExtension(filename: string) {
    const idx = filename.lastIndexOf('.');
    return (idx < 1) ? '' : filename.substr(idx);
  }

  constructor(private dataService: ContentService, private contentService: ContentEditingService,
    private imgService: ImageValidationService) {
  }

  ngOnInit() {
  }

  onClear() {
    this.contentService.clearData();
    this.currentImgIndex = -1;
    this.article = '';
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
    const content = this.contentService.getNewContent();
    content.article = this.getFroalaResultBody();
    content.articleAttachments = this.froalaImgsToSend;
    console.log(content);
    console.log(this.froalaImgsToSend);
    this.dataService.postContent(content).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
    this.froalaImgsToSend = [];
  }

  convertBlobToFile(blob: Blob, file: File): File {
    const cropedFile = new File([blob], file.name, { type: file.type, lastModified: Date.now() });
    return cropedFile;
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    if (event.file != null) {
      if (this.contentService.croppedImgs.length < this.contentService.imgs.length) {
        this.contentService.croppedImgs.push(event.base64);
        this.contentService.croppedFiles.push(this.convertBlobToFile(event.file,
          this.contentService.imgsFiles[this.currentImgIndex]));
      } else {
        this.contentService.croppedImgs[this.currentImgIndex] = event.base64;
        this.contentService.croppedFiles[this.currentImgIndex] =
          this.convertBlobToFile(event.file, this.contentService.imgsFiles[this.currentImgIndex]);
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
  }

  putInCropper(i) {
    this.currentImgIndex = i;
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreatingContent } from '../../../Models/Content/CreatingContent';
import { ArticleType } from '../../../Models/Content/ArticleType';
import { ContentTypeService } from './content-type.service';
import { ContentForEditing } from '../../../Models/Content/ContentForEditing';
import { EditedContent } from '../../../Models/Content/EditedContent';
import { FroalaService } from './froala.service';
import { ImageValidationService } from '../../../Services/image-validation.service';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';
import { NotificationService } from 'src/app/Services/notification.service';

const MAX_WIDTH_IMG = 2000;
const MAX_HEIGHT_IMG = 2000;
const MIN_WIDTH_IMG = 300;
const MIN_HEIGHT_IMG = 300;
const EDITED_IMAGE = '';

@Injectable({
  providedIn: 'root'
})
export class ContentHandlingService {

  form: FormGroup = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.maxLength(100) ]),
    types: new FormControl([], Validators.required),
    shortDescription: new FormControl('', [ Validators.required, Validators.maxLength(1000) ]),
    article: new FormControl('', Validators.required)
  });

  editingContent: ContentForEditing = null;

  croppingImgIndex = -1;
  isCurrentImgExisting = false;
  isImageCroppedFirst = true;

  types: ArticleType[] = [];
  typeNames = [];

  imgs: string[] = [];
  croppedImgs: string[] = [];
  croppedFiles: File[] = [];

  deletedImgs: string[] = [];

  constructor(private typeService: ContentTypeService,
              private froalaService: FroalaService,
              private imgService: ImageValidationService,
              private notificationService: NotificationService) { }

  initializeContent() {
    this.clearData();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.setValue({
      title: '',
      types: [],
      shortDescription: '',
      article: ''
    });
    this.typeService.getContentType().subscribe((data: any) => {
      this.types = data;
    });
    this.froalaService.counter = 0;
  }

  setForm(content: ContentForEditing) {
    this.typeService.getContentType().subscribe((data: any) => {
      this.types = data;
      this.form.controls.types.setValue(this.getSelectedTypes(content.typeIds));
    });
    this.form.setValue({
      title: content.title,
      shortDescription: content.shortDescription,
      article: content.text,
      types: []
    });
    console.log(content);
    this.editingContent = content;

    this.editingContent.previewAttachmentsBase64.forEach(img => {
      this.imgs.push(img);
      this.croppedImgs.push(img);
      this.croppedFiles.push(null);
    });
    this.froalaService.article = content.text;
    this.froalaService.existingImages = content.articleAttachmentPaths;
  }

  getSelectedTypes(types) {
    const selectedTypes = this.types.filter( type => {
      return types.includes(type.id);
    });
    return selectedTypes;
  }

  clearData() {
    this.imgs = [];
    this.croppedFiles = [];
    this.croppedImgs = [];
    this.types = [];
    this.deletedImgs = [];
    this.editingContent = null;
    this.froalaService.clearFroala();
  }

  getNewContent() {
    const content = new CreatingContent();
    const contr = this.form.controls;
    content.title = contr.title.value;
    content.typeIds = [];
    for (let i = 0; i < contr.types.value.length; ++i) {
      content.typeIds.push(contr.types.value[i].id);
    }
    content.shortDescription = contr.shortDescription.value;
    content.articlePreviewAttachments = this.croppedFiles;
    content.article = this.froalaService.getFroalaResultBody();
    content.articleAttachments = this.froalaService.froalaImgsToSend.slice();
    this.froalaService.froalaImgsToSend = [];
    return content;
  }

  getEditedContent() {
    const content = new EditedContent();
    content.id = this.editingContent.id;

    const contr = this.form.controls;
    content.title = contr.title.value;
    content.typeIds = [];
    for (let i = 0; i < contr.types.value.length; ++i) {
      content.typeIds.push(contr.types.value[i].id);
    }
    content.shortDescription = contr.shortDescription.value;

    // adding all img files except existing
    const imgsToAdd = this.croppedFiles.slice(this.editingContent.previewAttachmentPaths.length);
    // adding for deleting existing imgs that was deleted from preview
    content.deletedAttachmentPaths = this.deletedImgs.slice();
    console.log(this.deletedImgs);
    for (let i = 0; i < this.editingContent.previewAttachmentPaths.length; ++i) {
      if (this.editingContent.previewAttachmentsBase64[i] === EDITED_IMAGE) {
        // add images that was edited
        imgsToAdd.push(this.croppedFiles[i]);
        // add for deleting path to imgs that was edited
        content.deletedAttachmentPaths.push(this.editingContent.previewAttachmentPaths[i]);
        console.log(this.editingContent.previewAttachmentPaths[i]);
      }
    }
    console.log(this.deletedImgs);
    content.articlePreviewAttachments = imgsToAdd;

    content.article = this.froalaService.getFroalaResultBody();
    content.deletedAttachmentPaths = content.deletedAttachmentPaths
                                .concat(this.froalaService.removedExistingImages);
    content.articleAttachments = this.froalaService.froalaImgsToSend.slice();
    this.froalaService.froalaImgsToSend = [];
    return content;
  }

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
            console.log(this.imgs);
            this.croppingImgIndex = this.imgs.length - 1;
            this.isImageCroppedFirst = true;
            this.isCurrentImgExisting = false;
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

        if (!this.isImageCroppedFirst && this.isCurrentImgExisting) {
          this.markExistingImgAsEdited();
        }
      }
      this.isImageCroppedFirst = false;
    }
  }

  changeCurrentIndex(i) {
    this.croppingImgIndex = i;
    this.isCurrentImgExisting = this.editingContent !== null
            && this.croppingImgIndex < this.editingContent.previewAttachmentsBase64.length;
    this.isImageCroppedFirst = true;
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
    if (this.editingContent) {
      let imgs = this.editingContent.previewAttachmentsBase64;
      if (imgs.length > 0 && i < imgs.length) {
        const img = this.imgs[i];
        const index = imgs.indexOf(img);
        if (index !== -1) {
          this.deletedImgs.push(this.editingContent.previewAttachmentPaths[index]);

          this.editingContent.previewAttachmentPaths =
            this.editingContent.previewAttachmentPaths.splice(index, 1);
          imgs = imgs.splice(index, 1);
        }
      }
    }
  }

  markExistingImgAsEdited() {
    this.editingContent.previewAttachmentsBase64[this.croppingImgIndex] = EDITED_IMAGE;
  }

  resetExistingImg() {
    this.editingContent.previewAttachmentsBase64[this.croppingImgIndex] =
      this.croppedImgs[this.croppingImgIndex];
  }
}

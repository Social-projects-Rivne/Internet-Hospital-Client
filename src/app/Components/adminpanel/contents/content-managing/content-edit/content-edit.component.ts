import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../../Services/content.service';
import { ContentHandlingService } from '../../../Services/content-handling.service';
import { ImagesCroppingService } from '../../../Services/images-cropping.service';
import { FroalaService } from '../../../Services/froala.service';

import { NotificationService } from 'src/app/Services/notification.service';
import { CONTENTS } from '../../../routesConfig';
import { ADMIN_PANEL } from 'src/app/config';

@Component({
  selector: 'app-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.scss']
})

export class ContentEditComponent implements OnInit, OnDestroy {

  contentListLink = `/${ADMIN_PANEL}/${CONTENTS}`;

  constructor(private dataService: ContentService,
    private handlingService: ContentHandlingService,
    private imageCroppingService: ImagesCroppingService,
    private froalaService: FroalaService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    if (this.handlingService.editingContent === null) {
      this.handlingService.initializeContent();
      this.froalaService.counter = 0;
    } else {
      this.handlingService.editingContent.previewAttachmentsBase64.forEach((img, i) => {
        this.imageCroppingService.croppedImgs.push(img);
        this.imageCroppingService.imgs.push(img);
        this.imageCroppingService.croppedFiles.push(null);
        this.imageCroppingService.existingImagesStatuses.push('Unchanged');
      });
      this.imageCroppingService.existingImgsUrls = this.handlingService.editingContent.previewAttachmentPaths;
      this.froalaService.article = this.handlingService.editingContent.text;
      this.froalaService.existingImages = this.handlingService.editingContent.articleAttachmentPaths;
    }
  }

  ngOnDestroy() {
    this.handlingService.clearData();
    this.froalaService.clearFroala();
    this.imageCroppingService.clearCropping();
  }

  handleFileInput(file: File) {
    if (file) {
      this.imageCroppingService.handleFileInput(file);
    }
  }

  delete(i) {
    this.imageCroppingService.delete(i);
  }

  clear() {
    this.handlingService.clearData();
  }

  onSubmit() {
    this.handlingService.editingContent ? this.updateContent() : this.createContent();
  }

  createContent() {
    const content = this.handlingService.getNewContent();
    content.articlePreviewAttachments = this.imageCroppingService.getCroppedImageFiles();
    content.article = this.froalaService.getFroalaResultBody();
    content.articleAttachments = this.froalaService.froalaImgsToSend;
    this.dataService.postContent(content).subscribe(data => {
      this.notificationService.success('Article was successfully created!');
      this.router.navigate([this.contentListLink]);
    }, error => {
      this.notificationService.error(error);
    });
  }

  updateContent() {
    const content = this.handlingService.getEditedContent();
    content.articlePreviewAttachments = this.imageCroppingService.getCroppedImageFiles();
    content.deletedPreviewAttachmentPaths = this.imageCroppingService.getDeletedImgUrls();

    content.article = this.froalaService.getFroalaResultBody();
    content.deletedArticleAttachmentPaths = this.froalaService.removedExistingImages;
    content.articleAttachments = this.froalaService.froalaImgsToSend;
    this.dataService.updateContent(content).subscribe(data => {
      this.notificationService.success('Article was successfully updated!');
      this.router.navigate([this.contentListLink]);
    }, error => {
      this.notificationService.error(error);
    });
  }
}

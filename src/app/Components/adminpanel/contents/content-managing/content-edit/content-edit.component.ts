import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../../../Services/content.service';
import { ContentHandlingService } from '../../../Services/content-handling.service';
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
    private notificationService: NotificationService,
    private router: Router) {}

  ngOnInit() {
    if (this.handlingService.editingContent === null) {
      this.handlingService.initializeContent();
    }
    console.log(this.handlingService.editingContent);
  }

  ngOnDestroy() {
    this.handlingService.clearData();
  }

  handleFileInput(file: File) {
    this.handlingService.handleFileInput(file);
  }

  delete(i) {
    this.handlingService.delete(i);
  }

  clear() {
    this.handlingService.clearData();
  }

  onSubmit() {
    if (this.handlingService.editingContent) {
      const content = this.handlingService.getEditedContent();
      this.dataService.updateContent(content).subscribe(data => {
        this.notificationService.success('Article was successfully created!');
        this.router.navigate([this.contentListLink]);
      }, error => {
        this.notificationService.error(error);
      });
    } else {
      const content = this.handlingService.getNewContent();
      this.dataService.postContent(content).subscribe(data => {
        this.notificationService.success('Article was successfully updated!');
        this.router.navigate([this.contentListLink]);
      }, error => {
        this.notificationService.error(error);
      });
    }
  }
}

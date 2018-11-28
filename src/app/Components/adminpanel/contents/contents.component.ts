import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ShortContentWithEditors } from '../../../Models/Content/ShortContentWithEditors';
import { CONTENTS_MNG } from '../routesConfig';
import { ADMIN_PANEL } from '../../../config';
import { ContentEditingService } from '../services/content-editing.service';
import { Router } from '@angular/router';
import { ArticleType } from 'src/app/Models/Content/ArticleType';
import { ContentModerateFilters } from 'src/app/Models/Content/ContentModerateFilters';
import { FilteredResults } from 'src/app/Models/FilteredResults';
import { ContentService } from '../services/content.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ContentTypeService } from '../services/content-type.service';
import { of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

const DEF_PAGE_SIZE = 12;


@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  contMng = `/${ADMIN_PANEL}/${CONTENTS_MNG}`;
  filters = new ContentModerateFilters();
  types: ArticleType[] = [];
  selectedTypes = [];
  contentItems: ShortContentWithEditors[] = [];
  isLoadingResults = true;
  isRateLimitReached = false;
  content: FilteredResults<ShortContentWithEditors> = new FilteredResults<ShortContentWithEditors>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private editingContent: ContentEditingService,
              private contentService: ContentService,
              private typeService: ContentTypeService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  loadTypes() {
    this.typeService.getContentType().subscribe(((res: any) => {
        this.types = res;
        console.log(res);
      }),
      error => {
        this.notificationService.error('Couldn\'t load types!!!');
        setTimeout(this.loadTypes, 5000);
      });
  }

  log() {
    console.log(this.filters);
  }

  ngOnInit() {
    this.content.amountOfAll = 0;
    this.paginator.pageSize = DEF_PAGE_SIZE;
    this.filters.page = 0;
    console.log(this.paginator);
    this.loadTypes();
    this.paginator.page.pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.filters.page = this.paginator.pageIndex;
          this.filters.pageSize = this.paginator.pageSize;
          console.log(this.filters);
          return this.contentService.getShortModeratorContent(this.filters);
        }),
        map((data: any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.content.amountOfAll = data.amount;
          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.content.data = data);
  }

  onChange(i: number) {
    // content number get
    // this.editingContent.setForm(this.contentItems[i]);
    this.router.navigate([this.contMng]);
  }

  onDelete(i: number) {
    this.contentItems.splice(i, 1);
    // method for delete from DB
  }

  createNewArticle() {
    this.editingContent.initializeContent();
    this.router.navigate([this.contMng]);
  }
}

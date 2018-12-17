import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FeedBackService } from 'src/app/Services/FeedBackService/feed-back.service';
import { FeedBack } from 'src/app/Models/FeedBack';
import { NotificationService } from 'src/app/Services/notification.service';
import { RequestFilter } from 'src/app/Models/RequestFilter';
import { FeedbackViewModel } from 'src/app/Models/FeedbackViewModel';
import { PaginationService } from 'src/app/Services/pagination.service';
import { PageEvent, MatPaginator, MatSort, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FeedBackType } from 'src/app/Models/FeedBackType';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { HOST_URL } from 'src/app/config';
import { ReplyDialogComponent } from './reply-dialog/reply-dialog.component';
import { stringify } from '@angular/core/src/render3/util';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})

export class UserRequestsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  hostUrl = HOST_URL;

  feedbacksmodels: FeedbackViewModel[] = [];
  columnsToDisplay = ['usersEmail', 'dateTime', 'feedbackTypeName'];
  expandedElement: FeedbackViewModel | null;
  typeslist: FeedBackType;
  usersAmount: number;
  filter: RequestFilter;
  isLoadingResult = true;
  search: string;
  selectedType: number;
  selectedEmail: string;
  selectedReplyModel: FeedbackViewModel;

  constructor(private _feedbackService: FeedBackService,
              private _notificationService: NotificationService,
              private _paginationService: PaginationService,
              public dialog: MatDialog
    ) {
      this.filter = new RequestFilter();
     }

  ngOnInit() {
    this._feedbackService.getFeedBackViewModels().subscribe( (type: any) => {
      this.feedbacksmodels = type.feedbacks;
      this.usersAmount = type.quantity;
      console.log(this.feedbacksmodels);
      console.log(this._paginationService.pageIndex);
      console.log(this._paginationService.feedbackPageSize);
      this.isLoadingResult = false;
    },
      error => {
        this._notificationService.error(error);
        this.isLoadingResult = false;
    });
    this._feedbackService.getFeedBackTypes().subscribe( (type: any) => {
      this.typeslist = type;
      this.isLoadingResult = false;
    },
    error => {
      this._notificationService.error(error);
      this.isLoadingResult = false;
    });
  }

  onSearch() {
    this.filter.searchKey = this.search;
    this.filter.selectedType = this.selectedType;

    this.paginator.firstPage();
    const event = new PageEvent();

    event.pageSize = this._paginationService.feedbackPageSize;
    event.pageIndex = this._paginationService.pageIndex - 1;
    event.length = this.usersAmount;

    console.log(this.search);
    console.log(this.selectedType);
    this.pageSwitch(event);
  }
  onClear() {
    this.search = undefined;
    this.selectedType = undefined;
    this.ngOnInit();
  }

  pageSwitch(event: PageEvent) {
    this.isLoadingResult = true;
    this._paginationService.change(event);

    this._feedbackService.getFeedBackViewModels(this.filter).subscribe( (type: any) => {
      this.feedbacksmodels = type.feedbacks;
      this.usersAmount = type.quantity;
      console.log(this.feedbacksmodels);
      this.isLoadingResult = false;
    },
      error => {
        this._notificationService.error(error);
        this.isLoadingResult = false;
      });
  }

  openDialog(selectedId: number) {

    this.selectedReplyModel = this.feedbacksmodels.find(x => x.id === selectedId);
    console.log(selectedId);
    console.log(this.selectedReplyModel.id);

    const dialogRef = this.dialog.open(ReplyDialogComponent, {
      data: {selectedUser: this.selectedReplyModel }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedReplyModel = result;
      if (result !== undefined ) {
        this._feedbackService.updateFeedback(this.selectedReplyModel);
        this._feedbackService.sendSignal(this.selectedReplyModel);
      }
    });
  }

  asDone(selectedId: number) {
    this.selectedReplyModel = this.feedbacksmodels.find(x => x.id === selectedId);
    this.selectedReplyModel.isViewed = true;
    this._feedbackService.updateFeedback(this.selectedReplyModel);
  }

}


import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedBackService } from 'src/app/Services/FeedBackService/feed-back.service';
import { FeedBack } from 'src/app/Models/FeedBack';
import { NotificationService } from 'src/app/Services/notification.service';
import { RequestFilter } from 'src/app/Models/RequestFilter';
import { FeedbackViewModel } from 'src/app/Models/FeedbackViewModel';
import { PaginationService } from 'src/app/Services/pagination.service';
import { PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FeedBackType } from 'src/app/Models/FeedBackType';
import { trigger, state, transition, animate, style } from '@angular/animations';

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

  feedbacksmodels: MatTableDataSource<FeedbackViewModel>;
  columnsToDisplay = ['usersEmail', 'dateTime', 'feedbackTypeName', 'isViewed'];
  expandedElement: FeedbackViewModel | null;
  typeslist: FeedBackType;
  usersAmount: number;
  filter: RequestFilter;
  isLoadingResult = true;
  search: string;
  selectedType: number;

  constructor(private _feedbackService: FeedBackService,
              private _notificationService: NotificationService,
              private _paginationService: PaginationService
    ) {
      this.filter = new RequestFilter();
     }

  ngOnInit() {
    this._feedbackService.getFeedBackViewModels().subscribe( (type: any) => {
      this.feedbacksmodels = type.feedbacks;
      this.usersAmount = type.quantity;
      console.log(this.feedbacksmodels);
      console.log(this._paginationService.pageIndex);
      console.log(this._paginationService.pageSize);
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

    event.pageSize = this._paginationService.pageSize;
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

}

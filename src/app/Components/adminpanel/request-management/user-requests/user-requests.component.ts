import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedBackService } from 'src/app/Services/FeedBackService/feed-back.service';
import { FeedBack } from 'src/app/Models/FeedBack';
import { NotificationService } from 'src/app/Services/notification.service';
import { RequestFilter } from 'src/app/Models/RequestFilter';
import { FeedbackViewModel } from 'src/app/Models/FeedbackViewModel';
import { PaginationService } from 'src/app/Services/pagination.service';
import { PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FeedBackType } from 'src/app/Models/FeedBackType';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  feedbacksmodels: MatTableDataSource<FeedbackViewModel>;
  typeslist: FeedBackType;
  usersAmount: number;
  filter: RequestFilter;
  isLoadingResult = true;

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

  pageSwitch(event: PageEvent) {
    this.isLoadingResult = true;
    this._paginationService.change(event);

    this._feedbackService.getFeedBackViewModels().subscribe( (type: any) => {
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

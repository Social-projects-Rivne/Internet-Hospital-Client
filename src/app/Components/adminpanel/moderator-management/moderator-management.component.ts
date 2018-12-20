import { Component, OnInit, ViewChild } from '@angular/core';

import { ModeratorService } from '../Services/moderator.service';
import { NotificationService } from '../../../Services/notification.service';

import { ModeratorData } from '../../../Models/ModeratorData';
import { ModeratorsData } from '../../../Models/ModeratorsData';

import { MODER_CREATE } from './../routesConfig';
import { ADMIN_PANEL } from '../../../config';

import { MatPaginator, MatSort } from '@angular/material';
import { DialogService } from 'src/app/Services/dialog.service';

import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { DialogService } from 'src/app/Services/dialog.service';

const DEFAULT_AMOUNT_OF_MODERS_ON_PAGE = 5;

@Component({
  selector: 'app-moderator-management',
  templateUrl: './moderator-management.component.html',
  styleUrls: ['./moderator-management.component.scss']
})

export class ModeratorManagementComponent implements OnInit {
  createNewPath = `/${ADMIN_PANEL}/${MODER_CREATE}`;

  displayedColumns = ['select', 'email', 'firstName', 'secondName', 'thirdName', 'signUpTime', 'delete'];
  dataSource: ModeratorData[] = [];

  selected = [];

  isLoadingResults = true;
  isRateLimitReached = false;

  search = '';

  amountOfModerators = 0;
  includeAll = false;

  pageSizeOptions = [5, 10, 15, 20, 30, 50];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ModeratorService,
              private notification: NotificationService,
              private dialogService: DialogService) {}

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.paginator.pageSize = DEFAULT_AMOUNT_OF_MODERS_ON_PAGE;
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service.getFilteredModeratorsExtended(
            this.sort.active,
            this.sort.direction,
            this.search,
            this.paginator.pageIndex,
            this.includeAll,
            this.paginator.pageSize);
        }),
        map((data: ModeratorsData) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.amountOfModerators = data.amountOfAllFiltered;
          return data.moderators;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
  }

  changeStatus() {
    const index = this.displayedColumns.indexOf('status');
    if (this.includeAll) {
      if (index === -1) {
        this.displayedColumns.splice(this.displayedColumns.length - 1, 0, 'status');
        this.paginator.page.emit();
      }
    } else if (index !== -1) {
      this.displayedColumns.splice(index, 1);
      this.paginator.page.emit();
    }
  }

  select(event, id) {
    const index = this.selected.indexOf(id);
    if (event.checked) {
      if (index === -1) {
        this.selected.push(id);
      }
    } else if (index !== -1) {
      this.selected.splice(index, 1);
    }
  }

  delete(moderator) {
    this.dialogService.openConfirmDialog(`Do you really want to delete ${moderator.email}?`,
      '10%', 'calc(50% - 195px)')
      .afterClosed().subscribe(res => {
        if (res) {
          this.isLoadingResults = true;
          this.service.deleteModerator(moderator.id)
            .subscribe(_ => {
              this.notification.success('Moderator was successfully deleted!');
              this.paginator.page.emit();
            }, error => {
              this.isLoadingResults = false;
              this.notification.error(error);
            });
        }
      });
  }

  deleteSelected() {
    this.dialogService.openConfirmDialog(`Do you really want to delete all selected moderators?`,
      '10%', 'calc(50% - 195px)')
      .afterClosed().subscribe(res => {
        if (res) {
          this.isLoadingResults = true;
          this.service.deleteModerators(this.selected).subscribe(_ => {
            this.selected = [];
            this.paginator.page.emit();
            this.notification.success('Moderators were deleted!');
          }, error => {
            this.isLoadingResults = false;
            this.notification.error(error);
          });
        }
      });
  }
}

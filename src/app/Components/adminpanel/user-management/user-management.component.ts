import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListService } from 'src/app/Services/UserListService/user-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserListModel } from 'src/app/Models/UserListModel';
import { MatPaginator } from '@angular/material';
import { UserListFilter } from 'src/app/Models/UserListFilter';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public Users: UserListModel[] = [];
  public Types: UserListModel[] = [];
  private filter: UserListFilter;
  public searchInput = '';
  public selectedStatus = '';

  displayedColumns = ['id', 'firstName', 'secondName', 'thirdName', 'birthDate', 'email', 'statusName'];

  constructor(
    private _userListService: UserListService,
    private _notification: NotificationService,
    ) {
      this.filter = new UserListFilter();
     }

  ngOnInit() {
      this._userListService.getUserList().subscribe((types: any) => {
        this.Users = types;
        this.Users = this._userListService.StatusConverter(this.Users);
      },
        error => {
          this._notification.error('Server error');
      });
      this._userListService.getUserList().subscribe((types: any) => {
        this.Types = types;
        this.Types.sort((x1, x2) => x1.statusId - x2.statusId);
        this.Types = this._userListService.StatusConverter(this.Users);
        this.Types.sort((x1, x2) => x1.statusId - x2.statusId);
        this.Types = this.uniq(this.Types);
      },
        error => {
          this._notification.error('Server error');
      });
  }

  searchClick() {
    this.filter.searchKey = this.searchInput;
    this.filter.selectedStatus = this.selectedStatus;
    this.filter.CheckIfPropertyExist();
    if (this.filter.isWithParams) {
      this._userListService.getUserListParams(this.filter).subscribe((types: any) => {
        this.Users = types;
        this.Users.sort((x1, x2) => x1.statusId - x2.statusId);
        this.Users = this.uniq(this.Users);
        this.Users = this._userListService.StatusConverter(this.Users);
      },
        error => {
          this._notification.error('Server error');
      });
    }
  }

  uniq(Users: UserListModel[]) {
    return Users.filter(function (item, pos, ary) {
      return !pos || item.statusId !== ary[pos - 1].statusId;
    });
  }

  textChanged(event: any) {
    this.searchInput = event.target.value;
  }

}

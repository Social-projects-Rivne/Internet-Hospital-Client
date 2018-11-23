import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListService } from 'src/app/Services/UserListService/user-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserListModel } from 'src/app/Models/UserListModel';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public Users: UserListModel[] = [];

  displayedColumns = ['id', 'firstName', 'secondName', 'thirdName', 'birthDate', 'email', 'statusName'];

  constructor(
    private _userListService: UserListService,
    private _notification: NotificationService,
    ) { }

  ngOnInit() {
    this._userListService.getUserListParams().subscribe((types: any) => {
       this.Users = types.Users;
      console.log('first' + this.Users);
      this.Users = this._userListService.StatusConverter(this.Users);
    },
    error => {
      this._notification.error('Server error');
    });
  }

}

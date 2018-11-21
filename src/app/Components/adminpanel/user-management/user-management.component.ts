import { Component, OnInit } from '@angular/core';
import { UserListService } from 'src/app/Services/UserListService/user-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserListModel } from 'src/app/Models/UserListModel';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {

  public Users: UserListModel[] = [];

  displayedColumns = ['id', 'firstName', 'secondName', 'thirdName', 'birthDate', 'email', 'statusName'];

  constructor(
    private _userListService: UserListService,
    private _notification: NotificationService,
    ) { }

  ngOnInit() {
    this._userListService.getUserList().subscribe((types: any) => {
      this.Users = types;
      this.StatusConverter();
    },
    error => {
      this._notification.error('Server error');
    });
  }

  StatusConverter() {
    this.Users.forEach(element => {
      if (element.statusId === 1) {
        element.statusName = 'Banned';
        element.statusDescription = 'Banned user who has violated our rules.'
      }
      if (element.statusId === 2) {
        element.statusName = 'New';
        element.statusDescription = 'New user registered in our system.';
      }
      if (element.statusId === 3) {
        element.statusName = 'Approved';
        element.statusDescription = 'Approved user with checked data.';
      }
      if (element.statusId === 4) {
        element.statusName = 'Not approved';
        element.statusDescription = 'Not approved, because user`s data was invalid.';
      }
      if (element.statusId === 5) {
        element.statusName = 'Deleted';
        element.statusDescription = 'Deleted user by Admin';
      }
      if (element.statusId === 6) {
        element.statusName = 'Active';
        element.statusDescription = 'Active moderator';
      }
    });
  }

}

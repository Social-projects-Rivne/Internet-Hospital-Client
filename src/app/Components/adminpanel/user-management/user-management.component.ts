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
      console.log(this.Users);
      console.log(types[0].id);
      this.StatusConverter();
    },
    error => {
      this._notification.error('Server error');
    });
  }

  buttonclick() {
    this.StatusConverter();
  }

  StatusConverter() {
    this.Users.forEach(element => {
      if (element.statusId === 1) {
        element.statusName = 'Banned';
      }
      if (element.statusId === 2) {
        element.statusName = 'New';
      }
      if (element.statusId === 3) {
        element.statusName = 'Approved';
      }
      if (element.statusId === 4) {
        element.statusName = 'Not approved';
      }
      if (element.statusId === 5) {
        element.statusName = 'Deleted';
      }
      if (element.statusId === 6) {
        element.statusName = 'Active';
      }
    });
  }

}

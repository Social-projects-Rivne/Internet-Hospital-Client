import { Component, OnInit } from '@angular/core';
import { UserListService } from 'src/app/Services/UserListService/user-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserListModel } from 'src/app/Models/UserListModel';
import { User } from 'src/app/Models/User';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {

  public Users: UserListModel[] = [];

  displayedColumns = ['id', 'firstName', 'secondName', 'thirdName', 'birthDate', 'email', 'statusId'];

  constructor(
    private _userListService: UserListService,
    private _notification: NotificationService,
    ) { }

  ngOnInit() {
    this._userListService.getUserList().subscribe((types: any) => {
      this.Users = types;
      console.log(this.Users);
      console.log(types[0].id);
    },
    error => {
      this._notification.error('Server error');
    });
  }

  buttonclick() {
    for (let i = 0; i < this.Users.length; ++i) {
      console.log(this.Users[i].id);
    }
  }

  StatusConverter() {

  }

}

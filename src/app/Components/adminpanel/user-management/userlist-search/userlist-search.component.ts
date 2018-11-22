import { Component, OnInit } from '@angular/core';
import { UserListService } from 'src/app/Services/UserListService/user-list.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UserListModel } from 'src/app/Models/UserListModel';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-userlist-search',
  templateUrl: './userlist-search.component.html',
  styleUrls: ['./userlist-search.component.scss']
})
export class UserlistSearchComponent implements OnInit {

  public Users: UserListModel[] = [];

  constructor(
    private _userListService: UserListService,
    private _notification: NotificationService
    ) { }

  ngOnInit() {
    this._userListService.getUserList().subscribe((types: any) => {
      this.Users = types;
      this.Users.sort((x1, x2) => x1.statusId - x2.statusId);
      this.Users = this.uniq(this.Users);
      this.Users = this._userListService.StatusConverter(this.Users);
    },
    error => {
      this._notification.error('Server error');
    });
  }

  uniq(Users: UserListModel[]) {
    return Users.filter(function(item, pos, ary) {
        return !pos || item.statusId !== ary[pos - 1].statusId;
  });
}

}

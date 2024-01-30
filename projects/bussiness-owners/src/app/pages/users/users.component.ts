import { Component, OnInit } from '@angular/core';
import { UserListResponse } from '../../models/users/userlist.response';
import { RouterService, ToasterService } from 'shared-lib';
import { UserService } from '../../services/users.httpsservice';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userData: UserListResponse[];

  constructor(
    private toasterService: ToasterService,
    private routerService: RouterService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (res) => {
        this.userData = res;
      },
    });
  }
}

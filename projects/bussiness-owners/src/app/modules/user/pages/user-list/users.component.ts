import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EnvironmentService,
  LanguageService,
  LogService,
  RouterService,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Title } from '@angular/platform-browser';
import { UserListResponse } from '../../models';
import { UserInviteFormComponent } from '../../components/invite-form/user-invite-form/user-invite-form.component';
import { bouserdetails } from '../../components/bouserdetails/bouserdetails.component';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [RouterService],
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userData: UserListResponse[];
  checked: boolean = true;
  value: string | undefined;
  ref: DynamicDialogRef | undefined;
  @ViewChild('dt') dt: any | undefined;

  constructor(
    public languageService: LanguageService,
    private dialog: DialogService,
    private routerService: RouterService,
    private logService: LogService,
    private titleService: Title,
    private env: EnvironmentService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.titleService.setTitle('Users');
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getAllUsers(this.subscriptionId);
    this.userService.users.subscribe((users) => {
      this.userData = users;
    });
  }
  resendInvitation(id: string) {
    this.userService.resendInvitation(id);
  }

  openInviteModal() {
    this.ref = this.dialog.open(UserInviteFormComponent, {
      width: '600px',
      height: '600px',
    });
    this.ref.onClose.subscribe((result: UserListResponse) => {
      if (result as UserListResponse) this.userData.push(result);
    });
  }
  getProfilePic(id: string) {
    return this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + id;
  }
  async activate(id: string) {
    this.userService.activate(id);
  }
  async deactivate(id: string) {
    this.userService.deactivate(id);
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  async editUser(Id: string) {
    this.ref = this.dialog.open(bouserdetails, {
      width: '800px',
      height: '700px',
      data: { Id: Id },
    });
  }
  changed(e: any, id: string) {
    if (e.checked === false) {
      this.deactivate(id);
    } else {
      this.activate(id);
    }
  }

  get subscriptionId(): number {
    return this.routerService.currentId;
  }
}

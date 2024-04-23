import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EnvironmentService,
  LanguageService,
  PageInfo,
  PageInfoResult,
  RouterService,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Title } from '@angular/platform-browser';
import { UserListResponse } from '../../models';
import { UserInviteFormComponent } from '../../components/invite-form/user-invite-form.component';
import { UserService } from '../../user.service';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';
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
  ref: DynamicDialogRef;
  @ViewChild('dt') dt: any | undefined;
  currentPageInfo: PageInfoResult;
  ngOnInit() {
    this.titleService.setTitle('Users');
    this.loadUsers();
  }


  loadUsers() {
    this.userService.getAllUsers(this.subdmainId);

    this.userService.users.subscribe((users) => {
      this.userData = users;
    });

    this.userService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });

    this.userService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }


  resendInvitation(id: string) {
    this.userService.resendInvitation(id);
  }

  openInviteModal() {
    this.userService.openInviteUserModal(this.subdmainId,this.ref, this.dialog);
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
    this.ref = this.dialog.open(UserDetailsComponent, {
      width: '800px',
      height: '700px',
      data: { Id: Id, subdomainId: this.subdmainId },
    });
  }


  changed(e: any, id: string) {
    if (e.checked === false) {
      this.deactivate(id);
    } else {
      this.activate(id);
    }
  }

  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo);
    this.userService.getAllUsersPaginated(pageInfo);
  }


  get subdmainId(): number {
    return this.routerService.currentId;
  }

  constructor(
    public languageService: LanguageService,
    private dialog: DialogService,
    private routerService: RouterService,
    private titleService: Title,
    private env: EnvironmentService,
    private userService: UserService
  ) {}
}

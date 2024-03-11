import { Component, OnInit, ViewChild } from '@angular/core';
import { EnvironmentService, LanguageService, LogService, RouterService, ToasterService } from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserListResponse } from '../../../user/models';
import { ERPUserService } from '../../erp-user.service';

@Component({
  selector: 'app-erpuser',
  templateUrl: './erp-users.component.html',
  styleUrls: ['./erp-users.component.css']
})
export class ERPUserComponent implements OnInit {
  
  ref: DynamicDialogRef | undefined;
  userlist: UserListResponse[];
  @ViewChild('dt') dt: any | undefined;

  constructor(
    public languageService: LanguageService,
    private toasterService: ToasterService,
    private router: RouterService,
    private logService: LogService,
    private dialog: DialogService,
    private env: EnvironmentService,
    private erpUsersService : ERPUserService
  ) { }

 
  ngOnInit() {
    this.loadUsers();
  }
  
  get subscriptionId(): number {
    return this.router.currentId;
  }

  loadUsers() {
    this.erpUsersService.getAllUsers(this.subscriptionId);
    this.erpUsersService.users.subscribe((users) => {
      this.userlist = users;
    });
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openInviteERPUser() {
   // this.ref = this.dialog.open(UserInviteFormComponent, {
    //  width: '600px',
    //  height: '600px',
   // });
   // this.ref.onClose.subscribe((result: UserListResponse) => {
    //  if (result as UserListResponse) this.userlist.push(result);
    //});
  }
  getProfilePic(id: string){
    return this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + id
  }

  resendInvitation(id: string) {
   
  }
  changed(e: any, id: string) {
   
  }
  async editUser(Id: string) {
  }
}

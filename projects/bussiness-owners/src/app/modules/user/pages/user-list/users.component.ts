import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EnvironmentService,
  LanguageService,
  lookupDto,
  PageInfo,
  PageInfoResult,
  RouterService,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Title } from '@angular/platform-browser';
import {  ExportUserListResponse, UserListResponse } from '../../models';
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
  mappedUserData: UserListResponse[];

  ExportUserData: ExportUserListResponse[];

  checked: boolean = true;
  langAr: boolean = false;
  value: string | undefined;
  cols: any[] = [
   
    {
      field: 'Name',
      header: 'name',
    },

    {
      field: 'Email',
      header: 'email',
    },
    {
      field: 'Last Login Date',
      header: 'lastLoginDate',
    },
    {
      field: 'License',
      header: 'license',
    },
    {
      field: 'Status',
      header: 'invitationStatus',
    },
  ];

  ref: DynamicDialogRef;
  @ViewChild('dt') dt: any | undefined;
  currentPageInfo: PageInfoResult;

  
  exportColumns: lookupDto[];

  exportData: UserListResponse[];


  ngOnInit() {
    this.subscribe()
    this.titleService.setTitle('Users');
    this.loadUsers();
    this.usersSubscription();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }
  search(event: any) {
    this.userService.getAllUsers(event.target.value, this.subdmainId);
  }
  loadUsers() {
    this.userService.getAllUsers('',this.subdmainId);
  }

  usersSubscription(){
    this.userService.users.subscribe((users) => {
      this.userData = users;
      this.mappedUserData = this.userData.map(elem=>{
        let {identityId , id  , photo, ...args} = elem
        return args
        
      })
      console.log(this.mappedUserData )
    });

    this.userService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  resendInvitation(id: string) {
    this.userService.resendInvitation(id);
  }


  openInviteModal() {
    this.userService.openInviteUserModal(this.subdmainId, this.ref, this.dialog);
  }

  getProfilePic(id: string) {
    return this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + id;
  }

  async activate(id: string) {
    this.userService.activate(id, this.subdmainId);
  }

  async deactivate(id: string) {
    this.userService.deactivate(id, this.subdmainId);
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

  changed(e: any, user: any) {
    user.isActive = !user.isActive
    
    if (user.isActive) {
      this.deactivate(user.id);
    } else {

      this.activate(user.id);
    }
  }

  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo);
    this.userService.getAllUsersPaginated(pageInfo);
  }

  get subdmainId(): string {
    return this.routerService.currentId;
  }

  removeUser(email:string) {
    this.userService.removeInvitedUser(email,this.subdmainId);
  }

  exportUsersData() {
    this.userService.exportUsersData(this.subdmainId);
    this.userService.exportsUsersDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
  subscribe(){
  this.languageService.language$.subscribe((lang:string)=>{
if (lang=='ar'){
this.langAr=true  
}else{
  this.langAr=false  

}
  })
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

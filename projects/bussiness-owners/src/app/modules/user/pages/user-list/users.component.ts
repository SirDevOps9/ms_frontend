import { Component, OnInit, ViewChild } from '@angular/core';
import {
  EnvironmentService,
  LanguageService,
  LogService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { UserInviteFormComponent } from '../../../../components/userscomps/invite-form/user-invite-form/user-invite-form.component';
import { bouserdetails } from '../../../../components/userscomps/bouserdetails/bouserdetails.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Title } from '@angular/platform-browser';
import { UserProxy } from '../../user.proxy';
import { UserListResponse } from '../../models';
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
    private toasterService: ToasterService,
    private userProxy: UserProxy,
    private dialog: DialogService,
    private router: RouterService,
    private logService: LogService,
    private titleService: Title,
    private env: EnvironmentService,
  ) { }
  ngOnInit() {
    this.titleService.setTitle('Users');
    this.getAllUsers();
   
  }
  getAllUsers() {
    this.userProxy.getAll(this.router.currentId).subscribe({
      next: (res) => {
        this.userData = res.response;
      },
    });
  }
  resendInvitation(id: string) {
    this.userProxy.resendInvitation(id).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('User.Inviteform.Success'),
          this.languageService.transalte('User.Inviteform.InviationSent')
        );
      },
    });
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
  getProfilePic(id: string){
    return this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + id
  }

  async activate(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      this.userProxy.activateUser(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            'Success',
            this.languageService.transalte('User.UserActivatedSuccessfully')
          );

          let indexToChange = this.userData.find((item) => item.id === id);
          indexToChange!.isActive = true;
        },
      });
    } else {
      this.userData.forEach((element: any) => {
        if (element.id == id) {
          console.log(element.isActive);
          element.isActive = false;
        }
      });
    }
  }
  async deactivate(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      this.userProxy.deactivateUser(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            'Success',
            this.languageService.transalte('User.UserDeactivatedSuccessfully')
          );
          let indexToChange = this.userData.find((item) => item.id === id);
          indexToChange!.isActive = false;
        },
      });
    } else {
      this.userData.forEach((element: any) => {
        if (element.id == id) {
          console.log(element.isActive);
          element.isActive = true;
        }
      });
    }
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
}

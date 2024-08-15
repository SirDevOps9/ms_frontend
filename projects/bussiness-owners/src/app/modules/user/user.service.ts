import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import {
  AddConfirmedUserDto,
  EditUserModel,
  CreateInvitedUser,
  UserListResponse,
  UserState,
  ExportUserListResponse,
} from './models';
import { UserProxy } from './user.proxy';
import {
  LanguageService,
  LoaderService,
  PageInfo,
  PageInfoResult,
  RouterService,
  ToasterService,
  EnvironmentService,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserInviteFormComponent } from './components/invite-form/user-invite-form.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSource = new BehaviorSubject<UserListResponse[]>([]);

  private userStateDataSource = new BehaviorSubject<UserState>({});

  public userState = this.userStateDataSource.asObservable();

  public users = this.userDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  private exportsUsersDataSource = new BehaviorSubject<ExportUserListResponse[]>([]);
  public exportsUsersDataSourceObservable = this.exportsUsersDataSource.asObservable();

  getAllUsers(searchTerm:string,subscriptionId: string) {
    this.userProxy.getAll(searchTerm,subscriptionId).subscribe({
      next: (res) => {
        this.userDataSource.next(res);
      },
    });
    return;
  }

  getAllUsersPaginated(pageInfo: PageInfo) {
    this.userProxy.getAllPaginated(pageInfo).subscribe({
      next: (res) => {
        this.userDataSource.next(res.result);
        this.userDataSource.next(res.result);
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

  async activate(id: string, subdomainId: any) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangestatus'
    );
    if (confirmed) {
      this.userProxy.activateUser(id, subdomainId).subscribe({
        next: () => {
          const userToChange = this.userDataSource.value.find(
            (item) => item.id === id
          );
          if (userToChange) {
            userToChange.isActive = true;
            this.userDataSource.next([...this.userDataSource.value]);
          }
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte(
              'User.UserActivatedSuccessfully'
            )
          );
        },
      });
    } else {
      this.userDataSource.value.find((item) => {
        if (item.id === id) {
          console.log(item.isActive);
          item.isActive = false;
          item.isActive = false;
        }
      });
    }
  }

  async deactivate(id: string, subdomainId: any) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangestatus'
    );
    if (confirmed) {
      this.userProxy.deactivateUser(id, subdomainId).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte(
              'User.UserDeactivatedSuccessfully'
            )
          );
          const userToChange = this.userDataSource.value.find(
            (item) => item.id === id
          );
          if (userToChange) {
            userToChange.isActive = false;
            this.userDataSource.next([...this.userDataSource.value]);
          }
        },
      });
    } else {
      this.userDataSource.value.find((item) => {
        if (item.id === id) {
          console.log(item.isActive);
          item.isActive = true;
          item.isActive = true;
        }
      });
    }
  }

  openInviteUserModal(
    id: string,
    ref: DynamicDialogRef,
    dialog: DialogService
  ) {
    ref = dialog.open(UserInviteFormComponent, {
      width: '600px',
      height: '600px',
       data: { Id: id },
    });
    ref.onClose.subscribe((result: UserListResponse) => {
      if (result as UserListResponse) {

        const updatedUserList: UserListResponse[] = [
          ...this.userDataSource.value,
          result,
        ];
        this.userDataSource.next(updatedUserList);
      }
    });
  }

  inviteUser(
    model: CreateInvitedUser,
    licenseLabel: string,
    dialogRef: DynamicDialogRef
  ) {
    this.loaderService.show();
    this.userProxy.inviteUser(model).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('User.Inviteform.Success'),
          this.languageService.transalte('User.Inviteform.InviationSent')
        );
        this.loaderService.hide();
        //res.license = licenseLabel;
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  getUserById(userId: string, subdomainId: string) {
    this.userProxy.getUserById(userId, subdomainId).subscribe({
      next: (response) => {
        this.userStateDataSource.next({ userDetails: response });
      },
    });
  }

  getInvitedById(invitedUserId: string) {
    return this.userProxy.getInvitedById(invitedUserId);
  }

  submitUserConfirm(subdomain: string, request: AddConfirmedUserDto) {
    this.loaderService.show();
    this.userProxy.confirmInvitedUser(request).subscribe({
      next: (response) => {
        this.loaderService.hide();
        this.toasterService.showSuccess('Success', 'Success');
        let loginUrl = this.environmentService.erpLogin!;
        loginUrl = loginUrl.replace('*', subdomain);
        window.location.href = loginUrl;
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  editUser(
    userModel: EditUserModel,
    id: string,
    subdomainId: string,
    ref: DynamicDialogRef
  ) {
    this.userProxy.updateUser(userModel, id, subdomainId).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          'Success',
          this.languageService.transalte('User.BoUserDetails.UserUpdated')
        );
        ref.close();
      },
      error: () => {
        ref.close();
      },
    });
  }

  testTree() {
    this.userProxy.testTree().subscribe();
  }

  async removeInvitedUser(email: string,subdomainId:string) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.userProxy.removeInvitedUser(email,subdomainId).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Success'),
            this.languageService.transalte(
              'User.UserRemovedSuccessfully'
            )
          );
          this.loaderService.hide();
          const currentusers = this.userDataSource.getValue();
          const updateduser = currentusers.filter(
            (user) => user.email !== email
          );
          this.userDataSource.next(updateduser);
        },
      });
    } else {
    }
  }

  exportUsersData(companyId: string,
  ) {
    this.userProxy.exportUsersData(companyId).subscribe({
      next: (res) => {
         this.exportsUsersDataSource.next(res);
      },
    });
  }

  constructor(
    private userProxy: UserProxy,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private environmentService: EnvironmentService
  ) {}
}

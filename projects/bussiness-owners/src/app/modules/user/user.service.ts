import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, map } from 'rxjs';
import {
  AddConfirmedUserDto,
  EditUserModel,
  CreateInvitedUser,
  UserListResponse,
} from './models';
import { UserProxy } from './user.proxy';
import {
  DefaultExceptionModel,
  Condition,
  FilterDto,
  FilterOptions,
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

  public users = this.userDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  getAllUsers(subscriptionId: number) {
    this.userProxy.getAll(subscriptionId).subscribe({
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
              'Company.CompanyActivatedSuccessfully'
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
              'Company.CompanyDeactivatedSuccessfully'
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

  openInviteUserModal(id: number, ref: DynamicDialogRef, dialog: DialogService) {
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

  inviteUser(model: CreateInvitedUser, licenseLabel: string, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.userProxy.inviteUser(model).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('User.Inviteform.Success'),
          this.languageService.transalte('User.Inviteform.InviationSent')
        );
        this.loaderService.hide();
        res.license = licenseLabel;
        dialogRef.close(res);
      },
      error: (err) => {
        console.log('Invite Error', err);

        this.loaderService.hide();
      },
    });
  }

  getUserById(userId: string , subdomainId  : number) {
    return this.userProxy.getUserById(userId,subdomainId).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: any) => {
        throw err.error?.errorMessage!;
      })
    );
  }

  getInvitedById(invitedUserId: string){
    return this.userProxy.getInvitedById(invitedUserId);
  }

  submitUserConfirm(subdomain: string, request: AddConfirmedUserDto) {
    this.loaderService.show();
    this.userProxy.confirmInvitedUser(request).subscribe({
      next: (response) => {
        this.loaderService.hide();
        this.toasterService.showSuccess('Success', 'Success');
        let loginUrl = this.environmentService.erpLogin!;
        loginUrl = loginUrl.replace("*", subdomain);
        window.location.href = loginUrl;
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  editUser(userModel: EditUserModel, id: string, subdomainId:number, ref: DynamicDialogRef) {
    this.userProxy.updateUser(userModel,id, subdomainId).subscribe({
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

  constructor(
    private userProxy: UserProxy,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private environmentService: EnvironmentService
  ) {}
}

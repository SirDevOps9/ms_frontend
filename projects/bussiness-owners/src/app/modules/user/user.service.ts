import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, map } from 'rxjs';
import { EditUserModel, InviteUserDto, UserListResponse } from './models';
import { UserProxy } from './user.proxy';
import {
  APIResponse,
  Condition,
  FilterDto,
  FilterOptions,
  LanguageService,
  LoaderService,
  PageInfo,
  PageInfoResult,
  RouterService,
  ToasterService,
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

    var filterDto = new FilterDto();

    filterDto.pageInfo = new PageInfo();

    let cond: Condition[] = [];

    cond.push({
      column: 'Name',
      operator: FilterOptions.Contains,
      value: 'f',
    });

    // cond.push({
    //   column: 'Email',
    //   operator: FilterOptions.Contains,
    //   value: 'gmail',
    // });

    filterDto.conditions = cond;

    this.userProxy.getAllPaginated(filterDto).subscribe({
      next: (res) => {
        this.userDataSource.next(res.response.result);
        this.currentPageInfo.next(res.response.pageInfoResult);
      },
    });
    return;
  }

  getAllUsersPaginated(pageInfo: PageInfo) {
    this.userProxy.getAllPaginated(pageInfo).subscribe({
      next: (res) => {
        this.userDataSource.next(res.response.result);
        this.userDataSource.next(res.response.result);
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

  async activate(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangestatus'
    );
    if (confirmed) {
      this.userProxy.activateUser(id).subscribe({
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
        }
      });
    }
  }

  async deactivate(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangestatus'
    );
    if (confirmed) {
      this.userProxy.deactivateUser(id).subscribe({
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
        }
      });
    }
  }

  openInviteUserModal(ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(UserInviteFormComponent, {
      width: '600px',
      height: '600px',
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

  inviteUser(model: InviteUserDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.userProxy.inviteUser(model).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('User.Inviteform.Success'),
          this.languageService.transalte('User.Inviteform.InviationSent')
        );
        this.loaderService.hide();

        dialogRef.close(res.response);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  getUserById(userId: string) {
    return this.userProxy.getUserById(userId).pipe(
      map((res) => {
        return res.response;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }

  getEmail(userId: string) {
    return this.userProxy.getById(userId).pipe(
      map((res) => {
        return res.response.email;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }

  submitUserConfirm(formData: FormData) {
    this.loaderService.show();
    this.userProxy.confirmInvitedUser(formData).subscribe({
      next: (response) => {
        this.loaderService.hide();
        this.toasterService.showSuccess('Success', 'Success');
        this.routerService.navigateTo('/login');
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  editUser(userModel: EditUserModel, ref: DynamicDialogRef) {
    this.userProxy.updateUser(userModel, userModel.id).subscribe({
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
  constructor(
    private userProxy: UserProxy,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

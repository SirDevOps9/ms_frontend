import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import {
  APIResponse,
  LanguageService,
  LoaderService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ERPUserProxy } from './erp-user.proxy';
import { UserListResponse } from '../user/models';
import { InvitedErpUserComponent } from './components/invited-erp-user/invited-erp-user.component';
@Injectable({
  providedIn: 'root',
})
export class ERPUserService {
  private userDataSource = new BehaviorSubject<UserListResponse[]>([]);

  public users = this.userDataSource.asObservable();

  getAllUsers(subscriptionId: number) {
    this.eRPUserProxy.getAll(subscriptionId).subscribe({
      next: (res) => {
        this.userDataSource.next(res.response);
      },
    });
  }
  openInviteErpUserModal(ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(InvitedErpUserComponent, {
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
  constructor(
    private eRPUserProxy:ERPUserProxy,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

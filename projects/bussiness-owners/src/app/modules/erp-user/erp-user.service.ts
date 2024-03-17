import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  APIResponse,
  LanguageService,
  LoaderService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ERPUserProxy } from './erp-user.proxy';
import {  UserListResponse } from '../user/models';
import { InviteErpUserDto } from './models/inviteerpuser';
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

  inviteUser(model: InviteErpUserDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.eRPUserProxy.inviteUser(model).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('ErpUser.Inviteform.Success'),
          this.languageService.transalte('ErpUser.Inviteform.InviationSent')
        );
        this.loaderService.hide();

        dialogRef.close(res.response);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  getEmailOptions(query: string): Observable<string[]> {
    return this.eRPUserProxy.getEmailOptions(query).pipe(
      map((res: APIResponse<string[]>) => {
        return res.response; 
      })
    );
  }

  constructor(
    private eRPUserProxy:ERPUserProxy,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

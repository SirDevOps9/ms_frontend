import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import {
  LanguageService,
  LoaderService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ERPUserProxy } from './erp-user.proxy';
import { UserListResponse } from '../user/models';
@Injectable({
  providedIn: 'root',
})
export class ERPUserService {
  private userDataSource = new BehaviorSubject<UserListResponse[]>([]);

  public users = this.userDataSource.asObservable();

  getAllUsers(subscriptionId: number) {
    this.eRPUserProxy.getAll(subscriptionId).subscribe({
      next: (res) => {
        this.userDataSource.next(res);
      },
    });
  }
  constructor(
    private eRPUserProxy: ERPUserProxy,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

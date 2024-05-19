import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { AccountProxy } from './account.proxy';
<<<<<<< HEAD
import { AddAccountDto } from './models/addAccountDto';
=======
import { AccountDto } from './models';
>>>>>>> develop

@Injectable({
  providedIn: 'root',
})
export class AccountService {
<<<<<<< HEAD
  constructor(private accountproxy: AccountProxy) {}

=======
  private accountDataSource = new BehaviorSubject<AccountDto[]>([]);

  public accountsList = this.accountDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  initAccountList(searchTerm: string, pageInfo: PageInfo) {
    this.accountproxy.getAllPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.accountDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

>>>>>>> develop
  getAllChartOfAccountPaginated(searchTerm: string, pageInfo: PageInfo) {
    return this.accountproxy.getAllPaginated(searchTerm, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getTreeList() {
    return this.accountproxy.getTreeList().pipe(
      map((res) => {
        return res;
      })
    );
  }
<<<<<<< HEAD
  getAccountSections() {
    return this.accountproxy.getAccountSections().pipe(
      map((res) => {
        return res;
      })
    );
  }

  getAccountTypes(sectionId: number) {
    return this.accountproxy.getAccountTypes(sectionId).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getTags() {
    return this.accountproxy.getTags().pipe(
      map((res) => {
        return res;
      })
    );
  }
  addAccount(command: AddAccountDto) {
    return this.accountproxy.addAccount(command);
  }
=======

  constructor(private accountproxy: AccountProxy) {}
>>>>>>> develop
}

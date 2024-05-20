import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { AccountProxy } from './account.proxy';
import { AccountDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
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

  constructor(private accountproxy: AccountProxy) {}
}

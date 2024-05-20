import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { accountTreeList, AccountDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountProxy {
  getAllPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<AccountDto>> {
    return this.httpService.get<PaginationVm<AccountDto>>(`ChartOfAccounts?${pageInfo.toQuery}`);
  }
  getTreeList(): Observable<accountTreeList[]> {
    return this.httpService.get<accountTreeList[]>(
      // `Company?subscriptionId=${subscriptionId}`
      `ChartOfAccounts/GetTree`
    );
  }

  constructor(private httpService: HttpService) {}
}

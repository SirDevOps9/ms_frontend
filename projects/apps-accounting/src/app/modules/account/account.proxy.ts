
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDto } from './models/accountDto';
import { AddAccountDto } from './models/addAccountDto';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { accountTreeList } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountProxy {
    
    getAllPaginated(
        searchTerm: string,
        pageInfo: PageInfo
      ): Observable<PaginationVm<AccountDto>> {
        const x= this.httpService.get<PaginationVm<AccountDto>>(
          `ChartOfAccounts`
        );
        console.log( 'sandra',x);
         return x
      }
      getTreeList(): Observable<accountTreeList[]> {
        return this.httpService.get<accountTreeList[]>(
          // `Company?subscriptionId=${subscriptionId}`
          `ChartOfAccounts/GetTree`
        );
      }
      addAccount(command: AddAccountDto): Observable<boolean> {
        return this.httpService.post('ChartOfAccounts/AddAccount',command);
      }

      constructor(private httpService: HttpService) {}
}
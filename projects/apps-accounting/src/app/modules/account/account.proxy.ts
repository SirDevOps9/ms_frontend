
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDto } from './models/accountDto';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';

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

      constructor(private httpService: HttpService) {}
}
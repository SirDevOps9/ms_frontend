
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDto } from './models/accountDto';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class AccountProxy {

    getAllPaginated(
        pageInfo: PageInfo
      ): Observable<PaginationVm<AccountDto>> {
        return this.httpService.get<PaginationVm<AccountDto>>(
          `ChartOfAccounts?`
        );
      }

      constructor(private httpService: HttpService) {}
}
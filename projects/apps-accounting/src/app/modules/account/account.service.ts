import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AccountDto } from './models/accountDto';
import { AccountProxy } from './account.proxy';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  
  constructor(private accountproxy:AccountProxy) {}

  getAllChartOfAccountPaginated( searchTerm:string ,pageInfo: PageInfo) {
    return this.accountproxy.getAllPaginated( searchTerm,pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  
}

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AccountDto } from './models/accountDto';
import { AccountProxy } from './account.proxy';
import { AddAccountDto } from './models/addAccountDto';

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
  getTreeList() {
    return this.accountproxy.getTreeList().pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAccountSections() {
    return this.accountproxy.getAccountSections().pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAccountTypes(sectionId:number) {
    return this.accountproxy.getAccountTypes(sectionId).pipe(
      map((res) => {
        return res;
      })
    );
  }
  addAccount(command : AddAccountDto) {
    return this.accountproxy.addAccount(command);
  }
  
}

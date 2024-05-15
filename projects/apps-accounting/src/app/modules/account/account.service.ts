import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AccountDto } from './models/accountDto';
import { AccountProxy } from './account.proxy';
import { AddLevelsDto } from './models/addLevelsDto';

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
  getLevels() {
    return this.accountproxy.getLevels().pipe(
      map((res) => {
        return res;
      })
    );
  }
  addLevels(command: AddLevelsDto)
  {
    return this.accountproxy.addLevels(command).pipe(
      map((res) => {
        return res;
      })
    );
  }
  
}

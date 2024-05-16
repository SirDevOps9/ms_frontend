import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PageInfo } from 'shared-lib';
import { AccountProxy } from './account.proxy';
import { listAddLevelsDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private accountproxy: AccountProxy) {}

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

  getLevels() {
    return this.accountproxy.getLevels().pipe(
      map((res) => {
        return res;
      })
    );
  }

  addLevels(command: listAddLevelsDto) {
    return this.accountproxy.addLevels(command).pipe(
      map((res) => {
        return res;
      })
    );
  }
}

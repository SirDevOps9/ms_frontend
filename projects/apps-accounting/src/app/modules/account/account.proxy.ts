import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import {
  listAddLevelsDto,
  GetLevelsDto,
  accountTreeList,
  AccountDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountProxy {
  getAllPaginated(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<AccountDto>> {
    const x = this.httpService.get<PaginationVm<AccountDto>>(`ChartOfAccounts`);
    console.log('sandra', x);
    return x;
  }
  getTreeList(): Observable<accountTreeList[]> {
    return this.httpService.get<accountTreeList[]>(
      // `Company?subscriptionId=${subscriptionId}`
      `ChartOfAccounts/GetTree`
    );
  }
  getLevels(): Observable<GetLevelsDto[]> {
    return this.httpService.get<GetLevelsDto[]>(`Levels`);
  }

  addLevels(command: listAddLevelsDto): Observable<boolean> {
    return this.httpService.post('Levels', command);
  }

  constructor(private httpService: HttpService) {}
}

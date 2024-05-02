import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDto, HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AccountDto } from './models/accountDto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService: HttpService) {}

  getAllPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<AccountDto>>{
    return this.httpService.get<PaginationVm<AccountDto>>(`ChartOfAccounts?searchTerm=${searchTerm}&${pageInfo.toQuery}`);
  }
}

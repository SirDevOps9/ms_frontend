import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddAccountDto } from './models';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AccountSectionDropDownDto } from './models';
import { TagDropDownDto } from './models';
import { accountTreeList, AccountDto } from './models';
import { AccountTypeDropDownDto } from './models';
import { parentAccountDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountProxy {
  getAccountSections(): Observable<AccountSectionDropDownDto[]> {
    return this.httpService.get<AccountSectionDropDownDto[]>(`AccountSection`);
  }

  getAccountTypes(sectionId: number): Observable<AccountTypeDropDownDto[]> {
    return this.httpService.get<AccountTypeDropDownDto[]>(`AccountType?SectionId=` + sectionId);
  }
  getTags(): Observable<TagDropDownDto[]> {
    return this.httpService.get<TagDropDownDto[]>(`Tag`);
  }

  getAccount(id:number): Observable<parentAccountDto> {
    return this.httpService.get<parentAccountDto>(`ChartOfAccounts/Get?id=${id}`);
  }

  addAccount(command: AddAccountDto): Observable<boolean> {
    return this.httpService.post('ChartOfAccounts/AddAccount', command);
  }
  getAllPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<AccountDto>> {
    return this.httpService.get<PaginationVm<AccountDto>>(`ChartOfAccounts?${pageInfo.toQuery}`);
  }

  getAllParentAccounts(): Observable<parentAccountDto[]> {
    return this.httpService.get<parentAccountDto[]>(`ChartOfAccounts/GetParentAccounts`);
  }

  getTreeList(): Observable<accountTreeList[]> {
    return this.httpService.get<accountTreeList[]>(
      `ChartOfAccounts/GetTree`
    );
  }

  constructor(private httpService: HttpService) {}
}

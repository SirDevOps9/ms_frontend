import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import {
  accountTreeList,
  AddAccountDto,
  AccountDto,
  AccountSectionDropDownDto,
  TagDropDownDto,
  AccountTypeDropDownDto,
  parentAccountDto,
  GetLevelsDto,
  listAddLevelsDto,
  AccountByIdDto,
  accountById
} from './models';

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
    return this.httpService.get<TagDropDownDto[]>(`Tag/Tagdropdown`);
  }

  getAccount(id: number): Observable<parentAccountDto> {
    return this.httpService.get<parentAccountDto>(`ChartOfAccounts/Get?id=${id}`);
  }
  getAccountDetails(id: number): Observable<AccountByIdDto> {
    return this.httpService.get<AccountByIdDto>(`ChartOfAccounts/GetAccountDetails?id=${id}`);
  }

  addAccount(command: AddAccountDto): Observable<AccountDto> {
    return this.httpService.post('ChartOfAccounts/AddAccount', command);
  }
  editAccount(command:accountById ): Observable<accountById> {
    return this.httpService.put('ChartOfAccounts/EditAccount', command);
  }
  getAllPaginated(quieries: string, pageInfo: PageInfo): Observable<PaginationVm<AccountDto>> {
    return this.httpService.get<PaginationVm<AccountDto>>(`ChartOfAccounts?${pageInfo.toQuery}&${quieries ?quieries : '' }`);
  }
  getAccountsHasNoChildren(quieries: string, pageInfo: PageInfo): Observable<PaginationVm<AccountDto>> {
    return this.httpService.get<PaginationVm<AccountDto>>(`ChartOfAccounts/GetHasNoChildrenList?${pageInfo.toQuery}&${quieries ?quieries : '' }`);
  }

  getAllParentAccounts(): Observable<parentAccountDto[]> {
    return this.httpService.get<parentAccountDto[]>(`ChartOfAccounts/GetParentAccounts`);
  } 

  getTreeList(): Observable<accountTreeList[]> {
    return this.httpService.get<accountTreeList[]>(`ChartOfAccounts/GetTree`);
  }

  getLevels(): Observable<GetLevelsDto[]> {
    return this.httpService.get<GetLevelsDto[]>(`Levels`);
  }

  addLevels(command: listAddLevelsDto): Observable<boolean> {
    return this.httpService.post('Levels', command);
  }
  getAccountById(id: number): Observable<accountById> {
    return this.httpService.get<accountById>(`ChartOfAccounts/GetById?id=${id}`);
  }

  constructor(private httpService: HttpService) {}
}

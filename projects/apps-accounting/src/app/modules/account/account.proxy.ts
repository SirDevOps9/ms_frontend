import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { AccountDto } from './models/accountDto';
import { AddAccountDto } from './models/addAccountDto';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { accountTreeList } from './models';
import { AccountSectionDropDownDto } from './models/accountSectionDropDownDto';
import { TagDropDownDto } from './models/tagDropDownDto';
=======
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { accountTreeList, AccountDto } from './models';
>>>>>>> develop

@Injectable({
  providedIn: 'root',
})
export class AccountProxy {
<<<<<<< HEAD
    
    getAllPaginated(
        searchTerm: string,
        pageInfo: PageInfo
      ): Observable<PaginationVm<AccountDto>> {
        const accountList = this.httpService.get<PaginationVm<AccountDto>>(
          `ChartOfAccounts`
        );
         return accountList
      }
      getTreeList(): Observable<accountTreeList[]> {
        return this.httpService.get<accountTreeList[]>(
          `ChartOfAccounts/GetTree`
        );
      }
      getAccountSections(): Observable<AccountSectionDropDownDto[]> {
        return this.httpService.get<AccountSectionDropDownDto[]>(
          `AccountSection`
        );
      }

      getAccountTypes(sectionId:number): Observable<AccountSectionDropDownDto[]> {
        return this.httpService.get<AccountSectionDropDownDto[]>(
          `AccountType?SectionId=`+ sectionId
        );
      }
      getTags(): Observable<TagDropDownDto[]> {
        return this.httpService.get<TagDropDownDto[]>(
          `Tag`
        );
      }
      addAccount(command: AddAccountDto): Observable<boolean> {
        return this.httpService.post('ChartOfAccounts/AddAccount',command);
      }
=======
  getAllPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<AccountDto>> {
    return this.httpService.get<PaginationVm<AccountDto>>(`ChartOfAccounts?${pageInfo.toQuery}`);
  }
  getTreeList(): Observable<accountTreeList[]> {
    return this.httpService.get<accountTreeList[]>(
      // `Company?subscriptionId=${subscriptionId}`
      `ChartOfAccounts/GetTree`
    );
  }
>>>>>>> develop

  constructor(private httpService: HttpService) {}
}

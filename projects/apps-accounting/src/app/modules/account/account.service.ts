import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { AccountProxy } from './account.proxy';
import { AddAccountDto } from './models/addAccountDto';
import { AccountDto } from './models';
import { AccountTypeDropDownDto } from './models/accountTypeDropDownDto';
import { TagDropDownDto } from './models/tagDropDownDto';
import { CurrencyDto } from '../general/models/currencyDto';
import { response } from 'express';
import { parentAccountDto } from './models/parentAcccountDto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private accountproxy: AccountProxy) {}

  private accountsDataSource = new BehaviorSubject<AccountDto[]>([]);
  private parentAccountsDataSource = new BehaviorSubject<parentAccountDto[]>([]);
  private currentAccountDataSource = new BehaviorSubject<parentAccountDto>({} as parentAccountDto);
  private accountTypesDataSource = new BehaviorSubject<AccountTypeDropDownDto[]>([]);
  private accountSectionsDataSource = new BehaviorSubject<AccountTypeDropDownDto[]>([]);
  private tagsDataSource = new BehaviorSubject<TagDropDownDto[]>([]);
  

  public accountsList = this.accountsDataSource.asObservable();
  public parentAccounts = this.parentAccountsDataSource.asObservable();
  public selectedAccount = this.currentAccountDataSource.asObservable();
  public accountTypes = this.accountTypesDataSource.asObservable();
  public accountSections = this.accountSectionsDataSource.asObservable();
  public tags = this.tagsDataSource.asObservable();


  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  initAccountList(searchTerm: string, pageInfo: PageInfo) {
    this.accountproxy.getAllPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.accountsDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

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
  getAllParentAccounts() {
    this.accountproxy.getAllParentAccounts().subscribe((response) => {
      this.parentAccountsDataSource.next(response);
    });
  }

  getAccountSections() {
    this.accountproxy.getAccountSections().subscribe((response) => {
      this.accountSectionsDataSource.next(response);
    });
  }
  getAccountTypes(sectionId: number) {
    this.accountproxy.getAccountTypes(sectionId).subscribe((response) => {
      this.accountTypesDataSource.next(response);
    });
  }
  getTags() {
    this.accountproxy.getTags().subscribe((response) => {
      this.tagsDataSource.next(response);
    });
  }
  getAccount(id:number){
    this.accountproxy.getAccount(id).subscribe((response)=>{
      this.currentAccountDataSource.next(response);
    })
  }
  addAccount(command: AddAccountDto) {
    return this.accountproxy.addAccount(command);
  }

}

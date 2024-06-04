import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, ToasterService } from 'shared-lib';
import { AccountProxy } from './account.proxy';
import { AddAccountDto } from './models/addAccountDto';
import { AccountByIdDto, AccountDto, AddTaxGroupDto, GetLevelsDto, TaxGroupDto, listAddLevelsDto } from './models';
import { AccountTypeDropDownDto } from './models/accountTypeDropDownDto';
import { TagDropDownDto } from './models/tagDropDownDto';
import { CurrencyDto } from '../general/models/currencyDto';
import { response } from 'express';
import { parentAccountDto } from './models/parentAcccountDto';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountsDataSource = new BehaviorSubject<AccountDto[]>([]);
  private parentAccountsDataSource = new BehaviorSubject<parentAccountDto[]>([]);
  private currentAccountDataSource = new BehaviorSubject<parentAccountDto>({} as parentAccountDto);
  private accountDetailsDataSource = new BehaviorSubject<AccountByIdDto>({} as AccountByIdDto );
  private accountTypesDataSource = new BehaviorSubject<AccountTypeDropDownDto[]>([]);
  private accountSectionsDataSource = new BehaviorSubject<AccountTypeDropDownDto[]>([]);
  private tagsDataSource = new BehaviorSubject<TagDropDownDto[]>([]);
  private savedAccountDataSource = new BehaviorSubject<AccountDto | undefined>(undefined);
  private taxGroupDataSource = new BehaviorSubject<TaxGroupDto[]>([]);
  private currentTaxGroupDataSource = new BehaviorSubject<TaxGroupDto>({} as TaxGroupDto);


  public accountsList = this.accountsDataSource.asObservable();
  public parentAccounts = this.parentAccountsDataSource.asObservable();
  public AccountViewDetails = this.accountDetailsDataSource.asObservable();
  public selectedAccount = this.currentAccountDataSource.asObservable();
  public accountTypes = this.accountTypesDataSource.asObservable();
  public accountSections = this.accountSectionsDataSource.asObservable();
  public tags = this.tagsDataSource.asObservable();
  public savedAddedAccount = this.savedAccountDataSource.asObservable();
  public taxGroupList = this.taxGroupDataSource.asObservable();
  public currentTaxGroup = this.currentTaxGroupDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  private levelsSource = new BehaviorSubject<GetLevelsDto[]>([]);
  public levels = this.levelsSource.asObservable();

  initAccountList(searchTerm: string, pageInfo: PageInfo) {
    this.accountproxy.getAllPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.accountsDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getAllChartOfAccountPaginated(quieries: string, pageInfo: PageInfo) {
    return this.accountproxy.getAllPaginated(quieries, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAccountsHasNoChildren(quieries: string, pageInfo: PageInfo) {
    return this.accountproxy.getAccountsHasNoChildren(quieries, pageInfo).pipe(
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
    this.levelsSource.next([]);
    this.accountproxy.getLevels().subscribe({
      next: (res) => {
        this.levelsSource.next(res);
      },
    });
    return;
  }

  addLevels(command: listAddLevelsDto) {
    this.accountproxy.addLevels(command).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('COAConfigration.Success'),
          this.languageService.transalte('COAConfigration.Levelsaved')
        );
      },
    });
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
  getAccount(id: number) {
    this.accountproxy.getAccount(id).subscribe((response) => {
      this.currentAccountDataSource.next(response);
    });
  }
  getAccountDetails(id: number) {
    this.accountproxy.getAccountDetails(id).subscribe((response) => {
      this.accountDetailsDataSource.next(response);
    });
  }
  addAccount(command: AddAccountDto) {
    this.accountproxy.addAccount(command).subscribe((res) => {
      this.savedAccountDataSource.next(res);
    });
  }
  getAllTaxGroupPaginated(searchTerm: string, pageInfo: PageInfo) {
    return this.accountproxy.getAllTaxGroup(searchTerm, pageInfo).subscribe((response) => {
      this.taxGroupDataSource.next(response.result);
    });
  }
  async deleteTaxGroup(id: number): Promise<boolean > {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    const p = new Promise<boolean>((res, rej) => {
      if (confirmed) {
        this.accountproxy.deleteTaxGroup(id).subscribe({
          next: (status) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('Success'),
              this.languageService.transalte('Deleted Successfully')
            );
            this.loaderService.hide();
            res(true);
          },
        });
      } else {
        res(false);
      }
    });
    return await p;
  }
  addTaxGroup(addTaxGroupDto: AddTaxGroupDto
    ,dialogRef: DynamicDialogRef
  ){
    this.loaderService.show();
    this.accountproxy.addTaxGroup(addTaxGroupDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.success'),
          this.languageService.transalte('tag.addtag.success')
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  editTaxGroup(TaxGroupDto: TaxGroupDto
    ,dialogRef: DynamicDialogRef
  ){
    this.loaderService.show();
    this.accountproxy.editTaxGroup(TaxGroupDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.success'),
          this.languageService.transalte('tag.addtag.success')
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  getTagById(id:number) {
    this.accountproxy.getTaxGroupById(id).subscribe((response) => {
      this.currentTaxGroupDataSource.next(response);
    });
  }



  constructor(
    private accountproxy: AccountProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

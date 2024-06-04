import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {
  LanguageService,
  LoaderService,
  PageInfo,
  PageInfoResult,
  ToasterService,
} from 'shared-lib';
import { AccountProxy } from './account.proxy';
import { AddAccountDto } from './models/addAccountDto';
import {
  AccountByIdDto,
  AccountDto,
  AddTax,
  EditTax,
  GetLevelsDto,
  TaxGroupDropDown,
  listAddLevelsDto,
} from './models';
import { AccountTypeDropDownDto } from './models/accountTypeDropDownDto';
import { TagDropDownDto } from './models/tagDropDownDto';
import { parentAccountDto } from './models/parentAcccountDto';
import { TaxDto } from './models/tax-dto';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountsDataSource = new BehaviorSubject<AccountDto[]>([]);
  private parentAccountsDataSource = new BehaviorSubject<parentAccountDto[]>([]);
  private currentAccountDataSource = new BehaviorSubject<parentAccountDto>({} as parentAccountDto);
  private accountDetailsDataSource = new BehaviorSubject<AccountByIdDto>({} as AccountByIdDto);
  private accountTypesDataSource = new BehaviorSubject<AccountTypeDropDownDto[]>([]);
  private accountSectionsDataSource = new BehaviorSubject<AccountTypeDropDownDto[]>([]);
  private tagsDataSource = new BehaviorSubject<TagDropDownDto[]>([]);
  private savedAccountDataSource = new BehaviorSubject<AccountDto | undefined>(undefined);
  private taxesDefinitionsDataSource = new BehaviorSubject<TaxDto[]>([]);

  public accountsList = this.accountsDataSource.asObservable();
  public parentAccounts = this.parentAccountsDataSource.asObservable();
  public AccountViewDetails = this.accountDetailsDataSource.asObservable();
  public selectedAccount = this.currentAccountDataSource.asObservable();
  public accountTypes = this.accountTypesDataSource.asObservable();
  public accountSections = this.accountSectionsDataSource.asObservable();
  public tags = this.tagsDataSource.asObservable();
  public savedAddedAccount = this.savedAccountDataSource.asObservable();

  public taxesDefintionList = this.taxesDefinitionsDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public currentTaxDataSource = new BehaviorSubject<TaxDto>({} as TaxDto);
  public taxGroupsDropDown = new BehaviorSubject<TaxGroupDropDown[]>([]);

  private levelsSource = new BehaviorSubject<GetLevelsDto[]>([]);
  public levels = this.levelsSource.asObservable();

  public addTaxStatus = new BehaviorSubject<boolean>(false);

  public editTaxStatus = new BehaviorSubject<boolean>(false);

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

  getAllTaxes(searchTerm: string, pageInfo: PageInfo) {
    this.accountproxy.getAllTaxes(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.taxesDefinitionsDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getTaxById(id: number) {
    this.accountproxy.getTaxById(id).subscribe((response) => {
      this.currentTaxDataSource.next(response);
    });
  }

  addTax(model: AddTax, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.accountproxy.addTax(model).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('Tax.AddedSuccessfully')
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  editTax(model: EditTax, dialogRef: DynamicDialogRef) {
    this.loaderService.show();

    this.accountproxy.editTax(model).subscribe({
      next: () => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Tax.Success'),
          this.languageService.transalte('Tax.UpdatedSuccessfully')
        );
        this.loaderService.hide();
        this.editTaxStatus.next(true);
        dialogRef.close();
      },
      error: () => {
        this.loaderService.hide();
        this.toasterService.showError(
          this.languageService.transalte('Tax.Error'),
          this.languageService.transalte('Tax.CannotEditTaxGroupUsedInTransactions')
        );
        this.editTaxStatus.next(true);
      },
    });
  }
  async deleteTax(taxId: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.accountproxy.deleteTax(taxId).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Tax.Success'),
            this.languageService.transalte('Tax.TaxDeletedSuccessfully')
          );
          this.loaderService.hide();
          const currentTaxes = this.taxesDefinitionsDataSource.getValue();
          const updatedTaxes = currentTaxes.filter((tax) => tax.id !== taxId);
          this.taxesDefinitionsDataSource.next(updatedTaxes);
        },
        error: () => {
          this.loaderService.hide();
          this.toasterService.showError(
            this.languageService.transalte('Tax.Error'),
            this.languageService.transalte('Tax.CannotDeleteTaxUsedInTransactions')
          );
        },
      });
    }
  }

  getAllTaxGroups() {
    this.accountproxy.getAllTaxGroups().subscribe({
      next: (res) => {
        this.taxGroupsDropDown.next(res);
      },
    });
  }
  constructor(
    private loaderService: LoaderService,
    private accountproxy: AccountProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService
  ) {}
}

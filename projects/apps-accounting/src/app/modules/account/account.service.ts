import { AccountProxy } from './account.proxy';
import { AddAccountDto } from './models/addAccountDto';
import {
  AccountByIdDto,
  AccountDto,
  AddTaxGroupDto,
  GetLevelsDto,
  TaxGroupDto,
  listAddLevelsDto,
  accountById,
  AddTax,
  EditTax,
  TaxGroupDropDown,
  addCostCenter,
  parentCostCenter,
  costById,
  costCenterDetails,
  costCenterList,
  costCenterActivation,
  companyDropDownDto,
  CountryDto,
  ExportTaxDto,
  ExportAccountsDto,
} from './models';

import { AccountTypeDropDownDto } from './models/accountTypeDropDownDto';
import { TagDropDownDto } from './models/tagDropDownDto';
import { parentAccountDto } from './models/parentAcccountDto';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaxDto } from './models/tax-dto';
import { toSignal } from '@angular/core/rxjs-interop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {
  PageInfoResult,
  PageInfo,
  LoaderService,
  ToasterService,
  LanguageService,
  FormsService,
} from 'shared-lib';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountsDataSource = new BehaviorSubject<AccountDto[]>([]);
  private parentAccountsDataSource = new BehaviorSubject<parentAccountDto[]>([]);
  private currentAccountDataSource = new BehaviorSubject<parentAccountDto>({} as parentAccountDto);
  private currentAccountDataSourceById = new BehaviorSubject<accountById>({} as accountById);
  private accountDetailsDataSource = new BehaviorSubject<AccountByIdDto>({} as AccountByIdDto);
  private accountTypesDataSource = new BehaviorSubject<AccountTypeDropDownDto[]>([]);
  private accountSectionsDataSource = new BehaviorSubject<AccountTypeDropDownDto[]>([]);
  private tagsDataSource = new BehaviorSubject<TagDropDownDto[]>([]);
  private companysDataSource = new BehaviorSubject<companyDropDownDto[]>([]);
  public savedAccountDataSource = new BehaviorSubject<AccountDto | undefined>(undefined);
  private taxGroupDataSource = new BehaviorSubject<TaxGroupDto[]>([]);
  private currentTaxGroupDataSource = new BehaviorSubject<TaxGroupDto>({} as TaxGroupDto);
  private editAccountDataSource = new BehaviorSubject<accountById | undefined>(undefined);
  private savedCostCenter = new BehaviorSubject<addCostCenter | undefined>(undefined);
  private parentAccountsostCenter = new BehaviorSubject<parentCostCenter[]>([]);
  private costCenterById = new BehaviorSubject<costById>({} as costById);
  private costCenterDetails = new BehaviorSubject<costCenterDetails>({} as costCenterDetails);
  public  editCostCenter = new BehaviorSubject<costById | undefined>(undefined);
  private costCenterActivat = new BehaviorSubject<costCenterActivation | undefined>(undefined);
  private exportsTaxGroupDataSource = new BehaviorSubject<TaxGroupDto[]>([]);
  public exportsTaxGroupDataSourceObservable = this.exportsTaxGroupDataSource.asObservable();
  private exportsTaxesDataSource = new BehaviorSubject<ExportTaxDto[]>([]);
  public exportsTaxesDataSourceObservable = this.exportsTaxesDataSource.asObservable();
  private exportsAccountsDataSource = new BehaviorSubject<ExportAccountsDto[]>([]);
  public exportsAccountsDataSourceObservable = this.exportsAccountsDataSource.asObservable();
  private exportsCostCentersDataSource = new BehaviorSubject<costCenterList[]>([]);
  public exportsCostCentersDataSourceObservable = this.exportsCostCentersDataSource.asObservable();
  private taxesDefinitionsDataSource = new BehaviorSubject<TaxDto[]>([]);
  private costCenterList = new BehaviorSubject<costCenterList[]>([]);
  private costCenterData = new BehaviorSubject(false);
  private accountdeleted = new BehaviorSubject<any>(false);
  public costCenterDataObser = this.costCenterData.asObservable();
  public accountdeletedObser = this.accountdeleted.asObservable();

  public accountsList = this.accountsDataSource.asObservable();
  public costActivation = this.costCenterActivat.asObservable();
  public parentAccounts = this.parentAccountsDataSource.asObservable();
  public AccountViewDetails = this.accountDetailsDataSource.asObservable();
  public selectedAccount = this.currentAccountDataSource.asObservable();
  public selectedAccountById = this.currentAccountDataSourceById.asObservable();
  public accountTypes = this.accountTypesDataSource.asObservable();
  public accountSections = this.accountSectionsDataSource.asObservable();
  public tags = this.tagsDataSource.asObservable();
  public companyDropdown = this.companysDataSource.asObservable();
  public savedAddedAccount = this.savedAccountDataSource.asObservable();
  public taxGroupList = this.taxGroupDataSource.asObservable();
  public currentTaxGroup = this.currentTaxGroupDataSource.asObservable();
  public editedAccount = this.editAccountDataSource.asObservable();

  public taxesDefintionList = this.taxesDefinitionsDataSource.asObservable();
  public costCenterListView = this.costCenterList.asObservable();
  public savedAddedCost = this.savedCostCenter.asObservable();
  public costparentAccounts = this.parentAccountsostCenter.asObservable();
  public selectedCostById = this.costCenterById.asObservable();
  public selectedCostDetails = this.costCenterDetails.asObservable();
  public editedCost = this.editCostCenter.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public currentTaxDataSource = new BehaviorSubject<TaxDto>({} as TaxDto);
  public taxGroupsDropDown = new BehaviorSubject<TaxGroupDropDown[]>([]);

  private levelsSource = new BehaviorSubject<GetLevelsDto[]>([]);
  public levels = this.levelsSource.asObservable();

  private countryDataSource = new BehaviorSubject<CountryDto[]>([]);
  public countries = this.countryDataSource.asObservable();

  public addTaxStatus = new BehaviorSubject<boolean>(false);

  public editTaxStatus = new BehaviorSubject<boolean>(false);

  private childrenAccountDataSource = new BehaviorSubject<AccountDto[]>([]);
  public childrenAccountList = this.childrenAccountDataSource.asObservable();
  public childrenAccountPageInfo = new BehaviorSubject<PageInfoResult>({});

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
  getCostCenterLookup() {
    return this.accountproxy.getAccountLookup();
  }
  getAccountsHasNoChildren(quieries: string, pageInfo: PageInfo) {
    return this.accountproxy.getAccountsHasNoChildren(quieries, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAccountChildrenList(quieries: string, pageInfo: PageInfo) {
    this.accountproxy.getAccountsHasNoChildren(quieries, pageInfo).subscribe((res) => {
      this.childrenAccountDataSource.next(res.result);
      this.childrenAccountPageInfo.next(res.pageInfoResult);
    });
  }
  getAccountsHasNoChildrenNew(quieries: string, pageInfo: PageInfo) {
    this.accountproxy.getAccountsHasNoChildrenNew(quieries, pageInfo).subscribe((res) => {
      this.childrenAccountDataSource.next(res.result);
      this.childrenAccountPageInfo.next(res.pageInfoResult);
    });
  }

  getAccountsChildrenDropDown() {
    return this.accountproxy.getAccountsChildrenDropDown().pipe(
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
  GetCostTree() {
    return this.accountproxy.GetCostTree().pipe(
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

  addLevels(command: listAddLevelsDto, form: FormArray) {
    this.accountproxy.addLevels(command).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('COAConfigration.Success'),
          this.languageService.transalte('COAConfigration.LevelsSaved')
        );
      },
      error: (err) => {
        console.log('back Valid', err);

        // this.formsService.setFormValidationErrors(form, err);
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
  getCompanyDropdown() {
    this.accountproxy.getCompanyDropdown().subscribe((response) => {
      this.companysDataSource.next(response);
    });
  }
  getAccount(id: number) {
    this.accountproxy.getAccount(id).subscribe((response) => {
      this.currentAccountDataSource.next(response);
    });
  }
  getAccountById(id: number) {
    this.accountproxy.getAccountById(id).subscribe((response) => {
      this.currentAccountDataSourceById.next(response);
      console.log('test service');
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
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }
  async deleteTaxGroup(id: number): Promise<boolean> {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    const p = new Promise<boolean>((res, rej) => {
      if (confirmed) {
        this.accountproxy.deleteTaxGroup(id).subscribe({
          next: (status) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('TaxGroup.Success'),
              this.languageService.transalte('TaxGroup.DeletedSuccessfully')
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
  addTaxGroup(addTaxGroupDto: AddTaxGroupDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.accountproxy.addTaxGroup(addTaxGroupDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('TaxGroup.Success'),
          this.languageService.transalte('TaxGroup.AddedSuccessfully')
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  editTaxGroup(TaxGroupDto: TaxGroupDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.accountproxy.editTaxGroup(TaxGroupDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('TaxGroup.Success'),
          this.languageService.transalte('TaxGroup.UpdatedSuccessfully')
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  getTaxGroupById(id: number) {
    this.accountproxy.getTaxGroupById(id).subscribe((response) => {
      this.currentTaxGroupDataSource.next(response);
    });
  }
  editAccount(account: accountById) {
    this.accountproxy.editAccount(account).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('ChartOfAccount.Success'),
          this.languageService.transalte('ChartOfAccount.UpdatedSuccessfully')
        );
        this.loaderService.hide();
        this.editAccountDataSource.next(res);
      },
      error: (error) => {
        this.loaderService.hide();
        this.toasterService.showError(
          this.languageService.transalte('ChartOfAccounts.Error'),
          error.message
        );
      },
    });
  }

  async deleteAccount(accountId: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.accountproxy.deleteAccount(accountId).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('ChartOfAccount.Success'),
            this.languageService.transalte('ChartOfAccount.DeletedSuccessfully')
          );
          this.loaderService.hide();
          this.accountdeleted.next(res);
        },
        error: () => {
          this.loaderService.hide();
        },
      });
    }
  }

  // taxesSignal = signal<PaginationVm<TaxDto>>({} as PaginationVm<TaxDto>);

  getAllTaxes(searchTerm: string, pageInfo: PageInfo) {
    this.accountproxy.getAllTaxes(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.taxesDefinitionsDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  // getTaxDefinitionsSignal = signal({});

  getTaxById(id: number) {
    this.accountproxy.getTaxById(id).subscribe((response) => {
      this.currentTaxDataSource.next(response);
    });
  }

  addTax(model: AddTax, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.accountproxy.addTax(model).subscribe({
      next: (res) => {
        // this.taxesSignal.update((textSignal) => ({
        //   ...textSignal,
        //   result: [...textSignal.result, res],
        // }));
        this.toasterService.showSuccess(
          this.languageService.transalte('Tax.Success'),
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

  allocationCenter(model: any, dialogRef: DynamicDialogRef) {
    // this.loaderService.show();
    // this.accountproxy.addTax(model).subscribe({
    //   next: (res) => {
    //     this.toasterService.showSuccess(
    //       this.languageService.transalte('success'),
    //       this.languageService.transalte('Tax.AddedSuccessfully')
    //     );
    //     this.loaderService.hide();
    //     dialogRef.close(res);
    //   },
    //   error: (err) => {
    //     this.loaderService.hide();
    //   },
    // });
  }

  editTax(model: EditTax, dialogRef: DynamicDialogRef) {
    this.loaderService.show();

    this.accountproxy.editTax(model).subscribe({
      next: (res) => {
        // this.taxesSignal.update((taxSignal) => ({
        //   ...taxSignal,
        //   result: taxSignal.result.map((tax) => (tax.id === res.id ? res : tax)),
        // }));
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
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Tax.Success'),
            this.languageService.transalte('Tax.DeletedSuccessfully')
          );
          this.loaderService.hide();
          // this.getAllTaxes('', new PageInfo());
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
  AddCostCenter(command: addCostCenter) {
    this.accountproxy.AddCostCenter(command).subscribe({
      next: (res) => {
        this.savedCostCenter.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('costCenter.Success'),
          this.languageService.transalte('costCenter.AddedSuccessfully')
        );
      },
    });
  }
  async deleteCostCenter(costId: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.accountproxy.deleteCostCenter(costId).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('costCenter.Success'),
            this.languageService.transalte('costCenter.CostCenterDeletedSuccessfully')
          );
          this.loaderService.hide();
          this.costCenterData.next(res);
          const currentCostCenter = this.parentAccountsostCenter.getValue();
          const updatedCostCenter = currentCostCenter.filter((c) => c.id !== costId);
          this.parentAccountsostCenter.next(updatedCostCenter);
        },
        error: () => {
          this.loaderService.hide();
          this.toasterService.showError(
            this.languageService.transalte('costCenter.Error'),
            this.languageService.transalte('costCenter.CannotDeleteCostCenter')
          );
        },
      });
    }
  }
  GetAllParentsCostCenters() {
    this.accountproxy.GetAllParentsCostCenters().subscribe((response) => {
      this.parentAccountsostCenter.next(response);
    });
  }
  getcostById(id: number) {
    this.accountproxy.getCostById(id).subscribe((response) => {
      this.costCenterById.next(response);
    });
  }
  editCost(cost: costById) {
    this.accountproxy.editCost(cost).subscribe((res) => {
      this.editCostCenter.next(res);
    });
  }
  getCostDetails(id: number) {
    this.accountproxy.GetCostCenterDetails(id).subscribe((response) => {
      this.costCenterDetails.next(response);
    });
  }
  getAllCostCenter(searchTerm: string, pageInfo: PageInfo) {
    this.accountproxy.getAllCostCenter(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.costCenterList.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  costCenterActivation(command: costCenterActivation) {
    this.accountproxy.costCenterActivation(command).subscribe((response) => {
      this.costCenterActivat.next(response);
    });
  }

  loadCountries() {
    this.accountproxy.getAllCountries().subscribe((response) => {
      this.countryDataSource.next(response);
    });
  }

  exportTaxGroupData(searchTerm: string | undefined) {
    this.accountproxy.exportTaxGroupData(searchTerm).subscribe({
      next: (res) => {
        this.exportsTaxGroupDataSource.next(res);
      },
    });
  }

  exportAccountsData(searchTerm: string | undefined) {
    this.accountproxy.exportAccountsData(searchTerm).subscribe({
      next: (res) => {
        this.exportsAccountsDataSource.next(res);
      },
    });
  }

  exportCostCentersData(searchTerm: string | undefined) {
    this.accountproxy.exportCostCentersData(searchTerm).subscribe({
      next: (res) => {
        this.exportsCostCentersDataSource.next(res);
      },
    });
  }

  exportTaxesData(searchTerm: string | undefined) {
    this.accountproxy.exportTaxesData(searchTerm).subscribe({
      next: (res) => {
        this.exportsTaxesDataSource.next(res);
      },
    });
  }

  constructor(
    private accountproxy: AccountProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private formsService: FormsService
  ) {}
}

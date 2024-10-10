import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  LoaderService,
  LanguageService,
  ToasterService,
  RouterService,
  PageInfo,
  PageInfoResult,
  FormsService,
  Modules,
} from 'shared-lib';
import {
  VendorCategoryDto,
  AddVendorCategory,
  EditVendorCategoryDto,
  vendorDefinitionDto,
  AddVendorCommand,
  CityDto,
  CountryDto,
  CurrencyDto,
  TagDropDownDto,
  CategoryDropdownDto,
  EditVendorCommand,
  GetVendorById,
  VendorOpeningBalanceListDto,
  JournalLineDropdownDto,
  DropDownDto,
  AddVendorOpeningBalanceDto,
  GetVendorOpeningBalanceViewDto,
} from './models';
import { PurchaseProxyService } from './purchase-proxy.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private toasterService: ToasterService,
    private routerService: RouterService,
    private purchaseProxy: PurchaseProxyService,
    private formsService: FormsService
  ) {}
  private vendorCategoryDataSource = new BehaviorSubject<VendorCategoryDto[]>([]);
  private addVendorCategoryData = new BehaviorSubject<AddVendorCategory>({} as AddVendorCategory);
  private sendgetVendorCategoryDropdownData = new BehaviorSubject<CategoryDropdownDto[]>([]);
  private vendorCategoryDataByID = new BehaviorSubject<EditVendorCategoryDto>(
    {} as EditVendorCategoryDto
  );
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  private sendChildrenAccountsDropDownData = new BehaviorSubject<any>([]);
  private sendPriceListsDropDownData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  private sendPaymentTermsDropDownData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  public vendorDefinitionDataByID = new BehaviorSubject<GetVendorById | undefined>({} as GetVendorById | undefined);
  private vendorDefinitionDataSource = new BehaviorSubject<vendorDefinitionDto[]>([]);
  private vendorOpeningBalanceDataSource = new BehaviorSubject<VendorOpeningBalanceListDto[]>([]);
  public vendorOpeningBalnceDataByID = new BehaviorSubject<AddVendorOpeningBalanceDto | undefined>({} as AddVendorOpeningBalanceDto | undefined);


  public addVendorCategoryDataObservable = this.addVendorCategoryData.asObservable();
  public vendorCategoryDataSourceObservable = this.vendorCategoryDataSource.asObservable();
  public sendgetVendorCategoryDropdownDataObservable =
    this.sendgetVendorCategoryDropdownData.asObservable();
  public vendorCategoryDataByIDObservable = this.vendorCategoryDataByID.asObservable();
  public vendorDefinitionDataByIDObservable = this.vendorDefinitionDataByID.asObservable();
  public vendorOpeningBalnceDataByIDObservable = this.vendorOpeningBalnceDataByID.asObservable();

  private tagsDataSource = new BehaviorSubject<TagDropDownDto[]>([]);

  private countryDataSource = new BehaviorSubject<CountryDto[]>([]);
  private cityDataSource = new BehaviorSubject<CityDto[]>([]);
  private currenciesDataSource = new BehaviorSubject<CurrencyDto[]>([]);

  public vendorDefinitionDataSourceObservable = this.vendorDefinitionDataSource.asObservable();
  public vendorOpeningBalanceDataSourceObservable = this.vendorOpeningBalanceDataSource.asObservable();


  public sendChildrenAccountsDropDownDataObservable =
    this.sendChildrenAccountsDropDownData.asObservable();
  public sendPriceListsDropDownDataObservable = this.sendPriceListsDropDownData.asObservable();
  public sendPaymentTermsDropDownDataObservable = this.sendPaymentTermsDropDownData.asObservable();
  public currencies = this.currenciesDataSource.asObservable();

  public cities = this.cityDataSource.asObservable();

  public countries = this.countryDataSource.asObservable();
  public tags = this.tagsDataSource.asObservable();

  private exportsVendorCateogiesDataSource = new BehaviorSubject<VendorCategoryDto[]>([]);
  public exportsVendorCateogiesDataSourceObservable = this.exportsVendorCateogiesDataSource.asObservable();

  private exportsVendorsDataSource = new BehaviorSubject<vendorDefinitionDto[]>([]);
  public exportsVendorsDataSourceObservable = this.exportsVendorsDataSource.asObservable();

  private openingBalanceJournalEntryDropdownData = new BehaviorSubject<DropDownDto[]>([]);
  public openingBalanceJournalEntryDropdownDataObservable =this.openingBalanceJournalEntryDropdownData.asObservable();

  public JournalLinesDropDownData = new BehaviorSubject<JournalLineDropdownDto[]>([]);
  public JournalLinesDropDownDataObservable =this.JournalLinesDropDownData.asObservable();
  
  public VendorDropDownByAccountId = new BehaviorSubject<DropDownDto[]>([]);
  public VendorDropDownByAccountIdObservable =this.VendorDropDownByAccountId.asObservable();
  
  private vendorDeleted = new BehaviorSubject<boolean>(false);
  public vendorDeletedObser = this.vendorDeleted.asObservable();

  private VendorOpeningBalanceView = new BehaviorSubject<GetVendorOpeningBalanceViewDto | undefined>(undefined);
  public VendorOpeningBalanceViewObservable = this.VendorOpeningBalanceView.asObservable();



  


  getVendorCategory(searchTerm: string, pageInfo: PageInfo) {
    this.purchaseProxy.getVendorCategory(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.vendorCategoryDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getVendorCategoryByID(id: number) {
    this.purchaseProxy.getVendorCategoryByID(id).subscribe((res) => {
      this.vendorCategoryDataByID.next(res);
    });
  }

  addVendorCategory(addvendorCategory: AddVendorCategory) {
    this.purchaseProxy.addvendorCategory(addvendorCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('VendorCategory.success'),
          this.languageService.transalte('VendorCategory.successAdd')
        );
        if (res) {
          this.addVendorCategoryData.next(res);
        }
      },
    });
  }

  EditVendorCategory(editvendorCategory: EditVendorCategoryDto) {
    this.purchaseProxy.EditVendorCategory(editvendorCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('VendorCategory.success'),
          this.languageService.transalte('VendorCategory.successEdit')
        );
        if (res) this.routerService.navigateTo('/masterdata/vendor-category');
      },
    });
  }

  async deleteVendorCategory(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.purchaseProxy.deleteVendorCategory(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('deleteVendorCategory.success'),
            this.languageService.transalte('deleteVendorCategory.delete')
          );
          let data = this.vendorCategoryDataSource.getValue();
          const updatedVendor = data.filter((elem) => elem.id !== id);
          this.vendorCategoryDataSource.next(updatedVendor);

          return res;
        },
        error: (err) => {},
      });
    }
  }

  // vendor
  getVendorDefinition(searchTerm: string, pageInfo: PageInfo) {
    this.purchaseProxy.getVendorDefinition(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.vendorDefinitionDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  async deletevendorDefinition(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.purchaseProxy.deleteVendorDefinition(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('deleteVendorDefinition.success'),
            this.languageService.transalte('deleteVendorDefinition.delete')
          );
          let data = this.vendorDefinitionDataSource.getValue();
          const updatedVendor = data.filter((elem) => elem.id !== id);
          this.vendorDefinitionDataSource.next(updatedVendor);

          return res;
        },
      });
    }
  }
  getVendorCategoryDropdown() {
    this.purchaseProxy.getVendorCategoryDropdown().subscribe((res) => {
      if (res) {
        this.sendgetVendorCategoryDropdownData.next(res);
      }
    });
  }

  addNewVendorDefinition(vendor: AddVendorCommand, vendorForm: FormGroup) {
    this.loaderService.show();
    this.purchaseProxy.addNewVendorDefinition(vendor).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('VendorDefinition.success'),
          this.languageService.transalte('VendorDefinition.successAdd')
        );
        this.routerService.navigateTo(`/masterdata/vendor-definitions`);
        // this.addVendorCategoryRes.next(res)
        this.loaderService.hide();
      },
      error: (err) => {
        this.formsService.setFormValidationErrors(vendorForm, err);
        this.loaderService.hide();
      },
    });
  }

  editVendorDefinition(vendor: EditVendorCommand, vendorForm: FormGroup) {
    this.loaderService.show();
    this.purchaseProxy.editVendorDefinition(vendor).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('VendorDefinition.success'),
          this.languageService.transalte('VendorDefinition.successEdit')
        );
        // this.addVendorCategoryRes.next(res)
        this.routerService.navigateTo(`/masterdata/vendor-definitions`);
        this.loaderService.hide();
      },
      error: (err) => {
        this.formsService.setFormValidationErrors(vendorForm, err);
        this.loaderService.hide();
      },
    });
  }

  getVendorDefinitionByID(id: number) {
    this.purchaseProxy.getVendorDefinitionByID(id).subscribe((res) => {
      this.vendorDefinitionDataByID.next(res);
    });
  }

  //

  getChildrenAccountsDropDown() {
    this.purchaseProxy.getChildrenAccountsDropDown().subscribe((res) => {
      if (res) {
        this.sendChildrenAccountsDropDownData.next(res);
      }
    });
  }
  getpriceListDropDown() {
    this.purchaseProxy.getpriceListDropDown().subscribe((res) => {
      if (res) {
        this.sendPriceListsDropDownData.next(res);
      }
    });
  }
  getpaymentTermsListDropDown() {
    this.purchaseProxy.getpaymentTermsListDropDown().subscribe((res) => {
      if (res) {
        this.sendPaymentTermsDropDownData.next(res);
      }
    });
  }

  loadCountries() {
    this.purchaseProxy.getAllCountries().subscribe((response) => {
      this.countryDataSource.next(response);
    });
  }
  loadCities(countryCode: string) {
    this.purchaseProxy.getCities(countryCode).subscribe((response) => {
      this.cityDataSource.next(response);
    });
  }
  getCurrencies(searchKey: string) {
    this.purchaseProxy.getCurrencies(searchKey).subscribe((res) => {
      this.currenciesDataSource.next(res);
    });
  }

  getTags(moduleId:Modules) {
    this.purchaseProxy.getTags(moduleId).subscribe((response) => {
      this.tagsDataSource.next(response);
    });
  }
  exportVendorCategoriesData(searchTerm:string | undefined) {
    this.purchaseProxy.exportVendorCategoriesData(searchTerm).subscribe({
      next: (res) => {
         this.exportsVendorCateogiesDataSource.next(res);
      },
    });
  }
  exportVendorsData(searchTerm:string | undefined) {
    this.purchaseProxy.exportVendorsData(searchTerm).subscribe({
      next: (res) => {
         this.exportsVendorsDataSource.next(res);
      },
    });
  }
  getAllVendorOpeningBalance(searchTerm: string, pageInfo: PageInfo) {
    this.purchaseProxy.getAllVendorOpeningBalance(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.vendorOpeningBalanceDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  openingBalanceJournalEntryDropdown() {
    this.purchaseProxy.openingBalanceJournalEntryDropdown().subscribe((res) => {
      if (res) {
        this.openingBalanceJournalEntryDropdownData.next(res);
      }
    });
  }
  getLinesDropDown(id: number) {
    this.purchaseProxy.GetLinesDropDown(id).subscribe((res) => {
      if (res) {
        this.JournalLinesDropDownData.next(res);
      }
    });
  }
  getVendorDropDownByAccountId(id: number) {
    this.purchaseProxy.VendorDropDownByAccountId(id).subscribe((res) => {
      if (res) {
        this.VendorDropDownByAccountId.next(res);
      }
    });
  }
  AddVendorOpeningBalance(vendor: any) {
    this.loaderService.show();
    this.purchaseProxy.addVendorOpeningBalance(vendor).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addCustomerDefinition.success'),
          this.languageService.transalte('openeingBalance.VendorAdded')
        );
        if (res) {
          this.loaderService.hide();
          this.routerService.navigateTo('/masterdata/vendor-opening-balance');
        }
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  EditVendorOpeningBalance(vendor: any) {
    this.purchaseProxy.editVendorrOpeningBalance(vendor).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('VendorOpeningBalance.VendorUpdated')
        );
        if (res) {
          this.routerService.navigateTo('/masterdata/vendor-opening-balance');
        }
      },
    });
  }

  async deletevendorOpeningBalance(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.loaderService.show();

      this.purchaseProxy.deleteVendorOpeningBalance(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Success'),
            this.languageService.transalte('VendorOpeningBalance.VendorDeleted')
          );
          this.loaderService.hide();
          this.vendorDeleted.next(res);
        },
        error: () => {
          this.loaderService.hide();
          this.toasterService.showError(
            this.languageService.transalte('Error'),
            this.languageService.transalte('DeleteError')
          );
        },
      });
    }
  }
  getVendorOpeningBalanceByID(id: number) {
    this.purchaseProxy.getVendorOpeningBalanceByID(id).subscribe((res) => {
      this.vendorOpeningBalnceDataByID.next(res);
    });
  }
  getVendorOpeningBalanceView(id: number) {
    this.purchaseProxy.GetVendorOpeningBalanceView(id).subscribe((res) => {
      if (res) {
        this.VendorOpeningBalanceView.next(res);
      }
    });
  }
}

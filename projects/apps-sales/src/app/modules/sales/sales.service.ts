import { Injectable } from '@angular/core';
import {
  LoaderService,
  LanguageService,
  ToasterService,
  RouterService,
  PageInfoResult,
  PageInfo,
  FormsService,
} from 'shared-lib';
import {
  AddCustomerCategoryDto,
  AddCustomerDefinitionDto,
  CityDto,
  CountryDto,
  CurrencyDto,
  CustomerCategoryDto,
  EditCustomerCategoryDto,
  EditCustomerDefintionsDto,
} from './models';
import { SalesProxyService } from './sales-proxy.service';
import { BehaviorSubject } from 'rxjs';
import { CategoryDropdownDto } from './models/CategoryDropdownDto';
import { TagDropDownDto } from 'projects/apps-accounting/src/app/modules/account/models/tagDropDownDto';
import { CustomerDefinitionDto } from './models/customerDefinitionDto';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private customerCategoryDataSource = new BehaviorSubject<CustomerCategoryDto[]>([]);
  private customerCategoryDataByID = new BehaviorSubject<EditCustomerCategoryDto>(
    {} as EditCustomerCategoryDto
  );
  private addCustomerCategoryData = new BehaviorSubject<AddCustomerCategoryDto>(
    {} as AddCustomerCategoryDto
  );
  private customerDefinitionDataSource = new BehaviorSubject<CustomerDefinitionDto[]>([]);
  private addCustomerDefinitionRes = new BehaviorSubject<AddCustomerDefinitionDto>(
    {} as AddCustomerDefinitionDto
  );
  private editCustomerDefinitionRes = new BehaviorSubject<EditCustomerDefintionsDto>(
    {} as EditCustomerDefintionsDto
  );
  public getCustomerDefinitionResByID = new BehaviorSubject<AddCustomerDefinitionDto>(
    {} as AddCustomerDefinitionDto
  );
  private sendChildrenAccountsDropDownData = new BehaviorSubject<any>([]);
  private sendPriceListsDropDownData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  private sendPaymentTermsDropDownData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  private sendgetVendorCategoryDropdownData = new BehaviorSubject<CategoryDropdownDto[]>([]);
  private openingBalanceJournalEntryDropdownData = new BehaviorSubject<CategoryDropdownDto[]>([]);
  private LinesDropDownData = new BehaviorSubject<any[]>([]);
  private CustomerDropDownByAccountId = new BehaviorSubject<any[]>([]);
  private CustomerOpeningBalancelist = new BehaviorSubject<any[]>([]);
  private countryDataSource = new BehaviorSubject<CountryDto[]>([]);
  private cityDataSource = new BehaviorSubject<CityDto[]>([]);
  private currenciesDataSource = new BehaviorSubject<CurrencyDto[]>([]);
  private tagsDataSource = new BehaviorSubject<TagDropDownDto[]>([]);
  private customerDeleted = new BehaviorSubject<boolean>(false);
  public customerDeletedObser = this.customerDeleted.asObservable();

  public customerCategoryDataSourceObservable = this.customerCategoryDataSource.asObservable();
  public customerCategoryDataByIDObservable = this.customerCategoryDataByID.asObservable();
  public addCustomerCategoryDataObservable = this.addCustomerCategoryData.asObservable();

  public customerDefinitionDataSourceObservable = this.customerDefinitionDataSource.asObservable();
  public customerDefinitionObservable = this.addCustomerDefinitionRes.asObservable();
  public editCustomerDefinitionResObservable = this.editCustomerDefinitionRes.asObservable();
  public getCustomerDefinitionResByIDObservable = this.getCustomerDefinitionResByID.asObservable();

  public sendChildrenAccountsDropDownDataObservable =
    this.sendChildrenAccountsDropDownData.asObservable();
  public sendPriceListsDropDownDataObservable = this.sendPriceListsDropDownData.asObservable();
  public sendPaymentTermsDropDownDataObservable = this.sendPaymentTermsDropDownData.asObservable();
  public sendgetVendorCategoryDropdownDataObservable =
    this.sendgetVendorCategoryDropdownData.asObservable();
  public openingBalanceJournalEntryDropdownDataObservable =
    this.openingBalanceJournalEntryDropdownData.asObservable();
  public LinesDropDownDataObservable = this.LinesDropDownData.asObservable();
  public CustomerDropDownByAccountIdObservable = this.CustomerDropDownByAccountId.asObservable();
  public CustomerOpeningBalancelistObservable = this.CustomerOpeningBalancelist.asObservable();
  public currencies = this.currenciesDataSource.asObservable();

  public cities = this.cityDataSource.asObservable();

  public countries = this.countryDataSource.asObservable();
  public tags = this.tagsDataSource.asObservable();

  private exportsCustomerCateogiesDataSource = new BehaviorSubject<CustomerCategoryDto[]>([]);
  public exportsCustomerCateogiesDataSourceObservable = this.exportsCustomerCateogiesDataSource.asObservable();

  private exportsCustomersDataSource = new BehaviorSubject<CustomerDefinitionDto[]>([]);
  public exportsCustomersDataSourceObservable = this.exportsCustomersDataSource.asObservable();


  constructor(
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private toasterService: ToasterService,
    private routerService: RouterService,
    private salesProxy: SalesProxyService,
    private formsService: FormsService
  ) {}

  getcustomerCategory(searchTerm: string, pageInfo: PageInfo) {
    this.salesProxy.getcustomerCategory(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.customerCategoryDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getCustomerCategoryByID(id: number) {
    this.salesProxy.getCustomerCategoryByID(id).subscribe((res) => {
      if (res) {
        this.customerCategoryDataByID.next(res);
      }
    });
  }

  addCustomerCategory(addCustomerCategory: AddCustomerCategoryDto) {
    this.salesProxy.addCustomerCategory(addCustomerCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addCustomerCategory.success'),
          this.languageService.transalte('addCustomerCategory.successAdd')
        );
        if (res) {
          this.addCustomerCategoryData.next(res);
        }
      },
    });
  }

  EditCustomerCategory(editCustomerCategory: EditCustomerCategoryDto) {
    this.salesProxy.EditCustomerCategory(editCustomerCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addCustomerCategory.success'),
          this.languageService.transalte('addCustomerCategory.successEdit')
        );
        if (res) {
          this.routerService.navigateTo('/masterdata/customer-category');
        }
      },
    });
  }

  async deleteCustomerCategory(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.salesProxy.deleteCustomerCategory(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('deleteCustomerCategory.success'),
            this.languageService.transalte('deleteCustomerCategory.delete')
          );
          let data = this.customerCategoryDataSource.getValue();
          const updatedVendor = data.filter((elem) => elem.id !== id);
          this.customerCategoryDataSource.next(updatedVendor);

          return res;
        },
        error: (err) => {},
      });
    }
  }

  getChildrenAccountsDropDown() {
    this.salesProxy.getChildrenAccountsDropDown().subscribe((res) => {
      if (res) {
        this.sendChildrenAccountsDropDownData.next(res);
      }
    });
  }
  getpriceListDropDown() {
    this.salesProxy.getpriceListDropDown().subscribe((res) => {
      if (res) {
        this.sendPriceListsDropDownData.next(res);
      }
    });
  }
  getpaymentTermsListDropDown() {
    this.salesProxy.getpaymentTermsListDropDown().subscribe((res) => {
      if (res) {
        this.sendPaymentTermsDropDownData.next(res);
      }
    });
  }

  getCustomerCategoryDropdown() {
    this.salesProxy.getCustomerCategoryDropdown().subscribe((res) => {
      if (res) {
        this.sendgetVendorCategoryDropdownData.next(res);
      }
    });
  }

  loadCountries() {
    this.salesProxy.getAllCountries().subscribe((response) => {
      this.countryDataSource.next(response);
    });
  }
  loadCities(countryCode: string) {
    this.salesProxy.getCities(countryCode).subscribe((response) => {
      this.cityDataSource.next(response);
    });
  }
  getCurrencies(searchKey: string) {
    this.salesProxy.getCurrencies(searchKey).subscribe((res) => {
      this.currenciesDataSource.next(res);
    });
  }

  getCustomerDefinitionByID(id: string) {
    this.salesProxy.getCustomerDefinitionByID(id).subscribe({
      next: (res) => {
        this.getCustomerDefinitionResByID.next(res);
      },
    });
  }

  editCustomerDefinition(customer: EditCustomerDefintionsDto, vendorForm: FormGroup) {
    this.salesProxy.editCustomerDefinition(customer).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addCustomerDefinition.success'),
          this.languageService.transalte('addCustomerDefinition.successEdit')
        );
        if (res) {
          this.editCustomerDefinitionRes.next(res);
        }
      },
      error: (err) => {
        this.formsService.setFormValidationErrors(vendorForm, err);
        this.loaderService.hide();
      },
    });
  }
  addNewCustomerDefinition(customer: AddCustomerDefinitionDto, vendorForm: FormGroup) {
    this.loaderService.show();
    this.salesProxy.addNewCustomerDefinition(customer).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addCustomerDefinition.success'),
          this.languageService.transalte('addCustomerDefinition.successAdd')
        );
        if (res) {
          this.addCustomerDefinitionRes.next(res);
          this.loaderService.hide();
          this.routerService.navigateTo('/masterdata/customer-definitions');
        }
      },
      error: (err) => {
        this.formsService.setFormValidationErrors(vendorForm, err);
        this.loaderService.hide();
      },
    });
  }

  getTags() {
    this.salesProxy.getTags().subscribe((response) => {
      this.tagsDataSource.next(response);
    });
  }

  getcustomerDefinition(searchTerm: string, pageInfo: PageInfo) {
    this.salesProxy.getcustomerDefinition(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.customerDefinitionDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  async deleteCustomerDefinition(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.salesProxy.deleteCustomerDefinition(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('deleteCustomerDefinition.success'),
            this.languageService.transalte('deleteCustomerDefinition.delete')
          );
          let data = this.customerDefinitionDataSource.getValue();
          const updatedVendor = data.filter((elem) => elem.id !== id);
          this.customerDefinitionDataSource.next(updatedVendor);

          return res;
        },
      });
    }
  }

  exportCustomerCategoriesData(searchTerm:string | undefined) {
    this.salesProxy.exportCustomerCategoriesData(searchTerm).subscribe({
      next: (res) => {
         this.exportsCustomerCateogiesDataSource.next(res);
      },
    });
  }
  exportCustomersData(searchTerm:string | undefined) {
    this.salesProxy.exportCustomersData(searchTerm).subscribe({
      next: (res) => {
         this.exportsCustomersDataSource.next(res);
      },
    });
  }
  openingBalanceJournalEntryDropdown() {
    this.salesProxy.openingBalanceJournalEntryDropdown().subscribe((res) => {
      if (res) {
        this.openingBalanceJournalEntryDropdownData.next(res);
      }
    });
  }
  getLinesDropDown(id:number){
    this.salesProxy.GetLinesDropDown(id).subscribe((res) => {
      if (res) {
        this.LinesDropDownData.next(res);
      }
    });
  }
  getCustomerDropDownByAccountId(id:number){
    this.salesProxy.CustomerDropDownByAccountId(id).subscribe((res) => {
      if (res) {
        this.CustomerDropDownByAccountId.next(res);
      }
    });
  }
  AddCustomerOpeningBalance(customer: any) {
    this.loaderService.show();
    this.salesProxy.AddCustomerOpeningBalance(customer).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addCustomerDefinition.success'),
          this.languageService.transalte('addCustomerDefinition.successAdded')
        );
        if (res) {
          this.addCustomerDefinitionRes.next(res);
          this.loaderService.hide();
         
        }
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  getCustomerOpeningBalance(){
    this.salesProxy.GetCustomerOpeningBalance().subscribe((res) => {
      if (res) {
        this.CustomerOpeningBalancelist.next(res);
      }
    });
  }
 
  async deleteCustomerOpeningBalance(id: number) {

    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.loaderService.show();

      this.salesProxy.deleteCustomerOpeningBalance(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('deleteCustomerDefinition.success'),
            this.languageService.transalte('deleteCustomerDefinition.deleted')
          );
          this.loaderService.hide();
          this.customerDeleted.next(res)
        },
        error: () => {
          this.loaderService.hide();
          this.toasterService.showError(
            this.languageService.transalte('Company.Error'),
            this.languageService.transalte('DeleteError')
         );
        },
      });
    }
  }

}

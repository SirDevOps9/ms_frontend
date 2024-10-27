import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import {
  FormsService,
  LanguageService,
  LoaderService,
  PageInfo,
  PageInfoResult,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { GeneralSettingProxy } from './general-setting.proxy';

import {
  TagDto,
  AddTagDto,
  financialCalendar,
  AddFinancialCalendar,
  VendorCategoryDto,
  AddVendorCategory,
  EditVendorCategoryDto,
  CustomerCategoryDto,
  vendorDefinitionDto,
  editFinancialCalndar,
  CurrencyDefinitionDto,
  CurrencyConversionDto,
  ExportCurrencyConversionDto,
  ExportTagDto,
  GetLastYearInfoDto,
  AccountDto,
  SubdomainModuleDto,
} from './models';

import { AddCustomerCategoryDto } from './models/addCustomerCategoryDto';
import { AddVendorCommand } from './models/AddVendorCommand';
import { CategoryDropdownDto } from './models/CategoryDropdownDto';
import { CityDto } from './models/CityDto';
import { CountryDto } from './models/CountryDto';
import { CurrencyDto } from './models/CurrencyDto';
import { TagDropDownDto } from './models/TagDropDownDto';

import { EditVendorCommand } from './models/editVendorCommand';
import { GetVendorById } from './models/getVendorById';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCurrencyDefinitionComponent } from './components/currencyDefinition/add-currency-definition/add-currency-definition.component';
import { EditCurrencyDefinitionComponent } from './components/currencyDefinition/edit-currency-definition/edit-currency-definition.component';
import { AddCurrencyConversionComponent } from './components/currencyConversion/add-currency-conversion/add-currency-conversion.component';
import { EditCurrencyConversionComponent } from './components/currencyConversion/edit-currency-conversion/edit-currency-conversion.component';

import { FormGroup } from '@angular/forms';
import { TaxGroupDto } from './models/tax-group-dto';
import { ExportTaxDto } from './models/export-tax-dto';
import { TaxGroupDropDown } from './models/tax-group-drop-down';
import { AddTaxGroupDto } from './models/add-tax-group-dto';
import { AddTax } from './models/add-tax';
import { TaxDto } from './models/tax-dto';
import { EditTax } from './models/edit-tax';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingService {
  private tagDataSource = new BehaviorSubject<TagDto[]>([]);
  private exportsCurrencyListDataSource = new BehaviorSubject<ExportCurrencyConversionDto[]>([]);
  private exportcurrencyDefinitionDataSource = new BehaviorSubject<CurrencyDefinitionDto[]>([]);
  private exportsFinancialCalendarDataSource = new BehaviorSubject<financialCalendar[]>([]);
  private exportsTagDataSource = new BehaviorSubject<ExportTagDto[]>([]);
  private subdomainModuleDataSource = new BehaviorSubject<SubdomainModuleDto[]>([]);


  public exportsFinancialCalendarDataSourceObservable =
    this.exportsFinancialCalendarDataSource.asObservable();

  public exportsTagDataSourceObservable = this.exportsTagDataSource.asObservable();
  public subdomainModuleDataSourceObservable = this.subdomainModuleDataSource.asObservable();


  private currencyDefinitionDataSource = new BehaviorSubject<CurrencyDefinitionDto[]>([]);
  private currencyConversionDataSource = new BehaviorSubject<CurrencyConversionDto[]>([]);
  private financialCalendarDataSource = new BehaviorSubject<financialCalendar[]>([]);
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  private currentTagDataSource = new BehaviorSubject<TagDto>({} as TagDto);
  private addFinancialCalendarRes = new BehaviorSubject<AddFinancialCalendar | any>(null);
  private openFinancialCalendarRes = new BehaviorSubject<number[]>([]);
  private FinancialPeriodLastYearDate = new BehaviorSubject<GetLastYearInfoDto | undefined>(
    undefined
  );
  private FinancialPeriodDataByID = new BehaviorSubject<editFinancialCalndar>(
    {} as editFinancialCalndar
  );
  private EditFinancialPeriodData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  private vendorCategoryDataSource = new BehaviorSubject<VendorCategoryDto[]>([]);
  private addVendorCategoryData = new BehaviorSubject<AddVendorCategory>({} as AddVendorCategory);
  private sendChildrenAccountsDropDownData = new BehaviorSubject<any>([]);
  private sendPriceListsDropDownData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  private sendPaymentTermsDropDownData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  private sendgetVendorCategoryDropdownData = new BehaviorSubject<CategoryDropdownDto[]>([]);
  private vendorCategoryDataByID = new BehaviorSubject<EditVendorCategoryDto>(
    {} as EditVendorCategoryDto
  );

  public vendorDefinitionDataByID = new BehaviorSubject<GetVendorById | undefined>(
    {} as GetVendorById | undefined
  );

  private customerCategoryDataSource = new BehaviorSubject<CustomerCategoryDto[]>([]);
  private customerCategoryDataByID = new BehaviorSubject<EditVendorCategoryDto>(
    {} as EditVendorCategoryDto
  );
  private currencyDataByID = new BehaviorSubject<CurrencyDefinitionDto>(
    {} as CurrencyDefinitionDto
  );
  private currencyConversionDataByID = new BehaviorSubject<CurrencyConversionDto>(
    {} as CurrencyConversionDto
  );
  private addCustomerCategoryData = new BehaviorSubject<AddCustomerCategoryDto>(
    {} as AddCustomerCategoryDto
  );
  private customerDefinitionDataSource = new BehaviorSubject<CustomerCategoryDto[]>([]);
  private vendorDefinitionDataSource = new BehaviorSubject<vendorDefinitionDto[]>([]);
  private tagsDataSource = new BehaviorSubject<TagDropDownDto[]>([]);
  private countryDataSource = new BehaviorSubject<CountryDto[]>([]);
  private countryString = new BehaviorSubject<any>({});
  private cityDataSource = new BehaviorSubject<CityDto[]>([]);
  private currenciesDataSource = new BehaviorSubject<CurrencyDto[]>([]);

  public currencies = this.currenciesDataSource.asObservable();

  public cities = this.cityDataSource.asObservable();

  public countries = this.countryDataSource.asObservable();
  public countryString$ = this.countryString.asObservable();

  public tags = this.tagsDataSource.asObservable();
  public currentTag = this.currentTagDataSource.asObservable();
  public currencyDefinitionDataSourceObservable = this.currencyDefinitionDataSource.asObservable();
  public exportcurrencyDefinitionDataSourceObservable =
    this.exportcurrencyDefinitionDataSource.asObservable();
  public currencyConversionDataSourceObservable = this.currencyConversionDataSource.asObservable();
  public exportsCurrencyListDataSourceObservable =
    this.exportsCurrencyListDataSource.asObservable();
  public financialCalendarDataSourceObservable = this.financialCalendarDataSource.asObservable();
  public tagList = this.tagDataSource.asObservable();
  public addFinancialCalendarResObservable = this.addFinancialCalendarRes.asObservable();
  public openFinancialCalendarResObservable = this.openFinancialCalendarRes.asObservable();
  public FinancialPeriodLastYearDateObservable = this.FinancialPeriodLastYearDate.asObservable();
  public FinancialPeriodDataByIDObservable = this.FinancialPeriodDataByID.asObservable();
  public EditFinancialPeriodDataObservable = this.EditFinancialPeriodData.asObservable();

  public sendChildrenAccountsDropDownDataObservable =
    this.sendChildrenAccountsDropDownData.asObservable();
  public sendPriceListsDropDownDataObservable = this.sendPriceListsDropDownData.asObservable();
  public sendPaymentTermsDropDownDataObservable = this.sendPaymentTermsDropDownData.asObservable();

  public addVendorCategoryDataObservable = this.addVendorCategoryData.asObservable();
  public vendorCategoryDataSourceObservable = this.vendorCategoryDataSource.asObservable();
  public sendgetVendorCategoryDropdownDataObservable =
    this.sendgetVendorCategoryDropdownData.asObservable();
  public vendorCategoryDataByIDObservable = this.vendorCategoryDataByID.asObservable();
  public vendorDefinitionDataByIDObservable = this.vendorDefinitionDataByID.asObservable();

  public customerCategoryDataSourceObservable = this.customerCategoryDataSource.asObservable();
  public customerCategoryDataByIDObservable = this.customerCategoryDataByID.asObservable();
  public currencyDataByIDObservable = this.currencyDataByID.asObservable();
  public currencyConversionDataByIDObservable = this.currencyConversionDataByID.asObservable();
  public addCustomerCategoryDataObservable = this.addCustomerCategoryData.asObservable();

  public vendorDefinitionDataSourceObservable = this.vendorDefinitionDataSource.asObservable();

  private childrenAccountDataSource = new BehaviorSubject<AccountDto[]>([]);
  public childrenAccountList = this.childrenAccountDataSource.asObservable();
  public childrenAccountPageInfo = new BehaviorSubject<PageInfoResult>({});

  private taxGroupDataSource = new BehaviorSubject<TaxGroupDto[]>([]);
  private currentTaxGroupDataSource = new BehaviorSubject<TaxGroupDto>({} as TaxGroupDto);
  private exportsTaxGroupDataSource = new BehaviorSubject<TaxGroupDto[]>([]);
  public exportsTaxGroupDataSourceObservable = this.exportsTaxGroupDataSource.asObservable();
  private exportsTaxesDataSource = new BehaviorSubject<ExportTaxDto[]>([]);
  public exportsTaxesDataSourceObservable = this.exportsTaxesDataSource.asObservable();
  public taxGroupList = this.taxGroupDataSource.asObservable();
  public currentTaxGroup = this.currentTaxGroupDataSource.asObservable();
  public taxGroupsDropDown = new BehaviorSubject<TaxGroupDropDown[]>([]);
  private taxesDefinitionsDataSource = new BehaviorSubject<TaxDto[]>([]);
  public currentTaxDataSource = new BehaviorSubject<TaxDto>({} as TaxDto);
  public editTaxStatus = new BehaviorSubject<boolean>(false);
  public taxesDefintionList = this.taxesDefinitionsDataSource.asObservable();





  getTagList(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAllTagsPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.tagDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getfinancialCalendar(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAllfinancialCalendarPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.financialCalendarDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  getVendorCategory(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getVendorCategory(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.vendorCategoryDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getVendorCategoryByID(id: number) {
    this.GeneralSettingproxy.getVendorCategoryByID(id).subscribe((res) => {
      this.vendorCategoryDataByID.next(res);
    });
  }

  addVendorCategory(addvendorCategory: AddVendorCategory) {
    this.GeneralSettingproxy.addvendorCategory(addvendorCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('addVendorCategory.successAdd')
        );
        if (res) {
          this.addVendorCategoryData.next(res);
        }
      },
    });
  }

  EditVendorCategory(editvendorCategory: EditVendorCategoryDto) {
    this.GeneralSettingproxy.EditVendorCategory(editvendorCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('addVendorCategory.successEdit')
        );
        if (res) this.routerService.navigateTo('vendor-category');
      },
    });
  }

  async deleteVendorCategory(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.GeneralSettingproxy.deleteVendorCategory(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
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
    this.GeneralSettingproxy.getVendorDefinition(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.vendorDefinitionDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  async deletevendorDefinition(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.GeneralSettingproxy.deleteVendorDefinition(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
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
    this.GeneralSettingproxy.getVendorCategoryDropdown().subscribe((res) => {
      if (res) {
        this.sendgetVendorCategoryDropdownData.next(res);
      }
    });
  }

  addNewVendorDefinition(vendor: AddVendorCommand) {
    this.loaderService.show();
    this.GeneralSettingproxy.addNewVendorDefinition(vendor).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addFinancialCalendar.success'),
          this.languageService.transalte('addFinancialCalendar.openSuccess')
        );
        this.routerService.navigateTo(`/vendor-definitions`);
        // this.addVendorCategoryRes.next(res)
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  editVendorDefinition(vendor: EditVendorCommand) {
    this.loaderService.show();
    this.GeneralSettingproxy.editVendorDefinition(vendor).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('vendorDefinition.success'),
          this.languageService.transalte('vendorDefinition.vendorSuccess')
        );
        // this.addVendorCategoryRes.next(res)
        this.routerService.navigateTo(`/vendor-definitions`);
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  getVendorDefinitionByID(id: number) {
    this.GeneralSettingproxy.getVendorDefinitionByID(id).subscribe((res) => {
      this.vendorDefinitionDataByID.next(res);
    });
  }

  //

  addTag(addTagDto: AddTagDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.GeneralSettingproxy.addTag(addTagDto).subscribe({
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

  editTag(tagDto: TagDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.GeneralSettingproxy.editTag(tagDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.success'),
          this.languageService.transalte('tag.addtag.success')
        );
        this.loaderService.hide();
        dialogRef.close();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  addFinancialCalendar(addFinancialCalendar: AddFinancialCalendar) {
    this.loaderService.show();
    this.GeneralSettingproxy.addFinancialCalendar(addFinancialCalendar).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addFinancialCalendar.success'),
          this.languageService.transalte('addFinancialCalendar.successAdd')
        );
        this.addFinancialCalendarRes.next(res);
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  OpenFinancialCalendar(openList: {}) {
    this.loaderService.show();
    this.GeneralSettingproxy.openFinancialCalendar(openList).subscribe({
      next: (res) => {
        // this.toasterService.showSuccess(
        //   this.languageService.transalte('addFinancialCalendar.success'),
        //   this.languageService.transalte('addFinancialCalendar.openSuccess')
        // );
        this.openFinancialCalendarRes.next(res);
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  GetFinancialPeriodLastYearDate() {
    this.GeneralSettingproxy.GetFinancialPeriodLastYearDate().subscribe((res) => {
      if (res) {
        this.FinancialPeriodLastYearDate.next(res);
      }
    });
  }

  editFinancialPeriod({ id, name }: { id: number; name: string }) {
    this.GeneralSettingproxy.editFinancialPeriodLastYearDate({ id, name }).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addFinancialCalendar.success'),
          this.languageService.transalte('addFinancialCalendar.successEdit')
        );
        this.EditFinancialPeriodData.next(res);
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  GetFinancialPeriodByID(id: number) {
    this.GeneralSettingproxy.GetFinancialPeriodByID(id).subscribe((res) => {
      if (res) {
        this.FinancialPeriodDataByID.next(res);
      }
    });
  }

  getChildrenAccountsDropDown() {
    this.GeneralSettingproxy.getChildrenAccountsDropDown().subscribe((res) => {
      if (res) {
        this.sendChildrenAccountsDropDownData.next(res);
      }
    });
  }
  getpriceListDropDown() {
    this.GeneralSettingproxy.getpriceListDropDown().subscribe((res) => {
      if (res) {
        this.sendPriceListsDropDownData.next(res);
      }
    });
  }
  getpaymentTermsListDropDown() {
    this.GeneralSettingproxy.getpaymentTermsListDropDown().subscribe((res) => {
      if (res) {
        this.sendPaymentTermsDropDownData.next(res);
      }
    });
  }

  getTagById(id: number) {
    this.GeneralSettingproxy.getTagById(id).subscribe((response) => {
      this.currentTagDataSource.next(response);
    });
  }

  async deleteTag(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.loaderService.show();
      this.GeneralSettingproxy.deleteTag(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('tag.success'),
            this.languageService.transalte('tag.success')
          );
          this.getTagList('', new PageInfo());

          this.loaderService.hide();

          return res;
        },
        error: (err) => {
          this.loaderService.hide();
        },
      });
    }
  }

  async activate(id: number) {
    const confirmed = await this.toasterService.showConfirm('Activate');
    if (confirmed) {
      this.GeneralSettingproxy.activateTag(id).subscribe({
        next: () => {
          const tagToChange = this.tagDataSource.value.find((item) => item.id === id);
          if (tagToChange) {
            tagToChange.isActive = true;
            this.tagDataSource.next([...this.tagDataSource.value]);
          }
          this.toasterService.showSuccess(
            this.languageService.transalte('tag.success'),
            this.languageService.transalte('tag.success')
          );
        },
      });
    } else {
      this.tagDataSource.value.find((item) => {
        if (item.id === id) {
          item.isActive = false;
        }
      });
    }
  }
  async deactivate(id: number) {
    const confirmed = await this.toasterService.showConfirm('Deactivate');
    if (confirmed) {
      this.GeneralSettingproxy.deactivateTag(id).subscribe({
        next: () => {
          const tagToChange = this.tagDataSource.value.find((item) => item.id === id);
          if (tagToChange) {
            tagToChange.isActive = false;
            this.tagDataSource.next([...this.tagDataSource.value]);
          }
          this.toasterService.showSuccess(
            this.languageService.transalte('tag.success'),
            this.languageService.transalte('tag.success')
          );
        },
      });
    } else {
      this.tagDataSource.value.find((item) => {
        if (item.id === id) {
          item.isActive = true;
        }
      });
    }
  }
  getTags() {
    this.GeneralSettingproxy.getTags().subscribe((response) => {
      this.tagsDataSource.next(response);
    });
  }
  loadCountries() {
    this.GeneralSettingproxy.getAllCountries().subscribe((response) => {
      this.countryDataSource.next(response);
    });
  }
  getCountry() {
    this.GeneralSettingproxy.getCountry().subscribe((response) => {
      this.countryString.next(response);
    });
  }
  loadCities(countryCode: string) {
    this.GeneralSettingproxy.getCities(countryCode).subscribe((response) => {
      this.cityDataSource.next(response);
    });
  }
  getCurrencies(searchKey: string) {
    this.GeneralSettingproxy.getCurrencies(searchKey).subscribe((res) => {
      this.currenciesDataSource.next(res);
    });
  }

  openCurrencyAdded() {
    const ref: DynamicDialogRef = this.dialog.open(AddCurrencyDefinitionComponent, {
      width: '600px',
      height: '700px',
    });
    ref.onClose.subscribe((result: any) => {});
  }

  openCurrencyEdit(currencyId: number) {
    const ref: DynamicDialogRef = this.dialog.open(EditCurrencyDefinitionComponent, {
      width: '600px',
      height: '600px',
      data: { Id: currencyId },
    });
    ref.onClose.subscribe((result: CurrencyDefinitionDto) => {});
  }
  getCurrencyList(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAllCurrencyPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.currencyDefinitionDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  addCurrency(currency: CurrencyDefinitionDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.GeneralSettingproxy.addCurrency(currency).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('currencyDefinition.success'),
          this.languageService.transalte('currencyDefinition.successAdd')
        );
        this.loaderService.hide();
        dialogRef.close(res);
        this.getCurrencyList('', new PageInfo());
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  async deleteCurrency(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.GeneralSettingproxy.deleteCurrency(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('currencyDefinition.success'),
            this.languageService.transalte('currencyDefinition.successDelet')
          );
          this.getCurrencyList('', new PageInfo());

          return res;
        },
        error: (err) => {
          this.toasterService.showError(
            this.languageService.transalte('currencyDefinition.error'),
            this.languageService.transalte('currencyDefinition.errorDelet')
          );
        },
      });
    }
  }

  EditCurrency(currency: CurrencyDefinitionDto, dialogRef: DynamicDialogRef) {
    this.GeneralSettingproxy.EditCurrency(currency).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('currencyDefinition.success'),
          this.languageService.transalte('currencyDefinition.successEdit')
        );
        this.loaderService.hide();
        dialogRef.close(res);
        this.getCurrencyList('', new PageInfo());
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  getCurrencyById(id: number) {
    this.GeneralSettingproxy.getCurrencyById(id).subscribe((res) => {
      if (res) {
        this.currencyDataByID.next(res);
      }
    });
  }
  getCurrencyConversionList(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAllCurrencyConversionPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.currencyConversionDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  addCurrencyConversion(currency: CurrencyConversionDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.GeneralSettingproxy.addCurrencyConversion(currency).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('currencyConversion.success'),
          this.languageService.transalte('currencyConversion.successAdd')
        );
        this.loaderService.hide();
        dialogRef.close(res);
        this.getCurrencyConversionList('', new PageInfo());
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  async deleteCurrencyConversion(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.GeneralSettingproxy.deleteCurrencyConversion(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('currencyConversion.success'),
            this.languageService.transalte('currencyConversion.successDelet')
          );
          this.getCurrencyConversionList('', new PageInfo());

          return res;
        },
        error: (err) => {
          this.toasterService.showError(
            this.languageService.transalte('currencyConversion.error'),
            this.languageService.transalte('currencyConversion.errorDelet')
          );
        },
      });
    }
  }

  EditCurrencyConversion(currency: CurrencyConversionDto, dialogRef: DynamicDialogRef) {
    this.GeneralSettingproxy.EditCurrencyConversion(currency).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('currencyConversion.success'),
          this.languageService.transalte('currencyConversion.successEdit')
        );
        this.loaderService.hide();
        dialogRef.close(res);
        this.getCurrencyConversionList('', new PageInfo());
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  getCurrencyConversionById(id: number) {
    this.GeneralSettingproxy.getCurrencyByIdConversion(id).subscribe((res) => {
      if (res) {
        this.currencyConversionDataByID.next(res);
      }
    });
  }
  openCurrencyConversionAdded() {
    const ref: DynamicDialogRef = this.dialog.open(AddCurrencyConversionComponent, {
      header: this.languageService.transalte('currencyConversion.AddNewcurrency'),
      width: '600px',
      height: '600px',
    });
    ref.onClose.subscribe((result: any) => {});
  }

  openCurrencyConversionEdit(currencyId: number) {
    const ref: DynamicDialogRef = this.dialog.open(EditCurrencyConversionComponent, {
      header: this.languageService.transalte('currencyConversion.Editcurrency'),
      width: '600px',
      height: '600px',
      data: { Id: currencyId },
    });
    ref.onClose.subscribe((result: CurrencyDefinitionDto) => {});
  }
  exportcurrencyData(searchTerm?: string ,SortBy?:number,SortColumn?:string) {
    this.GeneralSettingproxy.exportcurrencyData(searchTerm,SortBy,SortColumn).subscribe({
      next: (res) => {
        this.exportsCurrencyListDataSource.next(res);
      },
    });
  }
  exportcurrencyDefinitionData(searchTerm: string | undefined) {
    this.GeneralSettingproxy.exportcurrencyDefinitionData(searchTerm).subscribe({
      next: (res) => {
        this.exportcurrencyDefinitionDataSource.next(res);
      },
    });
  }
  exportFinancialCalendarData(searchTerm: string | undefined) {
    this.GeneralSettingproxy.exportFinancialCalendarData(searchTerm).subscribe({
      next: (res) => {
        this.exportsFinancialCalendarDataSource.next(res);
      },
    });
  }

  exportTagData(searchTerm?: string ,SortBy?:number,SortColumn?:string) {
    this.GeneralSettingproxy.exportTagData(searchTerm,SortBy,SortColumn).subscribe({
      next: (res) => {
        this.exportsTagDataSource.next(res);
      },
    });
  }

  getAccountChildrenList(quieries: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAccountsHasNoChildren(quieries, pageInfo).subscribe((res) => {
      this.childrenAccountDataSource.next(res.result);
      this.childrenAccountPageInfo.next(res.pageInfoResult);
    });
  }
  getUserSubDomainModules() {
    this.GeneralSettingproxy.getUserSubDomainModules().subscribe({
      next: (res) => {
        this.subdomainModuleDataSource.next(res);
      },
    });
  }

  getAllTaxGroupPaginated(searchTerm: string, pageInfo: PageInfo) {
    return this.GeneralSettingproxy.getAllTaxGroup(searchTerm, pageInfo).subscribe((response) => {
      this.taxGroupDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }

  addTaxGroup(addTaxGroupDto: AddTaxGroupDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.GeneralSettingproxy.addTaxGroup(addTaxGroupDto).subscribe({
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
    this.GeneralSettingproxy.editTaxGroup(TaxGroupDto).subscribe({
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
    this.GeneralSettingproxy.getTaxGroupById(id).subscribe((response) => {
      this.currentTaxGroupDataSource.next(response);
    });
  }

  getAllTaxes(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAllTaxes(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.taxesDefinitionsDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getTaxById(id: number) {
    this.GeneralSettingproxy.getTaxById(id).subscribe((response) => {
      this.currentTaxDataSource.next(response);
    });
  }

  addTax(model: AddTax, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.GeneralSettingproxy.addTax(model).subscribe({
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

  editTax(model: EditTax, dialogRef: DynamicDialogRef) {
    this.loaderService.show();

    this.GeneralSettingproxy.editTax(model).subscribe({
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
  getAllTaxGroups() {
    this.GeneralSettingproxy.getAllTaxGroups().subscribe({
      next: (res) => {
        this.taxGroupsDropDown.next(res);
      },
    });
  }
  exportTaxGroupData(searchTerm: string | undefined) {
    this.GeneralSettingproxy.exportTaxGroupData(searchTerm).subscribe({
      next: (res) => {
        this.exportsTaxGroupDataSource.next(res);
      },
    });
  }

  exportTaxesData(searchTerm?: string ,SortBy?:number,SortColumn?:string) {
    this.GeneralSettingproxy.exportTaxesData(searchTerm,SortBy,SortColumn).subscribe({
      next: (res) => {
        this.exportsTaxesDataSource.next(res);
      },
    });
  }
  async deleteTax(taxId: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.GeneralSettingproxy.deleteTax(taxId).subscribe({
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
  async deleteTaxGroup(id: number): Promise<boolean> {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    const p = new Promise<boolean>((res, rej) => {
      if (confirmed) {
        this.GeneralSettingproxy.deleteTaxGroup(id).subscribe({
          next: (status) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('TaxGroup.Success'),
              this.languageService.transalte('TaxGroup.DeletedSuccessfully')
            );
            this.loaderService.hide();
            res(true);
          },
          error: () => {
            this.loaderService.hide();
            this.toasterService.showError(
              this.languageService.transalte('Tax.Error'),
              this.languageService.transalte('TaxGroup.CannotDeleteTaxGroupUsedInTransactions')
            );
          },
        });
      } else {
        res(false);
      }
    });
    return await p;
  }
  getAccountsHasNoChildren(quieries: string, pageInfo: PageInfo) {
    return this.GeneralSettingproxy.getAccountsHasNoChildren(quieries, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  
  getAccountsChildrenDropDown() {
    return this.GeneralSettingproxy.getAccountsChildrenDropDown().pipe(
      map((res) => {
        return res;
      })
    );
  }

  constructor(
    private GeneralSettingproxy: GeneralSettingProxy,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private toasterService: ToasterService,
    private routerService: RouterService,
    private dialog: DialogService,
    private formsService: FormsService
  ) {}
}

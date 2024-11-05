import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
// import { TagDto ,AddTagDto, financialCalendar, AddFinancialCalendar, editFinancialCalndar, VendorCategoryDto, AddVendorCategory, EditVendorCategoryDto, CustomerCategoryDto, EditCustomerCategoryDto, vendorDefinitionDto } from './models';
import {
  TagDto,
  AddTagDto,
  financialCalendar,
  AddFinancialCalendar,
  editFinancialCalndar,
  VendorCategoryDto,
  AddVendorCategory,
  EditVendorCategoryDto,
  CustomerCategoryDto,
  EditCustomerCategoryDto,
  vendorDefinitionDto,
  AddCustomerDefinitionDto,
  EditCustomerDefintionsDto,
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
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { TaxGroupDto } from './models/tax-group-dto';
import { AddTaxGroupDto } from './models/add-tax-group-dto';
import { TaxDto } from './models/tax-dto';
import { AddTax } from './models/add-tax';
import { EditTax } from './models/edit-tax';
import { ExportTaxDto } from './models/export-tax-dto';
import { TaxGroupDropDown } from './models/tax-group-drop-down';
import { AccountsChildrenDropDown } from './models/accounts-children-dropdown-dto';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingProxy {
  getAllTagsPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TagDto>> {
    let query = `Tag?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchKey=${encodeURIComponent(searchTerm)}`;
    }

    return this.httpService.get<PaginationVm<TagDto>>(query);
  }
  getAllfinancialCalendarPaginated(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<financialCalendar>> {
    let query = `FinancialYear?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }

    return this.httpService.get<PaginationVm<financialCalendar>>(query);
  }
  getVendorCategory(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<VendorCategoryDto>> {
    const url = `VendorCategory?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<VendorCategoryDto>>(url);
  }

  addvendorCategory(addVendorCategoryDto: AddVendorCategory): Observable<AddVendorCategory> {
    return this.httpService.post<AddVendorCategory>(`VendorCategory`, addVendorCategoryDto);
  }

  EditVendorCategory(
    EditVendorCategoryDto: EditVendorCategoryDto
  ): Observable<EditVendorCategoryDto> {
    return this.httpService.put<EditVendorCategoryDto>(`VendorCategory`, EditVendorCategoryDto);
  }

  deleteVendorCategory(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`VendorCategory/${id}`);
  }

  getVendorCategoryByID(id: number): Observable<EditVendorCategoryDto> {
    const url = `VendorCategory/${id}`;
    return this.httpService.get(url);
  }

  getVendorDefinition(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<vendorDefinitionDto>> {
    const url = `vendor?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<vendorDefinitionDto>>(url);
  }

  deleteVendorDefinition(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`vendor/${id}`);
  }

  getChildrenAccountsDropDown() {
    return this.httpService.get('ChartOfAccounts/ChildrenAccountsDropDown');
  }
  getpriceListDropDown(): Observable<{ id: number; name: string }[]> {
    return this.httpService.get('PriceList/PriceListDropDown');
  }
  getpaymentTermsListDropDown(): Observable<{ id: number; name: string }[]> {
    return this.httpService.get('PaymentTerms/PaymentTermsDropdown');
  }
  addTag(addTagDto: AddTagDto): Observable<TagDto> {
    return this.httpService.post<TagDto>(`Tag`, addTagDto);
  }
  addFinancialCalendar(
    addFinancialCalendarDto: AddFinancialCalendar
  ): Observable<AddFinancialCalendar> {
    return this.httpService.post<AddFinancialCalendar>(`FinancialYear`, addFinancialCalendarDto);
  }
  openFinancialCalendar(openList: {}): Observable<number[]> {
    return this.httpService.post(`FinancialYear/openFinancialPeriod`, openList);
  }

  GetFinancialPeriodLastYearDate(): Observable<GetLastYearInfoDto> {
    return this.httpService.get('FinancialYear/GetLastYearDate');
  }
  editFinancialPeriodLastYearDate({ id, name }: { id: number; name: string }) {
    return this.httpService.put('FinancialYear', { id, name });
  }
  GetFinancialPeriodByID(id: number): Observable<editFinancialCalndar> {
    return this.httpService.get(`FinancialYear/${id}`);
  }

  editTag(tagDto: TagDto): Observable<boolean> {
    return this.httpService.put<boolean>(`Tag`, tagDto);
  }

  getTagById(id: number): Observable<TagDto> {
    return this.httpService.get<TagDto>(`Tag/GetById?Id=${id}`);
  }

  deleteTag(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`Tag?Id=${id}`);
  }

  activateTag(id: number): Observable<boolean> {
    return this.httpService.put<boolean>(`Tag/Activate?Id=${id}`, {});
  }

  deactivateTag(id: number): Observable<boolean> {
    return this.httpService.put<boolean>(`Tag/deactivate?Id=${id}`, {});
  }
  getTags(): Observable<TagDropDownDto[]> {
    return this.httpService.get<TagDropDownDto[]>(`Tag/Tagdropdown`);
  }
  getAllCountries(): Observable<CountryDto[]> {
    return this.httpService.get<CountryDto[]>(`Country`);
  }
  getCountry(): Observable<any> {
    return this.httpService.get<any>(`Company/GetCompanyCountry`);
  }
  getCities(countryCode: string): Observable<CityDto[]> {
    return this.httpService.get<CityDto[]>(`Country/GetCities?CountryCode=${countryCode}`);
  }
  getCurrencies(searchKey: string): Observable<CurrencyDto[]> {
    return this.httpService.get<CurrencyDto[]>('Currency/CurrencyDropDown?searchKey=' + searchKey);
  }
  getVendorCategoryDropdown(): Observable<CategoryDropdownDto[]> {
    return this.httpService.get<CategoryDropdownDto[]>('VendorCategory/VendorCategoryDropdown');
  }

  addNewVendorDefinition(vendor: AddVendorCommand): Observable<AddVendorCommand> {
    return this.httpService.post(`Vendor`, vendor);
  }

  getVendorById(id: number): Observable<any> {
    return this.httpService.get<any>(`Vendor/${id}`);
  }

  getVendorDefinitionByID(id: number): Observable<GetVendorById> {
    const url = `Vendor/${id}`;
    return this.httpService.get(url);
  }

  editVendorDefinition(vendor: EditVendorCommand): Observable<any> {
    return this.httpService.put(`Vendor`, vendor);
  }
  getAllCurrencyPaginated(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<CurrencyDefinitionDto>> {
    const queryParams = new URLSearchParams({
      SearchKey: searchTerm,
      PageNumber: pageInfo.pageNumber.toString(),
      PageSize: pageInfo.pageSize.toString(),
    });
    let query = `Currency?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchKey=${encodeURIComponent(searchTerm)}`;
    }

    return this.httpService.get<PaginationVm<CurrencyDefinitionDto>>(query);
  }
  addCurrency(currency: CurrencyDefinitionDto): Observable<CurrencyDefinitionDto> {
    return this.httpService.post<CurrencyDefinitionDto>(`Currency`, currency);
  }
  deleteCurrency(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`Currency/${id}`);
  }
  EditCurrency(Currency: CurrencyDefinitionDto): Observable<CurrencyDefinitionDto> {
    return this.httpService.put<CurrencyDefinitionDto>(`Currency`, Currency);
  }
  getCurrencyById(id: number): Observable<CurrencyDefinitionDto> {
    return this.httpService.get<CurrencyDefinitionDto>(`Currency/${id}`);
  }
  getAllCurrencyConversionPaginated(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<CurrencyConversionDto>> {
    const queryParams = new URLSearchParams({
      SearchKey: searchTerm,
      PageNumber: pageInfo.pageNumber.toString(),
      PageSize: pageInfo.pageSize.toString(),
    });
    let query = `CurrencyConversion?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }

    return this.httpService.get<PaginationVm<CurrencyConversionDto>>(query);
  }
  addCurrencyConversion(currency: CurrencyConversionDto): Observable<CurrencyConversionDto> {
    return this.httpService.post<CurrencyConversionDto>(`CurrencyConversion`, currency);
  }
  deleteCurrencyConversion(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`CurrencyConversion/${id}`);
  }
  EditCurrencyConversion(Currency: CurrencyConversionDto): Observable<CurrencyConversionDto> {
    return this.httpService.put<CurrencyConversionDto>(`CurrencyConversion`, Currency);
  }
  getCurrencyByIdConversion(id: number): Observable<CurrencyConversionDto> {
    return this.httpService.get<CurrencyConversionDto>(`CurrencyConversion/${id}`);
  }
  exportcurrencyData(searchTerm?: string ,SortBy?:number,SortColumn?:string): Observable<ExportCurrencyConversionDto[]> {
    let query = `CurrencyConversion/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<ExportCurrencyConversionDto[]>(query);
  }
  exportcurrencyDefinitionData(
    searchTerm: string | undefined
  ): Observable<CurrencyDefinitionDto[]> {
    let query = `Currency/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<CurrencyDefinitionDto[]>(query);
  }

  exportFinancialCalendarData(searchTerm: string | undefined): Observable<financialCalendar[]> {
    let query = `FinancialYear/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<financialCalendar[]>(query);
  }

  exportTagData(searchTerm?: string ,SortBy?:number,SortColumn?:string): Observable<ExportTagDto[]> {
    let query = `Tag/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`SearchKey=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<ExportTagDto[]>(query);
  }

  getAccountsHasNoChildren(
    quieries: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<AccountDto>> {
    return this.httpService.get<PaginationVm<AccountDto>>(
      `ChartOfAccounts/GetHasNoChildrenList?${pageInfo.toQuery}&${quieries ? quieries : ''}`
    );
  }
  getAllTaxGroup(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TaxGroupDto>> {
    let query = `TaxGroup?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchKey=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<TaxGroupDto>>(query);
  }
  addTaxGroup(taxgroupdto: AddTaxGroupDto): Observable<boolean> {
    return this.httpService.post<boolean>(`TaxGroup`, taxgroupdto);
  }

  editTaxGroup(taxgroupdto: TaxGroupDto): Observable<boolean> {
    return this.httpService.put<boolean>(`TaxGroup`, taxgroupdto);
  }
  getTaxGroupById(id: number): Observable<TaxGroupDto> {
    return this.httpService.get<TaxGroupDto>(`TaxGroup/GetById?Id=${id}`);
  }
  getAllTaxes(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TaxDto>> {
    let query = `Tax?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<TaxDto>>(query);
  }

  getTaxById(id: number): Observable<TaxDto> {
    return this.httpService.get<TaxDto>(`Tax/GetById?Id=${id}`);
  }

  addTax(command: AddTax): Observable<TaxDto> {
    return this.httpService.post('Tax', command);
  }

  editTax(command: EditTax): Observable<TaxDto> {
    return this.httpService.put('Tax', command);
  }

  exportTaxGroupData(searchTerm: string | undefined): Observable<TaxGroupDto[]> {
    let query = `TaxGroup/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<TaxGroupDto[]>(query);
  }

  exportTaxesData(searchTerm?: string ,SortBy?:number,SortColumn?:string ): Observable<ExportTaxDto[]> {
    let query = `Tax/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<ExportTaxDto[]>(query);
  }
  getAllTaxGroups(): Observable<TaxGroupDropDown[]> {
    return this.httpService.get<TaxGroupDropDown[]>(`TaxGroup/TaxGroupDropDown`);
  }
  deleteTax(id: number): Observable<number> {
    return this.httpService.delete<number>(`Tax?Id=${id}`);
  }
  deleteTaxGroup(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`TaxGroup?Id=${id}`);
  }

  getAccountsChildrenDropDown(): Observable<AccountsChildrenDropDown[]> {
    return this.httpService.get<AccountsChildrenDropDown[]>(
      `ChartOfAccounts/ChildrenAccountsDropDown`
    );
  }
  getUserSubDomainModules(): Observable<SubdomainModuleDto[]> {
    return this.httpService.get<SubdomainModuleDto[]>(`SideMenu/GetUserSubDomainModules`);
  }

  constructor(private httpService: HttpService) {}
}

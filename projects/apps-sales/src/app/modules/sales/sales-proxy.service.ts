import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import {
  AddCustomerCategoryDto,
  AddCustomerDefinitionDto,
  AddCustomerOpeningBalanceDto,
  CustomerCategoryDto,
  EditCustomerCategoryDto,
  EditCustomerDefintionsDto,
  EditCustomerOpeningBalanceDto,
  GetCustomerOpeningBalanceDto,
  GetCustomerOpeningBalanceViewDto,
} from './models';
import {
  CategoryDropdownDto,
  CityDto,
  CountryDto,
  CurrencyDto,
  TagDropDownDto,
} from '../general-setting/models';
import { CustomerDefinitionDto } from './models/customerDefinitionDto';
import { GetAllCustomerOpeningBalanceDto } from './models/get-all-customer-opening-balance-dto';

@Injectable({
  providedIn: 'root',
})
export class SalesProxyService {
  constructor(private httpService: HttpService) {}

  getcustomerCategory(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<CustomerCategoryDto>> {
    const url = `CustomerCategory?SearchKey=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<CustomerCategoryDto>>(url);
  }

  addCustomerCategory(
    addCustomerCategoryDto: AddCustomerCategoryDto
  ): Observable<AddCustomerCategoryDto> {
    return this.httpService.post<AddCustomerCategoryDto>(
      `CustomerCategory`,
      addCustomerCategoryDto
    );
  }

  EditCustomerCategory(
    EditCustomerCategoryDto: EditCustomerCategoryDto
  ): Observable<EditCustomerCategoryDto> {
    return this.httpService.put<EditCustomerCategoryDto>(
      `CustomerCategory`,
      EditCustomerCategoryDto
    );
  }
  deleteCustomerCategory(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`CustomerCategory/${id}`);
  }
  getCustomerCategoryByID(id: number): Observable<EditCustomerCategoryDto> {
    const url = `CustomerCategory/${id}`;
    return this.httpService.get(url);
  }

  // start customer definition
  getcustomerDefinition(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<CustomerDefinitionDto>> {
    const url = `Customer?SearchKey=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<CustomerDefinitionDto>>(url);
  }
  deleteCustomerDefinition(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`Customer/${id}`);
  }
  addNewCustomerDefinition(
    customer: AddCustomerDefinitionDto
  ): Observable<AddCustomerDefinitionDto> {
    return this.httpService.post(`Customer`, customer, false);
  }
  editCustomerDefinition(
    customer: EditCustomerDefintionsDto
  ): Observable<EditCustomerDefintionsDto> {
    return this.httpService.put(`Customer`, customer, false);
  }
  getCustomerDefinitionByID(id: string): Observable<AddCustomerDefinitionDto> {
    return this.httpService.get(`Customer/${id}`);
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
  getCustomerCategoryDropdown(): Observable<CategoryDropdownDto[]> {
    return this.httpService.get<CategoryDropdownDto[]>('CustomerCategory/CustomerCategoryDropdown');
  }

  getAllCountries(): Observable<CountryDto[]> {
    return this.httpService.get<CountryDto[]>(`Country`);
  }
  getCities(countryCode: string): Observable<CityDto[]> {
    return this.httpService.get<CityDto[]>(`Country/GetCities?CountryCode=${countryCode}`);
  }
  getCurrencies(searchKey: string): Observable<CurrencyDto[]> {
    return this.httpService.get<CurrencyDto[]>('Currency/CurrencyDropDown?searchTerm=' + searchKey);
  }

  getTags(): Observable<TagDropDownDto[]> {
    return this.httpService.get<TagDropDownDto[]>(`Tag/Tagdropdown`);
  }

  exportCustomerCategoriesData(searchTerm: string | undefined): Observable<CustomerCategoryDto[]> {
    let query = `CustomerCategory/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<CustomerCategoryDto[]>(query);
  }

  exportCustomersData(searchTerm: string | undefined): Observable<CustomerDefinitionDto[]> {
    let query = `Customer/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<CustomerDefinitionDto[]>(query);
  }
  openingBalanceJournalEntryDropdown(): Observable<CategoryDropdownDto[]> {
    return this.httpService.get<CategoryDropdownDto[]>('OpeningBalanceJournalEntry/GetDropDown');
  }
  GetLinesDropDown(id: number): Observable<any[]> {
    return this.httpService.get<any[]>(`OpeningBalanceJournalEntry/GetLinesDropDown/${id}`);
  }
  CustomerDropDownByAccountId(id: number): Observable<any[]> {
    return this.httpService.get<any[]>(`Customer/DropDownByAccountId/${id}`);
  }
  AddCustomerOpeningBalance(customer: AddCustomerOpeningBalanceDto): Observable<AddCustomerOpeningBalanceDto> {
    return this.httpService.post(`CustomerOpeningBalance`, customer);
  }
  editCustomerOpeningBalance(customer: EditCustomerOpeningBalanceDto): Observable<any> {
    return this.httpService.put(`CustomerOpeningBalance`, customer);
  }
  GetCustomerOpeningBalance(id: number): Observable<GetCustomerOpeningBalanceDto[]> {
    return this.httpService.get<GetCustomerOpeningBalanceDto[]>(`CustomerOpeningBalance/GetOpeningBalance/${id}`);
  }
  GetCustomerOpeningBalanceView(id: number): Observable<GetCustomerOpeningBalanceViewDto> {
    return this.httpService.get<GetCustomerOpeningBalanceViewDto>(`CustomerOpeningBalance/GetOpeningBalanceView/${id}`);
  }
  
  deleteCustomerOpeningBalance(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`Customer/${id}`);
  }

  getAllCustomerOpeningBalance(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<GetAllCustomerOpeningBalanceDto>> {
    let query = `CustomerOpeningBalance?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<GetAllCustomerOpeningBalanceDto>>(query);
  }
}

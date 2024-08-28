import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, Modules, PageInfo, PaginationVm } from 'shared-lib';
import {
  VendorCategoryDto,
  AddVendorCategory,
  EditVendorCategoryDto,
  vendorDefinitionDto,
  AddVendorCommand,
  CityDto,
  CurrencyDto,
  CountryDto,
  TagDropDownDto,
  EditVendorCommand,
  CategoryDropdownDto,
  GetVendorById,
} from './models';
@Injectable({
  providedIn: 'root',
})
export class PurchaseProxyService {
  constructor(private httpService: HttpService) {}

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
  getVendorDefinitionByID(id: number): Observable<GetVendorById> {
    const url = `Vendor/${id}`;
    return this.httpService.get(url);
  }

  editVendorDefinition(vendor: EditVendorCommand): Observable<any> {
    return this.httpService.put(`Vendor`, vendor, false);
  }
  addNewVendorDefinition(vendor: AddVendorCommand): Observable<AddVendorCommand> {
    return this.httpService.post(`Vendor`, vendor, false);
  }

  getCities(countryCode: string): Observable<CityDto[]> {
    return this.httpService.get<CityDto[]>(`Country/GetCities?CountryCode=${countryCode}`);
  }
  getCurrencies(searchKey: string): Observable<CurrencyDto[]> {
    return this.httpService.get<CurrencyDto[]>('Currency/CurrencyDropDown?searchTerm=' + searchKey);
  }
  getVendorCategoryDropdown(): Observable<CategoryDropdownDto[]> {
    return this.httpService.get<CategoryDropdownDto[]>('VendorCategory/VendorCategoryDropdown');
  }

  getAllCountries(): Observable<CountryDto[]> {
    return this.httpService.get<CountryDto[]>(`Country`);
  }

  getTags(moduleId:Modules): Observable<TagDropDownDto[]> {
    return this.httpService.get<TagDropDownDto[]>(`Tag/Tagdropdown?moduleId=`+ moduleId);
  }

  exportVendorCategoriesData(
    searchTerm: string | undefined
  ): Observable<VendorCategoryDto[]> {
    let query = `VendorCategory/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<VendorCategoryDto[]>(query);
  }

  exportVendorsData(
    searchTerm: string | undefined
  ): Observable<vendorDefinitionDto[]> {
    let query = `vendor/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<vendorDefinitionDto[]>(query);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
// import { TagDto ,AddTagDto, financialCalendar, AddFinancialCalendar, editFinancialCalndar, VendorCategoryDto, AddVendorCategory, EditVendorCategoryDto, CustomerCategoryDto, EditCustomerCategoryDto, vendorDefinitionDto } from './models';
import { TagDto ,AddTagDto, financialCalendar, AddFinancialCalendar, editFinancialCalndar, VendorCategoryDto, AddVendorCategory, EditVendorCategoryDto, CustomerCategoryDto, EditCustomerCategoryDto , vendorDefinitionDto, AddCustomerDefinitionDto, EditCustomerDefintionsDto} from './models';

import { AddCustomerCategoryDto } from './models/addCustomerCategoryDto';
import { AddVendorCommand } from './models/AddVendorCommand';
import { CategoryDropdownDto } from './models/CategoryDropdownDto';
import { CityDto } from './models/CityDto';
import { CountryDto } from './models/CountryDto';
import { CurrencyDto } from './models/CurrencyDto';
import { TagDropDownDto } from './models/TagDropDownDto';
import { EditVendorCommand } from './models/editVendorCommand';
import { GetVendorById } from './models/getVendorById';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingProxy {
 
  getAllTagsPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TagDto>> {
    const queryParams = new URLSearchParams({
      SearchKey: searchTerm,
      PageNumber: pageInfo.pageNumber.toString(),
      PageSize: pageInfo.pageSize.toString(),
    });
    const url = `Tag?SearchKey=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<TagDto>>(url);
  }
  getAllfinancialCalendarPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<financialCalendar>> {
    const queryParams = new URLSearchParams({
      SearchKey: searchTerm,
      PageNumber: pageInfo.pageNumber.toString(),
      PageSize: pageInfo.pageSize.toString(),
    });
    const url = `FinancialYear?SearchKey=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<financialCalendar>>(url);
  }
  getVendorCategory(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<VendorCategoryDto>> {

    const url = `VendorCategory?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<VendorCategoryDto>>(url);
  }
  getcustomerCategory(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<CustomerCategoryDto>> {

    const url = `CustomerCategory?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<CustomerCategoryDto>>(url);
  } 
  addvendorCategory(addVendorCategoryDto: AddVendorCategory): Observable<AddVendorCategory> {
    return this.httpService.post<AddVendorCategory>(`VendorCategory`,addVendorCategoryDto);
 }
 addCustomerCategory(addCustomerCategoryDto: AddCustomerCategoryDto): Observable<AddCustomerCategoryDto> {
    return this.httpService.post<AddCustomerCategoryDto>(`CustomerCategory`,addCustomerCategoryDto);
 }
 EditVendorCategory(EditVendorCategoryDto: EditVendorCategoryDto): Observable<EditVendorCategoryDto> {
    return this.httpService.put<EditVendorCategoryDto>(`VendorCategory`,EditVendorCategoryDto);
 }
 EditCustomerCategory(EditCustomerCategoryDto: EditCustomerCategoryDto): Observable<EditCustomerCategoryDto> {
    return this.httpService.put<EditVendorCategoryDto>(`CustomerCategory`,EditCustomerCategoryDto);
 }

 deleteVendorCategory(id: number): Observable<boolean> {
  return this.httpService.delete<boolean>(`VendorCategory/${id}`);
}
deleteCustomerCategory(id: number): Observable<boolean> {
  return this.httpService.delete<boolean>(`CustomerCategory/${id}`);
}
 getVendorCategoryByID(id : number) : Observable<EditVendorCategoryDto> {
  const url = `VendorCategory/${id}`
  return this.httpService.get(url);
}
getCustomerCategoryByID(id : number) : Observable<EditVendorCategoryDto> {
  const url = `CustomerCategory/${id}`
  return this.httpService.get(url);
}


getcustomerDefinition(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<CustomerCategoryDto>> {

  const url = `Customer?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

  return this.httpService.get<PaginationVm<CustomerCategoryDto>>(url);
} 

deleteCustomerDefinition(id: number): Observable<boolean> {
  return this.httpService.delete<boolean>(`Customer/${id}`);
}
getVendorDefinition(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<vendorDefinitionDto>> {

  const url = `vendor?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

  return this.httpService.get<PaginationVm<vendorDefinitionDto>>(url);
} 

deleteVendorDefinition(id: number): Observable<boolean> {
  return this.httpService.delete<boolean>(`vendor/${id}`);
}

  addTag(addTagDto: AddTagDto): Observable<TagDto> {
     return this.httpService.post<TagDto>(`Tag`,addTagDto);
  }
  addFinancialCalendar(addFinancialCalendarDto: AddFinancialCalendar): Observable<AddFinancialCalendar> {
     return this.httpService.post<AddFinancialCalendar>(`FinancialYear`,addFinancialCalendarDto);
  }
  openFinancialCalendar(openList : {}): Observable<any> {
     return this.httpService.post(`FinancialYear/openFinancialPeriod`,openList);
  }

  GetFinancialPeriodLastYearDate() {
    const url = 'FinancialYear/GetLastYearDate'
    return this.httpService.get(url);
  }
  editFinancialPeriodLastYearDate({ id, name }: { id: number; name: string }) {
    const url = 'FinancialYear'
    return this.httpService.put(url , { id, name });
  }
  GetFinancialPeriodByID(id : number) : Observable<editFinancialCalndar> {
    const url = `FinancialYear/${id}`
    return this.httpService.get(url);
  }


  getChildrenAccountsDropDown() {
    return this.httpService.get('ChartOfAccounts/ChildrenAccountsDropDown');
  }
  getpriceListDropDown() {
    return this.httpService.get('PriceList/PriceListDropDown');
  }
  getpaymentTermsListDropDown() {
    return this.httpService.get('PaymentTerms/PaymentTermsDropdown');
  }
  editTag(tagDto: TagDto): Observable<boolean> {
    return this.httpService.put<boolean>(`Tag`,tagDto);
 }

 getTagById(id: number): Observable<TagDto> {
  return this.httpService.get<TagDto>(`Tag/GetById?Id=${id}`);
}

 deleteTag(id: number): Observable<boolean> {
  return this.httpService.delete<boolean>(`Tag?Id=${id}`);
}


activateTag(id: number): Observable<boolean> {
  return this.httpService.put<boolean>(`Tag/Activate?Id=${id}`,{});
}

deactivateTag(id: number): Observable<boolean> {
  return this.httpService.put<boolean>(`Tag/deactivate?Id=${id}`,{});
}
getTags(): Observable<TagDropDownDto[]> {
  return this.httpService.get<TagDropDownDto[]>(`Tag/Tagdropdown`);
}
getAllCountries(): Observable<CountryDto[]> {
  return this.httpService.get<CountryDto[]>(`Country`);
}
getCities(countryCode: string): Observable<CityDto[]> {
  return this.httpService.get<CityDto[]>(`Country/GetCities?CountryCode=${countryCode}`);
}
getCurrencies(searchKey: string): Observable<CurrencyDto[]> {
  return this.httpService.get<CurrencyDto[]>('Currency?searchKey=' + searchKey);
}
getVendorCategoryDropdown(): Observable<CategoryDropdownDto[]> {
  return this.httpService.get<CategoryDropdownDto[]>('VendorCategory/VendorCategoryDropdown');
}
getCustomerCategoryDropdown(): Observable<CategoryDropdownDto[]> {
  return this.httpService.get<CategoryDropdownDto[]>('CustomerCategory/CustomerCategoryDropdown');
}
addNewVendorDefinition(vendor:AddVendorCommand): Observable<AddVendorCommand> {
  return this.httpService.post(`Vendor`,vendor);
}
addNewCustomerDefinition(customer:AddCustomerDefinitionDto): Observable<AddCustomerDefinitionDto> {
  return this.httpService.post(`Customer`,customer);
}
editCustomerDefinition(customer:EditCustomerDefintionsDto): Observable<EditCustomerDefintionsDto> {
  return this.httpService.put(`Customer`,customer);
}
getCustomerDefinitionByID(id:string): Observable<AddCustomerDefinitionDto> {
  return this.httpService.get(`Customer/${id}`);
}
getVendorById(id: number): Observable<any> {
  return this.httpService.get<any>(`Vendor/${id}`);
}


getVendorDefinitionByID(id : number) : Observable<GetVendorById> {
  const url = `Vendor/${id}`
  return this.httpService.get(url);
}

editVendorDefinition(vendor:EditVendorCommand): Observable<any> {
  return this.httpService.put(`Vendor`,vendor);
}
  constructor(private httpService: HttpService) {}
}

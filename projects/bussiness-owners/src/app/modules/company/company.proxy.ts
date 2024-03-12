import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, HttpService, lookupsListDto } from 'shared-lib';
import {
  AddCompanyDto,
  CountryDropDown,
  DropdownItemDto,
  DropdownListDto,
  MobileCodeDropdownDto,
  ResponseCompanyDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class CompanyProxy {
  addCompany(
    request: AddCompanyDto
  ): Observable<APIResponse<ResponseCompanyDto>> {
    return this.httpService.post<APIResponse<ResponseCompanyDto>>(
      'Company',
      request
    );
  }
  getAll(
    subscriptionId: string
  ): Observable<APIResponse<ResponseCompanyDto[]>> {
    return this.httpService.get<APIResponse<ResponseCompanyDto[]>>(
      `Company?subscriptionId=${subscriptionId}`
    );
  }

  getLookups(): Observable<APIResponse<lookupsListDto>> {
    return this.httpService.get<APIResponse<lookupsListDto>>('Company/Lookups');
  }

  getById(id: number): Observable<APIResponse<ResponseCompanyDto>> {
    return this.httpService.get<APIResponse<ResponseCompanyDto>>(
      `Company/${id}`
    );
  }

  getDropDown(): Observable<APIResponse<DropdownListDto>> {
    return this.httpService.get<APIResponse<DropdownListDto>>(
      `Company/dropdowns`
    );
  }

  getSubdomainDropDown(): Observable<APIResponse<DropdownItemDto[]>> {
    return this.httpService.get<APIResponse<DropdownItemDto[]>>(
      `SubDomain/GetAllDropDown`
    );
  }

  getMobileCodeDropDown(): Observable<APIResponse<MobileCodeDropdownDto[]>> {
    return this.httpService.get<APIResponse<MobileCodeDropdownDto[]>>(
      `Country/GetAllCountryCodeDropDown`
    );
  }

  getCountryDropDown(): Observable<APIResponse<CountryDropDown[]>> {
    return this.httpService.get<APIResponse<CountryDropDown[]>>(
      `Country/GetAllDropDown`
    );
  }

  activateCompany(id: number): Observable<APIResponse<boolean>> {
    return this.httpService.put<APIResponse<boolean>>(
      `Company/activatecompany/${id}`,
      {}
    );
  }
  deactivateCompany(id: number): Observable<APIResponse<boolean>> {
    return this.httpService.put<APIResponse<boolean>>(
      `Company/deactivatecompany/${id}`,
      {}
    );
  }

  constructor(private httpService: HttpService) {}
}

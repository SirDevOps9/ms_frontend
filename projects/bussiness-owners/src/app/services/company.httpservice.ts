import { Injectable } from '@angular/core';
import {
  APIResponse,
  BaseService,
  ResponseItems,
  lookupsListDto,
} from 'shared-lib';
import { AddCompanyDto } from '../models/company/addcompany';
import { Observable } from 'rxjs';
import { DropdownItemDto } from '../models/company/dropdown';
import { ResponseCompanyDto } from '../models/company/responsecompanydto';
import { CountryDropDown } from '../models/company/countrydropdown';
import { DropdownListDto } from '../models/company/dropdownlist';
import { MobileCodeDropdownDto } from '../models/company/mobilecodedropdown';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private company = `Company`;
  private companyDropDown = `/dropdowns`;
  private country = `Country`;
  private countrycode = `/GetAllCountryCodeDropDown`;
  private countryName = `/GetAllDropDown`;

  private subdomain = `SubDomain`;
  private subdomainDropDown = `/GetAllDropDown`;

  constructor(private baseService: BaseService) {}

  addCompany(
    request: AddCompanyDto
  ): Observable<APIResponse<ResponseCompanyDto>> {
    return this.baseService.post<APIResponse<ResponseCompanyDto>>(
      this.company,
      request
    );
  }
  getAll(planId: number): Observable<APIResponse<ResponseCompanyDto[]>> {
    return this.baseService.get<APIResponse<ResponseCompanyDto[]>>(
      `${this.company}?planId=${planId}`
    );
  }

  getLookups(): Observable<APIResponse<lookupsListDto>> {
    return this.baseService.get<APIResponse<lookupsListDto>>('Company/Lookups');
  }
  getDropDown(): Observable<APIResponse<DropdownListDto>> {
    return this.baseService.get<APIResponse<DropdownListDto>>(
      `${this.company}${this.companyDropDown}`
    );
  }

  getSubdomainDropDown(): Observable<APIResponse<DropdownItemDto[]>> {
    return this.baseService.get<APIResponse<DropdownItemDto[]>>(
      `${this.subdomain}${this.subdomainDropDown}`
    );
  }

  getMobileCodeDropDown(): Observable<APIResponse<MobileCodeDropdownDto[]>> {
    return this.baseService.get<APIResponse<MobileCodeDropdownDto[]>>(
      `${this.country}${this.countrycode}`
    );
  }

  getCountryDropDown(): Observable<APIResponse<CountryDropDown[]>> {
    return this.baseService.get<APIResponse<CountryDropDown[]>>(
      `${this.country}${this.countryName}`
    );
  }

  activateCompany(id: number): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `${this.company}/activatecompany/${id}`,
      {}
    );
  }
  deactivateCompany(id: number): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `${this.company}/deactivatecompany/${id}`,
      {}
    );
  }
}

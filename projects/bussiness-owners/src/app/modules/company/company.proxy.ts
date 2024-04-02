import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, lookupsListDto } from 'shared-lib';
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
  addCompany(request: AddCompanyDto): Observable<ResponseCompanyDto> {
    return this.httpService.post<ResponseCompanyDto>('Company', request);
  }
  getAll(subscriptionId: string): Observable<ResponseCompanyDto[]> {
    return this.httpService.get<ResponseCompanyDto[]>(
      `Company?subscriptionId=${subscriptionId}`
    );
  }

  getLookups(): Observable<lookupsListDto> {
    return this.httpService.get<lookupsListDto>('Company/Lookups');
  }

  getById(id: number): Observable<ResponseCompanyDto> {
    return this.httpService.get<ResponseCompanyDto>(`Company/${id}`);
  }

  getDropDown(): Observable<DropdownListDto> {
    return this.httpService.get<DropdownListDto>(`Company/dropdowns`);
  }

  getSubdomainDropDown(): Observable<DropdownItemDto[]> {
    return this.httpService.get<DropdownItemDto[]>(`SubDomain/GetAllDropDown`);
  }

  getMobileCodeDropDown(): Observable<MobileCodeDropdownDto[]> {
    return this.httpService.get<MobileCodeDropdownDto[]>(
      `Country/GetAllCountryCodeDropDown`
    );
  }

  getCountryDropDown(): Observable<CountryDropDown[]> {
    return this.httpService.get<CountryDropDown[]>(`Country/GetAllDropDown`);
  }

  activateCompany(id: number): Observable<boolean> {
    return this.httpService.put<boolean>(`Company/activatecompany/${id}`, {});
  }
  deactivateCompany(id: number): Observable<boolean> {
    return this.httpService.put<boolean>(`Company/deactivatecompany/${id}`, {});
  }

  constructor(private httpService: HttpService) {}
}

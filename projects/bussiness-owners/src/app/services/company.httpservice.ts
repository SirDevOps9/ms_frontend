import { Injectable } from '@angular/core';
import { APIResponse, BaseService, ResponseItems} from 'shared-lib';
import { AddCompanyDto } from '../models/company/addcompany';
import { Observable } from 'rxjs';
import { DropdownListDto,  DropdownItemDto} from '../models/company/dropdown';
import { CompanyListResponse } from '../models/company/companylist.response';
import { ResponseCompanyDto } from '../models/company/responsecompanydto';
import { MobileCodeDropdownDto } from '../models/company/mobilecodedropdown';


@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private company = `Company`;
  private companyDropDown = `/dropdowns`;
  private country = `Country`;
  private countrycode = `/GetAllCountryCodeDropDown`;
  private subdomain = `SubDomain`;
  private subdomainDropDown = `/GetAllDropDown`;


  constructor(private baseService: BaseService) {}

  addCompany(request: AddCompanyDto): Observable<APIResponse<ResponseCompanyDto>> {
    return this.baseService.post<APIResponse<ResponseCompanyDto>>(
      this.company,
      request
    );
  }
  getAll(): Observable<APIResponse<CompanyListResponse>> {
    return this.baseService.get<APIResponse<CompanyListResponse[]>>(`${this.company}`);
  }
  getDropDown():Observable<APIResponse<DropdownListDto>>{
    return this.baseService.get<APIResponse<DropdownListDto>>(`${this.company}${this.companyDropDown}`);
  }

  getMobileCodeDropDown():Observable<APIResponse<MobileCodeDropdownDto[]>>{
    return this.baseService.get<APIResponse<MobileCodeDropdownDto[]>>(`${this.country}${this.countrycode}`);
  }

  getSubdomainDropDown():Observable<APIResponse<DropdownItemDto[]>>{
    return this.baseService.get<APIResponse<DropdownItemDto[]>>(`${this.subdomain}${this.subdomainDropDown}`);
  }
}
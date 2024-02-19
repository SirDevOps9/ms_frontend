import { Injectable } from '@angular/core';
import { APIResponse, BaseService, ResponseItems} from 'shared-lib';
import { AddCompanyDto } from '../models/company/add-company';
import { Observable } from 'rxjs';
import { DropdownListDto,  DropdownItemDto} from '../models/company/drop-down';
import { CompanyListResponse } from '../models/company/companylist.response';
import { ResponseCompanyDto } from '../models/company/response-company-dto';
import { MobileCodeDropdownDto } from '../models/company/mobile-code-drop-down';


@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companyApi = `Company`;
  private dropDownApi = `/dropdowns`;
  private countryApi = `Country`;
  private countrycode = `/GetAllCountryCodeDropDown`;


  constructor(private baseService: BaseService) {}

  addCompany(request: AddCompanyDto): Observable<APIResponse<ResponseCompanyDto>> {
    return this.baseService.post<APIResponse<ResponseCompanyDto>>(
      this.companyApi,
      request
    );
  }
  getAll(): Observable<APIResponse<CompanyListResponse>> {
    return this.baseService.get<APIResponse<CompanyListResponse[]>>(`${this.companyApi}`);
  }
  getDropDown():Observable<APIResponse<DropdownListDto>>{
    return this.baseService.get<APIResponse<DropdownListDto>>(`${this.companyApi}${this.dropDownApi}`);
  }

  getMobileCodeDropDown():Observable<APIResponse<MobileCodeDropdownDto[]>>{
    return this.baseService.get<APIResponse<MobileCodeDropdownDto[]>>(`${this.countryApi}${this.countrycode}`);
  }
}
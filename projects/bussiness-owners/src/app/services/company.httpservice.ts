import { BaseService, ResponseItems } from 'shared-lib';
import { Observable } from 'rxjs';
import { APIResponse } from '../../../../shared-lib/src/lib/models';
import { AddCompanyDto } from '../models/company/add-company';
import { CompanyListResponse } from '../models/company/companylist.response';
import { Injectable } from '@angular/core';
import { DropdownItemDto, DropdownListDto } from '../models/company/drop-down';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companyApi = `Company`;
  private dropDownApi = `/dropdowns`;

  constructor(private baseService: BaseService) {}

  addCompany(request: AddCompanyDto): Observable<APIResponse<AddCompanyDto>> {
    return this.baseService.post<APIResponse<AddCompanyDto>>(
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
}
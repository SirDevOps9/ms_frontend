import { Injectable } from '@angular/core';
import { APIResponse, BaseService, ResponseItems} from 'shared-lib';
import { AddCompanyDto } from '../models/users/company/add-company';
import { Observable } from 'rxjs';
import { DropdownListDto,  DropdownItemDto} from '../models/users/company/drop-down';
import { CompanyListResponse } from '../models/company/companylist.response';


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
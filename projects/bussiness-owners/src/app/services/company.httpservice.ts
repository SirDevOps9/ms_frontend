import { BaseService, ResponseItems } from 'shared-lib';
import { Observable } from 'rxjs';
import { APIResponse } from '../../../../shared-lib/src/lib/models';
import { AddCompanyDto } from '../models/company/add-company';
import { CompanyListResponse } from '../models/company/companylist.response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companyApi = `Company`;

  constructor(private baseService: BaseService) {}

  addCompany(request: AddCompanyDto): Observable<APIResponse<AddCompanyDto>> {
    return this.baseService.post<APIResponse<AddCompanyDto>>(
      this.companyApi,
      request
    );
  }
  getAll(): Observable<APIResponse<ResponseItems<CompanyListResponse>>> {
    return this.baseService.get<APIResponse<ResponseItems<CompanyListResponse[]>>>(`${this.companyApi}`);
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, HttpService, lookupsListDto } from 'shared-lib';
import {
  AddCompanyDto,
  ResponseCompanyDto,
} from './models';
import { AddCompanyPopupDto } from './models/addcompanypopup';

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
  addCompanyPopup(
    request: AddCompanyPopupDto
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

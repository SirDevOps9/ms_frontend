import { HttpClient } from "@angular/common/http";
import { BaseService } from "../../../../shared-lib/src/lib/services/base.httpservice";
import { Observable } from "rxjs";
import { APIResponse } from "../../../../shared-lib/src/lib/models";
import { AddCompanyDto } from "../models/company/add-company";
import { CompanyListResponse } from "../models/company/companylist.response";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class CompanyService {
  private companyApi = `api/Company`; 

  constructor(private http: HttpClient, private baseService: BaseService) {}

  addCompany(request: AddCompanyDto): Observable<APIResponse<AddCompanyDto>> {
    return this.baseService.post<APIResponse<AddCompanyDto>>(
        this.companyApi,
      request
    );
  }
  getAll(): Observable<CompanyListResponse[]>
  {
    return this.baseService.get<CompanyListResponse[]>(
             `${this.companyApi}`
    );
  }
}
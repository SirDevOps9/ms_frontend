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
import { AddCompanyPopupDto } from './models/addcompanypopupdto';
import { CompanyContactDto } from './models/companycontactdto';
import { CompanyAddressDto } from './models/companyaddressdto';
import { CompanyLegalDto } from './models/companylegaldto';
import { BranchDto } from './models/branchdto';
import { CreateBranchDto } from './models/createbranchdto';
import { EditBranchDto } from './models/editbranchdto';
import { CompanyHierarchyDto } from './models/companyhierarchydto';
import { UpdateCompanyHierarchyDto } from './models/updatecompanyhierarchydto';

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

  getLookups(): Observable<APIResponse<lookupsListDto>> {
    return this.httpService.get<APIResponse<lookupsListDto>>('Company/Lookups');
  }

  getCompanyById(id: string): Observable<APIResponse<ResponseCompanyDto>> {
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

  activateCompany(id: string): Observable<APIResponse<boolean>> {
    return this.httpService.put<APIResponse<boolean>>(
      `Company/activatecompany/${id}`,
      {}
    );
  }
  deactivateCompany(id: string): Observable<APIResponse<boolean>> {
    return this.httpService.put<APIResponse<boolean>>(
      `Company/deactivatecompany/${id}`,
      {}
    );
  }

  // new company and edit
  getAll(
    subscriptionId: string
  ): Observable<APIResponse<ResponseCompanyDto[]>> {
    return this.httpService.get<APIResponse<ResponseCompanyDto[]>>(
      `Company?subscriptionId=${subscriptionId}`
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

  saveCompanyContact(
    request: CompanyContactDto
  ): Observable<APIResponse<ResponseCompanyDto>> {
    return this.httpService.post<APIResponse<ResponseCompanyDto>>(
      'Company/Contact/AddorUpdate',
      request
    );
  }

  saveCompanyAddress(
    request: CompanyAddressDto
  ): Observable<APIResponse<ResponseCompanyDto>> {
    return this.httpService.post<APIResponse<ResponseCompanyDto>>(
      'Company/Address/AddorUpdate',
      request
    );
  }

  saveCompanyLegal(
    request: CompanyLegalDto
  ): Observable<APIResponse<ResponseCompanyDto>> {
    return this.httpService.post<APIResponse<ResponseCompanyDto>>(
      'Company/Legal/AddorUpdate',
      request
    );
  }

  saveCompanyHierarchy(
    request: UpdateCompanyHierarchyDto
  ): Observable<APIResponse<CompanyHierarchyDto>> {
    return this.httpService.post<APIResponse<CompanyHierarchyDto>>(
      'Company/Hierarchy/Update',
      request
    );
  }

  getCompanyContactById(
    id: string
  ): Observable<APIResponse<CompanyContactDto>> {
    return this.httpService.get<APIResponse<CompanyContactDto>>(
      `Company/Contact/${id}`
    );
  }

  getCompanyAddressId(id: string): Observable<APIResponse<CompanyAddressDto>> {
    return this.httpService.get<APIResponse<CompanyAddressDto>>(
      `Company/Address/${id}`
    );
  }

  getCompanyLegalById(id: string): Observable<APIResponse<CompanyLegalDto>> {
    return this.httpService.get<APIResponse<CompanyLegalDto>>(
      `Company/Legal/${id}`
    );
  }

  getCompanyHierarchyById(
    id: string
  ): Observable<APIResponse<CompanyHierarchyDto>> {
    return this.httpService.get<APIResponse<CompanyHierarchyDto>>(
      `Company/Hierarchy/${id}`
    );
  }

  //branches
  getAllBranches(companyId: string): Observable<APIResponse<BranchDto[]>> {
    return this.httpService.get<APIResponse<BranchDto[]>>(
      `Branch?companyId=${companyId}`
    );
  }

  addBranch(request: CreateBranchDto): Observable<APIResponse<BranchDto>> {
    return this.httpService.post<APIResponse<BranchDto>>('Branch', request);
  }

  editBranch(request: EditBranchDto): Observable<APIResponse<BranchDto>> {
    return this.httpService.put<APIResponse<BranchDto>>('Branch', request);
  }

  getBranchById(id: string): Observable<APIResponse<BranchDto>> {
    return this.httpService.get<APIResponse<BranchDto>>(`Branch/${id}`);
  }

  deleteBranch(id: string): Observable<APIResponse<BranchDto>> {
    return this.httpService.delete<APIResponse<BranchDto>>(`Branch?id=${id}`);
  }

  activateBranch(id: string): Observable<APIResponse<boolean>> {
    return this.httpService.put<APIResponse<boolean>>(
      `Company/ActivateBranch/${id}`,
      {}
    );
  }
  deActivateBranch(id: string): Observable<APIResponse<boolean>> {
    return this.httpService.put<APIResponse<boolean>>(
      `Company/DeActivateBranch/${id}`,
      {}
    );
  }

  constructor(private httpService: HttpService) {}
}

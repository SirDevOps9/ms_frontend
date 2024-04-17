import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, lookupsListDto } from 'shared-lib';
import {
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

  getLookups(): Observable<lookupsListDto> {
    return this.httpService.get<lookupsListDto>('Company/Lookups');
  }

  getCompanyById(id: string): Observable<ResponseCompanyDto> {
    return this.httpService.get<ResponseCompanyDto>(
      `Company/${id}`
    );
  }

  activateCompany(id: string): Observable<boolean> {
    return this.httpService.put<boolean>(
      `Company/activatecompany/${id}`,
      {}
    );
  }
  deactivateCompany(id: string): Observable<boolean> {
    return this.httpService.put<boolean>(
      `Company/deactivatecompany/${id}`,
      {}
    );
  }

  getAll(
    subscriptionId: string
  ): Observable<ResponseCompanyDto[]> {
    return this.httpService.get<ResponseCompanyDto[]>(
      // `Company?subscriptionId=${subscriptionId}`
       `Company/GetAllBySubdomain?subdomain=${subscriptionId}`
    );
  }

  addCompanyPopup(
    request: AddCompanyPopupDto
  ): Observable<ResponseCompanyDto> {
    return this.httpService.post<ResponseCompanyDto>(
      'Company',
      request
    );
  }

  saveCompanyContact(
    request: CompanyContactDto
  ): Observable<ResponseCompanyDto> {
    return this.httpService.post<ResponseCompanyDto>(
      'Company/Contact/AddorUpdate',
      request
    );
  }

  saveCompanyAddress(
    request: CompanyAddressDto
  ): Observable<ResponseCompanyDto> {
    return this.httpService.post<ResponseCompanyDto>(
      'Company/Address/AddorUpdate',
      request
    );
  }

  saveCompanyLegal(
    request: CompanyLegalDto
  ): Observable<ResponseCompanyDto> {
    return this.httpService.post<ResponseCompanyDto>(
      'Company/Legal/AddorUpdate',
      request
    );
  }

  saveCompanyHierarchy(
    request: UpdateCompanyHierarchyDto
  ): Observable<CompanyHierarchyDto> {
    return this.httpService.post<CompanyHierarchyDto>(
      'Company/Hierarchy/Update',
      request
    );
  }

  getCompanyContactById(
    id: string
  ): Observable<CompanyContactDto> {
    return this.httpService.get<CompanyContactDto>(
      `Company/Contact/${id}`
    );
  }

  getCompanyAddressId(id: string): Observable<CompanyAddressDto> {
    return this.httpService.get<CompanyAddressDto>(
      `Company/Address/${id}`
    );
  }

  getCompanyLegalById(id: string): Observable<CompanyLegalDto> {
    return this.httpService.get<CompanyLegalDto>(
      `Company/Legal/${id}`
    );
  }

  getCompanyHierarchyById(
    id: string
  ): Observable<CompanyHierarchyDto> {
    return this.httpService.get<CompanyHierarchyDto>(
      `Company/Hierarchy/${id}`
    );
  }

  getAllBranches(companyId: string): Observable<BranchDto[]> {
    return this.httpService.get<BranchDto[]>(
      `Branch?companyId=${companyId}`
    );
  }

  addBranch(request: CreateBranchDto): Observable<BranchDto> {
    return this.httpService.post<BranchDto>('Branch', request);
  }

  editBranch(request: EditBranchDto): Observable<BranchDto> {
    return this.httpService.put<BranchDto>('Branch', request);
  }

  getBranchById(id: string): Observable<BranchDto> {
    return this.httpService.get<BranchDto>(`Branch/${id}`);
  }

  deleteBranch(id: string): Observable<BranchDto> {
    return this.httpService.delete<BranchDto>(`Branch?id=${id}`);
  }

  activateBranch(id: string): Observable<string> {
    return this.httpService.put<string>(
      `Branch/ActivateBranch/${id}`,
      {}
    );
  }
  deActivateBranch(id: string): Observable<string> {
    return this.httpService.put<string>(
      `Branch/DeActivateBranch/${id}`,
      {}
    );
  }

  constructor(private httpService: HttpService) {}
}

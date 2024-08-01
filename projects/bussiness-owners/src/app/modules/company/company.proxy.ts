import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, lookupDto, lookupsListDto } from 'shared-lib';
import { CreateCompany } from './models/create-company';
import { CompanyContactDto } from './models/company-contact-dto';
import { CompanyAddressDto } from './models/company-address-dto';
import { CompanyLegalDto } from './models/company-legal-dto';
import { BranchDto } from './models/branch-dto';
import { CreateBranch } from './models/create-branch';
import { editBranch } from './models/edit-branch';
import { CompanyHierarchyDto } from './models/company-hierarchy-dto';
import { UpdateCompanyHierarchyDto } from './models/update-company-hierarchy-dto';
import { CompanyDto, ExportBranchesDto } from './models';
import { ExportCompanyDto } from './models/export-company-dto';

@Injectable({
  providedIn: 'root',
})
export class CompanyProxy {
  getLookups(): Observable<lookupsListDto> {
    return this.httpService.get<lookupsListDto>('Company/Lookups');
  }

  getCompanyById(id: string): Observable<CompanyDto> {
    return this.httpService.get<CompanyDto>(`Company/${id}`);
  }

  activateCompany(id: string): Observable<boolean> {
    return this.httpService.put<boolean>(`Company/activatecompany/${id}`, {});
  }
  deactivateCompany(id: string): Observable<boolean> {
    return this.httpService.put<boolean>(`Company/deactivatecompany/${id}`, {});
  }

  getAll(searchTerm: string,subscriptionId: string): Observable<CompanyDto[]> {
    return this.httpService.get<CompanyDto[]>(
      // `Company?subscriptionId=${subscriptionId}`
      `Company/GetAllBySubdomain?subdomain=${subscriptionId}&SearchTerm=${searchTerm}`
    );
  }

  addCompany(request: CreateCompany): Observable<CompanyDto> {
    return this.httpService.post<CompanyDto>('Company', request);
  }

  saveCompanyContact(request: CompanyContactDto): Observable<CompanyDto> {
    return this.httpService.post<CompanyDto>('Company/Contact/AddorUpdate', request);
  }

  saveCompanyAddress(request: CompanyAddressDto): Observable<CompanyDto> {
    return this.httpService.post<CompanyDto>('Company/Address/AddorUpdate', request);
  }

  saveCompanyLegal(request: CompanyLegalDto): Observable<CompanyDto> {
    return this.httpService.post<CompanyDto>('Company/Legal/AddorUpdate', request);
  }

  saveCompanyHierarchy(request: UpdateCompanyHierarchyDto): Observable<CompanyHierarchyDto> {
    return this.httpService.post<CompanyHierarchyDto>('Company/Hierarchy/Update', request);
  }

  getCompanyContactById(id: string): Observable<CompanyContactDto> {
    return this.httpService.get<CompanyContactDto>(`Company/Contact/${id}`);
  }

  getCompanyAddressId(id: string): Observable<CompanyAddressDto> {
    return this.httpService.get<CompanyAddressDto>(`Company/Address/${id}`);
  }

  getCompanyLegalById(id: string): Observable<CompanyLegalDto> {
    return this.httpService.get<CompanyLegalDto>(`Company/Legal/${id}`);
  }

  getCompanyHierarchyById(id: string): Observable<CompanyHierarchyDto> {
    return this.httpService.get<CompanyHierarchyDto>(`Company/Hierarchy/${id}`);
  }

  getAllBranches(companyId: string): Observable<BranchDto[]> {
    return this.httpService.get<BranchDto[]>(`Branch?companyId=${companyId}`);
  }

  addBranch(request: CreateBranch): Observable<BranchDto> {
    return this.httpService.post<BranchDto>('Branch', request);
  }

  editBranch(request: editBranch): Observable<BranchDto> {
    return this.httpService.put<BranchDto>('Branch', request);
  }

  getBranchById(id: string): Observable<BranchDto> {
    return this.httpService.get<BranchDto>(`Branch/${id}`);
  }

  deleteBranch(id: string): Observable<BranchDto> {
    return this.httpService.delete<BranchDto>(`Branch?id=${id}`);
  }

  activateBranch(id: string): Observable<string> {
    return this.httpService.put<string>(`Branch/ActivateBranch/${id}`, {});
  }

  deActivateBranch(id: string): Observable<string> {
    return this.httpService.put<string>(`Branch/DeActivateBranch/${id}`, {});
  }

  getAllHoldingCompanies(subdomain: string): Observable<lookupDto[]> {
    return this.httpService.get<lookupDto[]>(
      `Company/GetAllHoldingCompanies?subdomain=${subdomain}`
    );
  }

  getAllCompanies(subdomain: string): Observable<lookupDto[]> {
    return this.httpService.get<lookupDto[]>(`Company/GetCompaniesDropdown?subdomain=${subdomain}`);
  }
  exportCompaniesData(
    searchTerm: string | undefined,
    subscriptionId: string,
  ): Observable<ExportCompanyDto[]> {
    let query = `Company/Export?`;
    const params = [];
  
    if (searchTerm) {
      params.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
    }
  
    params.push(`subscriptionId=${encodeURIComponent(subscriptionId)}`);
  
    query += params.join('&');
  
    return this.httpService.get<ExportCompanyDto[]>(query);
  }

  exportBranchesData(
    companyId: string
  ): Observable<ExportBranchesDto[]> {
    let query = `Branch/Export?`;

      query += `companyId=${encodeURIComponent(companyId)}`;
    
     return this.httpService.get<ExportBranchesDto[]>(query);
  }

  constructor(private httpService: HttpService) {}
}

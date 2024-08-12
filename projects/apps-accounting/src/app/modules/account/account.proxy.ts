import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import {
  accountTreeList,
  AddAccountDto,
  AccountDto,
  AccountSectionDropDownDto,
  TagDropDownDto,
  AccountTypeDropDownDto,
  parentAccountDto,
  GetLevelsDto,
  listAddLevelsDto,
  AccountByIdDto,
  TaxGroupDto,
  AddTaxGroupDto,
  AddTax,
  EditTax,
  TaxDto,
  accountById,
  costTree,
  addCostCenter,
  costById,
  costCenterDetails,
  costCenterList,
  costCenterActivation,
  companyDropDownDto,
  CountryDto,
  ExportTaxDto,
  ExportAccountsDto,
  AccountsChildrenDropDown,
} from './models';
import { TaxGroupDropDown } from './models/tax-group-drop-down';
import { costLookup } from '../journal-entry/models';

@Injectable({
  providedIn: 'root',
})
export class AccountProxy {
  getAccountSections(): Observable<AccountSectionDropDownDto[]> {
    return this.httpService.get<AccountSectionDropDownDto[]>(`AccountSection`);
  }

  getAccountTypes(sectionId: number): Observable<AccountTypeDropDownDto[]> {
    return this.httpService.get<AccountTypeDropDownDto[]>(`AccountType?SectionId=` + sectionId);
  }
  getTags(): Observable<TagDropDownDto[]> {
    return this.httpService.get<TagDropDownDto[]>(`Tag/Tagdropdown`);
  }
  getCompanyDropdown(): Observable<companyDropDownDto[]> {
    return this.httpService.get<companyDropDownDto[]>(`Company/CompanyDropdown`);
  }

  getAccount(id: number): Observable<parentAccountDto> {
    return this.httpService.get<parentAccountDto>(`ChartOfAccounts/Get?id=${id}`);
  }
  getAccountDetails(id: number): Observable<AccountByIdDto> {
    return this.httpService.get<AccountByIdDto>(`ChartOfAccounts/GetAccountDetails?id=${id}`);
  }

  addAccount(command: AddAccountDto): Observable<AccountDto> {
    return this.httpService.post('ChartOfAccounts/AddAccount', command);
  }
  editAccount(command: accountById): Observable<accountById> {
    return this.httpService.put('ChartOfAccounts/EditAccount', command);
  }
  deleteAccount(id: number): Observable<number> {
    return this.httpService.delete<number>(`ChartOfAccounts/Delete?Id=${id}`);
  }
  getAllPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<AccountDto>> {
    let query = `ChartOfAccounts?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<AccountDto>>(query);
  }
  getAccountsHasNoChildren(
    quieries: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<AccountDto>> { 
    return this.httpService.get<PaginationVm<AccountDto>>(
      `ChartOfAccounts/GetHasNoChildrenList?${pageInfo.toQuery}&${quieries ? quieries : ''}`
    );
  }
  getAccountsHasNoChildrenNew(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<AccountDto>> { 
    let query = `ChartOfAccounts/GetHasNoChildrenList?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<AccountDto>>(query);
    // return this.httpService.get<PaginationVm<AccountDto>>(
    //   `ChartOfAccounts/GetHasNoChildrenList?${pageInfo.toQuery}&${quieries ? quieries : ''}`
    // );
  }
  getAccountsChildrenDropDown(): Observable<AccountsChildrenDropDown[]> {
    return this.httpService.get<AccountsChildrenDropDown[]>(
      `ChartOfAccounts/ChildrenAccountsDropDown`
    );
  }

  getAllParentAccounts(): Observable<parentAccountDto[]> {
    return this.httpService.get<parentAccountDto[]>(`ChartOfAccounts/GetParentAccounts`);
  }

  getTreeList(): Observable<accountTreeList[]> {
    return this.httpService.get<accountTreeList[]>(`ChartOfAccounts/GetTree`);
  }
  GetCostTree(): Observable<costTree[]> {
    return this.httpService.get<costTree[]>(`CostCenter/GetTree`);
  }

  getLevels(): Observable<GetLevelsDto[]> {
    return this.httpService.get<GetLevelsDto[]>(`Levels`);
  }

  addLevels(command: listAddLevelsDto): Observable<boolean> {
    return this.httpService.post('Levels', command, false);
  }
  getAccountById(id: number): Observable<accountById> {
    return this.httpService.get<accountById>(`ChartOfAccounts/GetById?id=${id}`);
  }

  getAllTaxGroup(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TaxGroupDto>> {
    return this.httpService.get<PaginationVm<TaxGroupDto>>(
      `TaxGroup?SearchKey=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`
    );
  }

  deleteTaxGroup(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`TaxGroup?Id=${id}`);
  }

  addTaxGroup(taxgroupdto: AddTaxGroupDto): Observable<boolean> {
    return this.httpService.post<boolean>(`TaxGroup`, taxgroupdto);
  }

  editTaxGroup(taxgroupdto: TaxGroupDto): Observable<boolean> {
    return this.httpService.put<boolean>(`TaxGroup`, taxgroupdto);
  }
  getTaxGroupById(id: number): Observable<TaxGroupDto> {
    return this.httpService.get<TaxGroupDto>(`TaxGroup/GetById?Id=${id}`);
  }

  getAccountLookup(): Observable<costLookup[]> {
    return this.httpService.get('CostCenter/CostCenterDropDown');
  }

  getAllTaxes(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TaxDto>> {
    return this.httpService.get<PaginationVm<TaxDto>>(
      `Tax?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`
    );
  }

  getTaxById(id: number): Observable<TaxDto> {
    return this.httpService.get<TaxDto>(`Tax/GetById?Id=${id}`);
  }

  addTax(command: AddTax): Observable<TaxDto> {
    return this.httpService.post('Tax', command);
  }

  editTax(command: EditTax): Observable<TaxDto> {
    return this.httpService.put('Tax', command);
  }

  deleteTax(id: number): Observable<number> {
    return this.httpService.delete<number>(`Tax?Id=${id}`);
  }

  getAllTaxGroups(): Observable<TaxGroupDropDown[]> {
    return this.httpService.get<TaxGroupDropDown[]>(`TaxGroup/TaxGroupDropDown`);
  }
  AddCostCenter(command: addCostCenter): Observable<addCostCenter> {
    return this.httpService.post('CostCenter/AddCostCenter', command);
  }

  deleteCostCenter(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`CostCenter/Delete?Id=${id}`);
  }
  GetAllParentsCostCenters(): Observable<parentAccountDto[]> {
    return this.httpService.get<parentAccountDto[]>(`CostCenter/GetAllParentsCostCenters`);
  }
  getCostById(id: number): Observable<costById> {
    return this.httpService.get<costById>(`CostCenter/GetById?id=${id}`);
  }
  editCost(command: costById): Observable<costById> {
    return this.httpService.put<costById>('CostCenter/EditCostCenter', command);
  }
  GetCostCenterDetails(id: number): Observable<costCenterDetails> {
    return this.httpService.get<costCenterDetails>(`CostCenter/GetCostCenterDetails?id=${id}`);
  }
  getAllCostCenter(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<costCenterList>> {
    return this.httpService.get<PaginationVm<costCenterList>>(
      `CostCenter/GetCostCenters?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`
    );
  }
  costCenterActivation(command: costCenterActivation): Observable<costCenterActivation> {
    return this.httpService.put<costCenterActivation>(`CostCenter/CostCenterActivation`, command);
  }

  getAllCountries(): Observable<CountryDto[]> {
    return this.httpService.get<CountryDto[]>(`Country`);
  }

  exportTaxGroupData(searchTerm: string | undefined): Observable<TaxGroupDto[]> {
    let query = `TaxGroup/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<TaxGroupDto[]>(query);
  }

  exportAccountsData(searchTerm: string | undefined): Observable<ExportAccountsDto[]> {
    let query = `ChartOfAccounts/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<ExportAccountsDto[]>(query);
  }

  exportCostCentersData(searchTerm: string | undefined): Observable<costCenterList[]> {
    let query = `CostCenter/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<costCenterList[]>(query);
  }

  exportTaxesData(searchTerm: string | undefined): Observable<ExportTaxDto[]> {
    let query = `Tax/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<ExportTaxDto[]>(query);
  }
  constructor(private httpService: HttpService) {}
}

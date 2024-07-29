import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { TreasureDefinitionDto } from './models/treasureDefinitionsDto';
import { AddTreasuryDto, Balance, EditTreasuryDto, GetTreasuryDtoById, PaymentTermDto } from './models';
import { BankDefinitionDto } from './models/BankDefinitionDto';
import { AddBankDto } from './models/addBankDto';
import { UserPermission } from './models/user-permission';
import { bankByID } from './models/getBankByID';

@Injectable({
  providedIn: 'root'
})
export class FinanceProxyService {

  constructor(private httpService : HttpService) { }

  getTreasureDefinitions(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TreasureDefinitionDto>> {
    let query = `Treasury?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<TreasureDefinitionDto>>(query);
  }
  addTreasureDefinitions(obj : AddTreasuryDto) : Observable <AddTreasuryDto> {
    return this.httpService.post('Treasury' , obj);
  }
  EditTreasureDefinitionsById(obj : EditTreasuryDto) : Observable <EditTreasuryDto> {
    return this.httpService.put(`Treasury` , obj);
  }
  getTreasureDefinitionsById(id : number) : Observable <GetTreasuryDtoById> {
    return this.httpService.get(`Treasury/${id}`);
  }

  deleteTreasury(id : number) {
    return this.httpService.delete(`Treasury/${id}`);

  }
  getBranchLookup() : Observable<{ id: number; name: string }[]> {
    return this.httpService.get(`Branch/BranchDropDown`);
  }
  getChildrenAccountsDropDownLookup() : Observable<{ id: number; name: string }[]> {
    return this.httpService.get(`ChartOfAccounts/ChildrenAccountsDropDown`);
  }
  GetAccountOpeningBalance(id : number) : Observable<Balance> {
    return this.httpService.get(`ChartOfAccounts/GetAccountOpeningBalance?id=${id}`);

  }

  exportsTreasuryList(
    searchTerm: string | undefined
  ): Observable<TreasureDefinitionDto[]> {
    let query = `Treasury/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<TreasureDefinitionDto[]>(query);
  }
  getBankDefinitions(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<BankDefinitionDto>> {
    let query = `Bank?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<BankDefinitionDto>>(query);
  }

  addBankDefinition(obj : AddBankDto) {
    return this.httpService.post('Bank' , obj)

  }

  editBankDefinition(  obj : bankByID) : Observable<bankByID> {
    return this.httpService.put(`Bank/Edit` , obj);

  }

  deleteBank(id : number) {
    return this.httpService.delete(`Bank/${id}`);

  }

  getBankDefinitionByID(id:number) : Observable<bankByID> {
    return this.httpService.get(`Bank/${id}`)
  }

  getUserPermissionLookupData() : Observable<UserPermission[]>{
    return this.httpService.get(`user/UsersDropdownQuery`);

  }

  exportsBankList(
    searchTerm: string | undefined
  ): Observable<BankDefinitionDto[]> {
    let query = `Bank/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<BankDefinitionDto[]>(query);
  }
  getAllPymentTerm(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<PaymentTermDto>> {
    let query = `PaymentTerms?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<PaymentTermDto>>(query);
  }

  exportsPaymentTermList(
    searchTerm: string | undefined
  ): Observable<PaymentTermDto[]> {
    let query = `PaymentTerms/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<PaymentTermDto[]>(query);
  }
  deletePaymentTerm(id : number) {
    return this.httpService.delete(`PaymentTerms/${id}`);

  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { TreasureDefinitionDto } from './models/treasureDefinitionsDto';
import { AddPaymentMethodDto, AddPaymentTermDto, AddTreasuryDto, Balance, EditTreasuryDto, GetAllPaymentInDto, GetTreasuryDtoById, PaymentMethodDto, PaymentTermDto } from './models';
import { BankDefinitionDto } from './models/BankDefinitionDto';
import { AddBankDto } from './models/addBankDto';
import { UserPermission } from './models/user-permission';
import { bankByID } from './models/getBankByID';
import { AddPaymentTermComponent } from './pages/payment-term/add-payment-term/add-payment-term.component';
import { GetPaymentTermById } from './models/get-payment-term-by-id-dto';
import { BankAccountWithCurrency } from './models/bank-account-with-currency-dto';
import { GetPaymentMethodByIdDto } from './models/get-payment-method-by-id-dto';

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
  addPaymentTerm(obj : AddPaymentTermDto) {
    return this.httpService.post('PaymentTerms' , obj)

  }

  getPaymentTermByID(id:number) : Observable<GetPaymentTermById> {
    return this.httpService.get(`PaymentTerms/${id}`)
  }

  editPaymentTerm(  obj : GetPaymentTermById) : Observable<GetPaymentTermById> {
    return this.httpService.put(`PaymentTerms` , obj);

  }
  getAllPymentMethod(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<PaymentMethodDto>> {
    let query = `PaymentMethod?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<PaymentMethodDto>>(query);
  }

  exportsPaymentMethodList(
    searchTerm: string | undefined
  ): Observable<PaymentMethodDto[]> {
    let query = `PaymentMethod/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<PaymentMethodDto[]>(query);
  }
  deletePaymentMethod(id : number) {
    return this.httpService.delete(`PaymentMethod/${id}`);

  }

  BankAccountDropDown( bankId :number) : Observable<BankAccountWithCurrency[]> {
    return this.httpService.get(`Bank/BankAccountDropDown?bankId=${bankId}`);
  }

  BankDropDown() : Observable<{ id: number; name: string }[]> {
    return this.httpService.get(`Bank/BankDropDown`);
  }

  addPaymentMethod(obj : AddPaymentMethodDto) {
    return this.httpService.post('PaymentMethod' , obj)

  }
  getPaymentMethodByID(id:number) : Observable<GetPaymentMethodByIdDto> {
    return this.httpService.get(`PaymentMethod/${id}`)
  }
  editPaymentMethod(  obj : GetPaymentMethodByIdDto) : Observable<boolean> {
    return this.httpService.put(`PaymentMethod` , obj);

  }
  getAllPymentIn(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<GetAllPaymentInDto>> {
    let query = `PaymentIn?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<GetAllPaymentInDto>>(query);
  }

  exportsPaymentInList(
    searchTerm: string | undefined
  ): Observable<GetAllPaymentInDto[]> {
    let query = `PaymentIn/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<GetAllPaymentInDto[]>(query);
  }
  deletePaymentIn(id : number) {
    return this.httpService.delete(`PaymentIn/${id}`);

  }
  getTaxDropDown(): Observable<{ id: number; name: string }[]> {
    return this.httpService.get('Tax/Taxdropdown');
  }
}

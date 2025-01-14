import { GetPaymentTermById } from './../finance/models/get-payment-term-by-id-dto';
import { Injectable } from '@angular/core';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import {
  AccountDto,
  AddPaymentMethodDto,
  BankAccount,
  BankAccountWithCurrency,
  CurrencyDto,
  CurrencyRateDto,
  CustomerDropDown,
  DropDownDto,
  GetAllPaymentInDto,
  GetAllPaymentOutDto,
  LookupReturn,
  PaymentFilterDto,
  TreasuryDropDown,
  VendorDropDown,
  ViewPaymentInDto,
} from './models';
import { Observable } from 'rxjs';
import { GetPaymentMethodByIdDto } from './models/get-payment-method-by-id-dto';

@Injectable({
  providedIn: 'root',
})
export class TranscationsProxyService {
  constructor(private httpService: HttpService) {}

  BankAccountDropDown(bankId: number): Observable<BankAccountWithCurrency[]> {
    return this.httpService.get(`Bank/BankAccountDropDown?bankId=${bankId}`);
  }

  BankDropDown(): Observable<DropDownDto[]> {
    return this.httpService.get(`Bank/BankDropDown`);
  }
  treasuryDropDown(): Observable<TreasuryDropDown[]> {
    return this.httpService.get(`Treasury/GetAllTreasuriesDropdown`);
  }
  CustomerDropdown(): Observable<CustomerDropDown[]> {
    return this.httpService.get(`Customer/GetAllCustomersDropdown`);
  }
  VendorDropdown(): Observable<VendorDropDown[]> {
    return this.httpService.get(`Vendor/GetAllVendorsDropdown`);
  }

  addPaymentMethod(obj: AddPaymentMethodDto) {
    return this.httpService.post('PaymentMethod', obj);
  }
  getPaymentMethodByID(id: number): Observable<GetPaymentMethodByIdDto> {
    return this.httpService.get(`PaymentMethod/${id}`);
  }
  editPaymentMethod(obj: GetPaymentMethodByIdDto): Observable<boolean> {
    return this.httpService.put(`PaymentMethod`, obj);
  }
  addPaymentIn(obj: any) {
    return this.httpService.post('PaymentIn', obj);
  }
  addPaymentOut(obj: any) {
    return this.httpService.post('PaymentOut', obj);
  }
  GetAllPayMethodsDropdown(bankId: number, BankAccountId: number): Observable<any[]> {
    return this.httpService.get(
      `PaymentMethod/GetAllBankPaymentMethodsDropdown/${bankId}/${BankAccountId}`
    );
  }
  GetAllTreasuriesPaymentMethodsDropdown(): Observable<any[]> {
    return this.httpService.get(`PaymentMethod/GetAllTreasuriesPaymentMethodsDropdown`);
  }
  GetTreasuryBalance(id: number): Observable<number> {
    return this.httpService.get(`Treasury/GetBalance/${id}`);
  }
  GetAccountBalance(id: number): Observable<number> {
    return this.httpService.get(`Bank/GetAccountBalance/${id}`);
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
  }

  getAccountCurrencyRate(currentCurrency: number, accountCurrency: number) {
    return this.httpService.get<CurrencyRateDto>(
      `CurrencyConversion/rate?FromCurrencyId=${currentCurrency}&ToCurrencyId=${accountCurrency}`
    );
  }
  getAllPymentIn(
    searchTerm: string,
    pageInfo: PageInfo,
    filter?: PaymentFilterDto
  ): Observable<PaginationVm<GetAllPaymentInDto>> {
    let query = `PaymentIn?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    if (filter) {
      Object.keys(filter).forEach((key) => {
        const value = filter[key];
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              query += `&${key}=${encodeURIComponent(val)}`;
            });
          } else {
            query += `&${key}=${encodeURIComponent(value)}`;
          }
        }
      });
    }
    return this.httpService.get<PaginationVm<GetAllPaymentInDto>>(query);
  }

  exportsPaymentInList(
    searchTerm?: string,
    SortBy?: number,
    SortColumn?: string
  ): Observable<GetAllPaymentInDto[]> {
    let query = `PaymentIn/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<GetAllPaymentInDto[]>(query);
  }
  deletePaymentIn(id: number) {
    return this.httpService.delete(`PaymentIn/${id}`);
  }
  PaymentInDeleteLine(id: number) {
    return this.httpService.delete(`PaymentIn/DeleteLine/${id}`);
  }

  paymentOutDeleteLine(id: number) {
    return this.httpService.delete(`PaymentOut/DeleteLine/${id}`);
  }
  getTaxDropDown(): Observable<DropDownDto[]> {
    return this.httpService.get('Tax/Taxdropdown');
  }
  GetPaymentInById(id: number): Observable<number> {
    return this.httpService.get(`PaymentIn/${id}`);
  }
  editPaymentIn(obj: any): Observable<boolean> {
    return this.httpService.put(`PaymentIn`, obj);
  }

  GetPaymentOutById(id: number): Observable<number> {
    return this.httpService.get(`PaymentOut/${id}`);
  }

  editPaymentOut(obj: any): Observable<boolean> {
    return this.httpService.put(`PaymentOut`, obj);
  }

  getAllPymentOut(
    searchTerm: string,
    pageInfo: PageInfo,
    filter?: PaymentFilterDto
  ): Observable<PaginationVm<GetAllPaymentOutDto>> {
    let query = `PaymentOut?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        const value = filter[key];
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((val) => {
              query += `&${key}=${encodeURIComponent(val)}`;
            });
          } else {
            query += `&${key}=${encodeURIComponent(value)}`;
          }
        }
      });
    }

    return this.httpService.get<PaginationVm<GetAllPaymentOutDto>>(query);
  }

  exportsPaymentOutList(searchTerm: string | undefined): Observable<GetAllPaymentInDto[]> {
    let query = `PaymentOut/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<GetAllPaymentOutDto[]>(query);
  }

  deletePaymentOut(id: number) {
    return this.httpService.delete(`PaymentOut/${id}`);
  }
  viewPaymentInById(id: number): Observable<ViewPaymentInDto> {
    return this.httpService.get(`PaymentIn/GetView/${id}`);
  }
  viewPaymentOutById(id: number): Observable<number> {
    return this.httpService.get(`PaymentOut/GetView/${id}`);
  }

  postPaymentIn(id: number) {
    return this.httpService.post(`PaymentIn/${id}/Post`, null);
  }

  postPaymentOut(id: number) {
    return this.httpService.post(`PaymentOut/${id}/Post`, null);
  }

  paymentInStatusLookup(): Observable<LookupReturn[]> {
    return this.httpService.get('Lookup?lookups=PaymentInStatus');
  }
  paymentOutStatusLookup(): Observable<LookupReturn[]> {
    return this.httpService.get('Lookup?lookups=PaymentOutStatus');
  }
  paymentHub(): Observable<LookupReturn[]> {
    return this.httpService.get('Lookup?lookups=PaymentPlace');
  }

  getCurrencyDropDown(): Observable<CurrencyDto[]> {
    return this.httpService.get('Currency/CurrencyDropDown');
  }

  multiBankAccountDropDown(banksId: number[]): Observable<BankAccount[]> {
    let query = 'Bank/MultiBankAccountDropDown?';
    query += banksId.map((bankId) => `BankIds=${bankId}`).join('&');

    return this.httpService.get(query);
  }
}

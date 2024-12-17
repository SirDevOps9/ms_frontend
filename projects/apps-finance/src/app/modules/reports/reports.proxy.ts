import { Injectable } from '@angular/core';
import { HttpService } from 'shared-lib';
import {
  BankAccountStatementDto,
  BankAccountStatementfilterDto,
  BankAccountWithCurrency,
  DropDownDto,
  treasuryStatementDto,
  TreasuryStatementfilterDto,
} from './models';
import { Observable } from 'rxjs';
import { DateOftheYear } from './models/Report-YearDate';

@Injectable({
  providedIn: 'root',
})
export class ReportsProxy {
  constructor(private httpService: HttpService) {}

  getBankAccountStatement(
    filter: BankAccountStatementfilterDto
  ): Observable<BankAccountStatementDto> {
    return this.httpService.post<BankAccountStatementfilterDto>(
      `FinanceReports/BankAccountStatement`,
      filter
    );
  }

  BankAccountDropDown(bankId: number): Observable<BankAccountWithCurrency[]> {
    return this.httpService.get(`Bank/BankAccountDropDown?bankId=${bankId}`);
  }

  BankDropDown(): Observable<DropDownDto[]> {
    return this.httpService.get(`Bank/BankDropDown`);
  }

  getTreasuryStatement(filter: TreasuryStatementfilterDto): Observable<treasuryStatementDto> {
    return this.httpService.post<treasuryStatementDto>(`FinanceReports/TreasuryStatement`, filter);
  }
  GetReportYearByDate(): Observable<DateOftheYear> {
    return this.httpService.get<DateOftheYear>(`FinancialYear/GetReportYearByDate`);
  }
}

import { Injectable } from '@angular/core';
import { reportAccount } from 'projects/apps-accounting/src/app/modules/journal-entry/models';
import { HttpService } from 'shared-lib';
import { BankAccountStatementDto, BankAccountStatementfilterDto } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsProxy {
  constructor(private httpService: HttpService) {}

  getBankAccountStatement(
    filter: BankAccountStatementfilterDto
  ): Observable<BankAccountStatementDto[]> {
    return this.httpService.post<BankAccountStatementfilterDto>(
      `FinanceReports/BankAccountStatement`,
      filter
    );
  }
}

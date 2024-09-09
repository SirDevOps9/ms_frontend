import { Injectable } from '@angular/core';
import { BankAccountStatementDto, BankAccountStatementfilterDto } from './models';
import { BehaviorSubject } from 'rxjs';
import { ToasterService, LanguageService, LoaderService, RouterService } from 'shared-lib';
import { ReportsProxy } from './reports.proxy';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(
    private reportsProxy: ReportsProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private routerService: RouterService
  ) {}

  private bankAccountStatementDataSource = new BehaviorSubject<BankAccountStatementDto[]>([]);
  public BankAccountStatementObservable = this.bankAccountStatementDataSource.asObservable();

  getBankAccountStatement(filter: BankAccountStatementfilterDto) {
    this.loaderService.show();
    this.reportsProxy.getBankAccountStatement(filter).subscribe({
      next: (response) => {
        this.loaderService.hide();
        this.bankAccountStatementDataSource.next(response);
      },
      error: (error) => {
        this.loaderService.hide();
      },
    });
  }
}

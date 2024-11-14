import { Injectable } from '@angular/core';
import {
  BankAccountStatementDto,
  BankAccountStatementfilterDto,
  treasuryStatementDto,
  TreasuryStatementfilterDto,
} from './models';
import { BehaviorSubject } from 'rxjs';
import { ToasterService, LanguageService, LoaderService, RouterService } from 'shared-lib';
import { ReportsProxy } from './reports.proxy';
import { DateOftheYear } from './models/Report-YearDate';

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

  private bankAccountStatementDataSource = new BehaviorSubject<BankAccountStatementDto>(
    {} as BankAccountStatementDto
  );
  public BankAccountStatementObservable = this.bankAccountStatementDataSource.asObservable();
  public ReportYearByDate = new BehaviorSubject<DateOftheYear>({} as DateOftheYear);
  ReportYearByDate$ = this.ReportYearByDate.asObservable();

  public getBankDropDownData = new BehaviorSubject<any>([]);
  getBankDropDownDataObservable = this.getBankDropDownData.asObservable();

  public treasuryStatementDataSource = new BehaviorSubject<treasuryStatementDto>(
    {} as treasuryStatementDto
  );
  public treasuryStatementObservable = this.treasuryStatementDataSource.asObservable();

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

  bankAccountDropDown(id: number) {
    return this.reportsProxy.BankAccountDropDown(id);
  }

  bankDropDown() {
    this.reportsProxy.BankDropDown().subscribe((res) => {
      if (res) {
        this.getBankDropDownData.next(res);
      }
    });
  }

  getTreasuryStatement(filter: TreasuryStatementfilterDto) {
    this.loaderService.show();
    this.reportsProxy.getTreasuryStatement(filter).subscribe({
      next: (response) => {
        this.treasuryStatementDataSource.next(response);
        this.loaderService.hide();
      },
      error: (error) => {
        this.loaderService.hide();
      },
    });
  }
  GetReportYearByDate() {
    this.reportsProxy.GetReportYearByDate().subscribe({
      next: (response) => {
        console.log(response);
        this.ReportYearByDate.next(response);
      },
      error: (error) => {
        this.loaderService.hide();
      },
    });
  }
}

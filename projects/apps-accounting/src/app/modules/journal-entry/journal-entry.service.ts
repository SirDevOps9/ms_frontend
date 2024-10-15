import { Injectable } from '@angular/core';
import {
  AddJournalEntryCommandOpeningBalance,
  EditJournalEntry,
  JournalEntryDto,
  JournalEntryStatus,
  TrialBalance,
  reportAccount,
  reportCostAllData,
  reportCostCenter,
} from './models';
import { BehaviorSubject, catchError, map } from 'rxjs';
import {
  AttachmentsService,
  LanguageService,
  LoaderService,
  PageInfo,
  PageInfoResult,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { JournalEntryProxy } from './journal-entry.proxy';
import { AddJournalEntryCommand } from './models/addJournalEntryCommand';
import { JournalStatusUpdate } from './models/update-status';

@Injectable({
  providedIn: 'root',
})
export class JournalEntryService {
  attachmentDeleted:boolean=false
  private journalEntriesDataSource = new BehaviorSubject<JournalEntryDto[]>([]);
  private journalEntriesOpeningBalanceDataSource = new BehaviorSubject<JournalEntryDto[]>([]);
  private trialDataSource = new BehaviorSubject<TrialBalance[]>([]);
  private accountReportsDataSource = new BehaviorSubject<reportAccount[]>([]);
  private CostCenterReportsDataSource = new BehaviorSubject<reportCostAllData[]>([]);
  public editJournalLineStatusDataSource = new BehaviorSubject<boolean | undefined>(undefined);
  // public attachmentDeleted = new BehaviorSubject<boolean>(false);
  // public attachmentDeletedObser = this.attachmentDeleted.asObservable();

  public journalEntries = this.journalEntriesDataSource.asObservable();
  public journalEntriesObs = this.journalEntriesOpeningBalanceDataSource.asObservable();
  public report = this.trialDataSource.asObservable();
  public accountReport = this.accountReportsDataSource.asObservable();
  public CostCenterReport = this.CostCenterReportsDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  public journalStatus = new BehaviorSubject<JournalEntryStatus>(JournalEntryStatus.Unbalanced);

  private exportsJournalEntriesDataSource = new BehaviorSubject<JournalEntryDto[]>([]);
  public exportsJournalEntriesDataSourceObservable =
    this.exportsJournalEntriesDataSource.asObservable();
  constructor(
    private journalEntryProxy: JournalEntryProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private routerService: RouterService,
    private attachmentService: AttachmentsService,

  ) {}

  getAllJournalEntriesPaginated(searchTerm: string, pageInfo: PageInfo) {
    this.journalEntryProxy.getAllPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.journalEntriesDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  getAllJournalEntriesPaginatedOpeningBalance(searchTerm: string, pageInfo: PageInfo) {
    this.journalEntryProxy
      .getAllJournalEntriesPaginatedOpeningBalance(searchTerm, pageInfo)
      .subscribe({
        next: (res) => {
          this.journalEntriesOpeningBalanceDataSource.next(res.result);
          this.currentPageInfo.next(res.pageInfoResult);
        },
      });
  }

  exportsEmployeesList(searchTerm: string | undefined) {
    this.journalEntryProxy.exportGLOpeningBalance(searchTerm).subscribe({
      next: (res) => {
        this.journalEntriesOpeningBalanceDataSource.next(res);
      },
    });
  }

  addJournalEntry(command: AddJournalEntryCommand) {
    return this.journalEntryProxy.create(command);
  }
  addJournalEntryopeningBalance(command: AddJournalEntryCommandOpeningBalance) {
    return this.journalEntryProxy.addJournalEntryopeningBalance(command);
  }

  getJournalEntryById(Id: number) {
    return this.journalEntryProxy.getById(Id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err!;
      })
    );
  }
  getJournalEntryOpeningBalanceById(Id: number) {
    return this.journalEntryProxy.getJournalEntryOpeningBalanceById(Id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err!;
      })
    );
  }

  getJournalEntryViewById(Id: number) {
    return this.journalEntryProxy.getJournalView(Id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err!;
      })
    );
  }
  ChangeStatus(journalStatusUpdate: JournalStatusUpdate) {
    return this.journalEntryProxy.ChangeStatus(journalStatusUpdate).pipe(
      map((res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Journal.Success'),
          this.languageService.transalte('Journal.UpdatedSuccessfully')
        );
        return res;
      }),
      catchError((err: string) => {
        throw err!;
      })
    );
  }
  ChangeStatusOpeneingBalance(journalStatusUpdate: JournalStatusUpdate) {
    return this.journalEntryProxy.ChangeStatusOpeneingBalance(journalStatusUpdate).pipe(
      map((res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('OpeningBalance.Success'),
          this.languageService.transalte('OpeningBalance.UpdatedSuccessfully')
        );
        return res;
      }),
      catchError((err: string) => {
        throw err!;
      })
    );
  }

  editJournalEntry(request: EditJournalEntry) {
    this.loaderService.show();
    this.journalEntryProxy.edit(request).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Journal.Success'),
          this.languageService.transalte('Journal.UpdatedSuccessfully')
        );
        this.loaderService.hide();
        this.attachmentService.attachemntIdsList=[]
        this.editJournalLineStatusDataSource.next(true);
        // setTimeout(() => {
        //   location.reload();
        // }, 1500);
      },
      error: () => {
        this.editJournalLineStatusDataSource.next(false);
        this.loaderService.hide();
      },
    });
  }
  editJournalEntryOpeningBalance(request: EditJournalEntry) {
    this.journalEntryProxy.editJournalEntryOpeningBalance(request).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('OpeningBalance.Success'),
          this.languageService.transalte('OpeningBalance.UpdatedSuccessfully')
        );

        this.routerService.navigateTo('transcations/journal-entry-opening-balance');
      },
    });
  }

  async deleteJournalEntryLine(id: number): Promise<boolean> {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    const p = new Promise<boolean>((res, rej) => {
      if (confirmed) {
        this.journalEntryProxy.deleteJounralEntryLine(id).subscribe({
          next: (status) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('Journal.Success'),
              this.languageService.transalte('Journal.DeletedSuccessfully')
            );
            this.loaderService.hide();
            this.journalStatus.next(status);

            res(true);
          },
        });
      } else {
        res(false);
      }
    });
    return await p;
  }
  async deleteJournalEntryLineOpeningBalance(id: number): Promise<boolean> {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    const p = new Promise<boolean>((res, rej) => {
      if (confirmed) {
        this.journalEntryProxy.deleteJournalEntryLineOpeningBalance(id).subscribe({
          next: (status) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('OpeningBalance.Success'),
              this.languageService.transalte('OpeningBalance.DeletedSuccessfully')
            );
            this.loaderService.hide();
            this.journalStatus.next(status);

            res(true);
          },
        });
      } else {
        res(false);
      }
    });
    return await p;
  }

  getAllJournalTemplatesPaginated(pageInfo: PageInfo) {
    return this.journalEntryProxy.getAllJournalTemplate(pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getJournalTemplateById(id: string) {
    return this.journalEntryProxy.getJournalTemplateById(id).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getTrialBalance(trial: TrialBalance) {
    this.journalEntryProxy.getTrialBalance(trial).subscribe((response) => {
      this.trialDataSource.next(response);
    });
  }
  getAccountingReports(trial: reportAccount) {
    this.loaderService.show();
    this.journalEntryProxy.getAccountingReports(trial).subscribe({
      next: (response) => {
        this.loaderService.hide();

        this.accountReportsDataSource.next(response);
      },
      error: (error) => {
        this.loaderService.hide();
      },
    });
  }

  exportJournalEntriesData(searchTerm: string | undefined) {
    this.journalEntryProxy.exportJournalEntriesData(searchTerm).subscribe({
      next: (res) => {
        this.exportsJournalEntriesDataSource.next(res);
      },
    });
  }

  getCostCenterLookup() {
    return this.journalEntryProxy.getAccountLookup();
  }
  getCostCenterReports(cost: reportCostAllData) {
    this.journalEntryProxy.getCostCenterReports(cost).subscribe((response) => {
      this.CostCenterReportsDataSource.next(response);
    });
  }
  getOpenFinancialPeriodDate() {
    return this.journalEntryProxy.getOpenFinancialPeriodDate().pipe(
      map((res) => {
        return res;
      })
    );
  }
  getOpenFinancialYearDate() {
    return this.journalEntryProxy.getOpenFinancialYearDate().pipe(
      map((res) => {
        return res;
      })
    );
  }
  async deleteAttachment(attachmentId: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.loaderService.show();
      this.journalEntryProxy.DeleteAttachment(attachmentId).subscribe({
        next: (res) => {
          this.attachmentDeleted=true;

          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('attachmentDeletedSuccessfully')
          );
          this.loaderService.hide();
        },
        error: () => {
          this.loaderService.hide();
          this.attachmentDeleted=false;

          this.toasterService.showError(
            this.languageService.transalte('error'),
            this.languageService.transalte('CannotDeleteattachment')   

          );
        },
      });
    }else{
      this.attachmentDeleted=false;

    }
  }
}

import { Injectable } from '@angular/core';
import { AddJournalEntryCommandOpeningBalance, EditJournalEntry, JournalEntryDto, JournalEntryStatus, TrialBalance, reportAccount } from './models';
import { BehaviorSubject, catchError, map } from 'rxjs';
import {
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
  private journalEntriesDataSource = new BehaviorSubject<JournalEntryDto[]>([]);
  private journalEntriesOpeningBalanceDataSource = new BehaviorSubject<JournalEntryDto[]>([]);
  private trialDataSource = new BehaviorSubject<TrialBalance[]>([]);
  private accountReportsDataSource = new BehaviorSubject<reportAccount[]>([]);


  public journalEntries = this.journalEntriesDataSource.asObservable();
  public journalEntriesObs = this.journalEntriesOpeningBalanceDataSource.asObservable();
  public report = this.trialDataSource.asObservable();
  public accountReport = this.accountReportsDataSource.asObservable();



  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  public  journalStatus= new BehaviorSubject<JournalEntryStatus>(JournalEntryStatus.Unbalanced);

  private exportsJournalEntriesDataSource = new BehaviorSubject<JournalEntryDto[]>([]);
  public exportsJournalEntriesDataSourceObservable = this.exportsJournalEntriesDataSource.asObservable();
  constructor(
    private journalEntryProxy: JournalEntryProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private routerService  :RouterService
  ) {}

  getAllJournalEntriesPaginated(searchTerm: string ,pageInfo: PageInfo) {

    this.journalEntryProxy.getAllPaginated(searchTerm , pageInfo).subscribe({
      next: (res) => {
        this.journalEntriesDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
    
  }
  getAllJournalEntriesPaginatedOpeningBalance(searchTerm: string ,pageInfo: PageInfo) {

    this.journalEntryProxy.getAllJournalEntriesPaginatedOpeningBalance(searchTerm , pageInfo).subscribe({
      next: (res) => {
        this.journalEntriesOpeningBalanceDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
    
  }

  exportsEmployeesList(searchTerm:string | undefined) {
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
          this.languageService.transalte('Success'),
          this.languageService.transalte('JournalEntry.JournalUpdatedSuccessfully')
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
          this.languageService.transalte('Success'),
          this.languageService.transalte('JournalEntry.JournalUpdatedSuccessfully')
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
          this.languageService.transalte('Success'),
          this.languageService.transalte('JournalEntry.JournalUpdatedSuccessfully')
        );
        this.loaderService.hide();

        setTimeout(() => {
          location.reload();
        }, 1500);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }
  editJournalEntryOpeningBalance(request: EditJournalEntry) {
    this.journalEntryProxy.editJournalEntryOpeningBalance(request).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('JournalEntry.JournalUpdatedSuccessfully')
        );

        this.routerService.navigateTo('transcations/journal-entry-opening-balance')

       
      },
     
    });
  }

  async deleteJournalEntryLine(id: number): Promise<boolean > {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    const p = new Promise<boolean>((res, rej) => {
      if (confirmed) {
        this.journalEntryProxy.deleteJounralEntryLine(id).subscribe({
          next: (status) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('Success'),
              this.languageService.transalte('Deleted Successfully')
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
  async deleteJournalEntryLineOpeningBalance(id: number): Promise<boolean > {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    const p = new Promise<boolean>((res, rej) => {
      if (confirmed) {
        this.journalEntryProxy.deleteJournalEntryLineOpeningBalance(id).subscribe({
          next: (status) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('Success'),
              this.languageService.transalte('Deleted Successfully')
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
  getTrialBalance(trial:TrialBalance) {
    this.journalEntryProxy.getTrialBalance(trial).subscribe((response) => {
      this.trialDataSource.next(response);
    });
  }
  getAccountingReports(trial:reportAccount) {
    this.journalEntryProxy.getAccountingReports(trial).subscribe((response) => {
      this.accountReportsDataSource.next(response);
    });
  }

  exportJournalEntriesData(searchTerm:string | undefined) {
    this.journalEntryProxy.exportJournalEntriesData(searchTerm).subscribe({
      next: (res) => {
         this.exportsJournalEntriesDataSource.next(res);
      },
    });
  }

 
}

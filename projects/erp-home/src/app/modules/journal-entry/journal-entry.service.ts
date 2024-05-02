import { Injectable } from '@angular/core';
import { EditJournalEntry, JournalEntryDto } from './models';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { LanguageService, LoaderService, PageInfo, ToasterService } from 'shared-lib';
import { JournalEntryProxy } from './journal-entry.proxy';
import { AddJournalEntryCommand } from './models/addJournalEntryCommand';
import { JournalStatusUpdate } from './models/update-status';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {
  private journalEntriesDataSource = new BehaviorSubject<JournalEntryDto[]>([]);

  public journalEntries = this.journalEntriesDataSource.asObservable();


  constructor(
    private journalEntryProxy: JournalEntryProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
  ) { }

  getAllJournalEntriesPaginated(pageInfo: PageInfo) {
    return this.journalEntryProxy.getAllPaginated(pageInfo).pipe(map(res => { return res }));
  }

  addJournalEntry(command: AddJournalEntryCommand) {
    return this.journalEntryProxy.create(command);
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

  editJournalEntry(request: EditJournalEntry) {
    this.loaderService.show();
    this.journalEntryProxy.edit(request).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('JournalEntry.JournalUpdatedSuccessfully')
        );
        this.loaderService.hide();

      },
      error: () => {
        this.loaderService.hide();
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
          next: () => {
            this.toasterService.showSuccess(
              this.languageService.transalte('Success'),
              this.languageService.transalte('Deleted Successfully')
            );
            this.loaderService.hide();
            res(true);
          },
        });
      } else {
        res(false);
      }

    })
    return await p;
  }


}

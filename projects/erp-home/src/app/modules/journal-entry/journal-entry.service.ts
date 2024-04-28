import { Injectable } from '@angular/core';
import { JournalEntryDto } from './models';
import { BehaviorSubject } from 'rxjs';
import { LanguageService, LoaderService, PageInfo, PaginationVm, ToasterService } from 'shared-lib';
import { JournalEntryProxy } from './journal-entry.proxy';

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
  ) {}

  getAllJournalEntriesPaginated(pageInfo: PageInfo) {
    this.journalEntryProxy.getAllPaginated(pageInfo).subscribe({
      next: (res) => {
        this.journalEntriesDataSource.next(res.result);
        this.journalEntriesDataSource.next(res.result);
      },
    });
  }
}

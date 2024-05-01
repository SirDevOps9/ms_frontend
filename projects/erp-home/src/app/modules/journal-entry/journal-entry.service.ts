import { Injectable } from '@angular/core';
import { JournalEntryDto } from './models';
import { BehaviorSubject, map } from 'rxjs';
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
  ) { }

  getAllJournalEntriesPaginated(pageInfo: PageInfo) {
    return this.journalEntryProxy.getAllPaginated(pageInfo).pipe(map(res => { return res }));
  }

  getAllJournalTemplatesPaginated(pageInfo: PageInfo) {
    return this.journalEntryProxy.getAllJournalTemplate(pageInfo).pipe(map(res => { return res }));
  }
  
  getJournalTemplateById(id:string){
    return this.journalEntryProxy.getJournalTemplateById(id).pipe(map(res => { return res }));
  }
}

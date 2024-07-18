import { FilterDto, HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { JournalEntryDto, JournalEntryStatus, JournalEntryViewDto, TrialBalance, reportAccount } from './models';
import { Observable } from 'rxjs';
import { AddJournalEntryCommand } from './models/addJournalEntryCommand';
import { EditJournalEntry, GetJournalEntryByIdDto } from './models';

import { Injectable } from '@angular/core';
import { GetAllJournalTemplateDto } from './models/journaltemplatedto';
import { GetJournalTemplateDto } from './models/journalTemplateByIdDto';

@Injectable({
  providedIn: 'root',
})
export class JournalEntryProxy {
  getAll(): Observable<JournalEntryDto[]> {
    return this.httpService.get<JournalEntryDto[]>(
      // `Company?subscriptionId=${subscriptionId}`
      `JournalEntry`
    );
  }
  getAllPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<JournalEntryDto>> {
    return this.httpService.get<PaginationVm<JournalEntryDto>>(`JournalEntry?SearchTerm=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`);
  }

  create(command: AddJournalEntryCommand): Observable<any> {
    return this.httpService.post('JournalEntry', command);
  }

  getById(id: number): Observable<GetJournalEntryByIdDto> {
    return this.httpService.get<GetJournalEntryByIdDto>(`JournalEntry/GetById?Id=${id}`);
  }
  edit(request: EditJournalEntry): Observable<boolean> {
    return this.httpService.put<boolean>(`JournalEntry/Edit`, request);
  }

  ChangeStatus(request: any): Observable<boolean> {
    return this.httpService.put<boolean>(`JournalEntry/ChangeStatus`, request);
  }

  deleteJounralEntryLine(id: number): Observable<JournalEntryStatus> {
    return this.httpService.delete<number>(`JournalEntry/DeleteLine?Id=${id}`);
  }
  getAllJournalTemplate(filterDto: FilterDto): Observable<PaginationVm<GetAllJournalTemplateDto>> {
    return this.httpService.get<PaginationVm<GetAllJournalTemplateDto>>(
      `JournalEntryTemplete?${filterDto.toQuery}`
    );
  }

  getJournalTemplateById(id: string) {
    return this.httpService.get<GetJournalTemplateDto>(`JournalEntryTemplete/GetById?Id=${id}`);
  }

  getJournalView(id: number): Observable<JournalEntryViewDto> {
    return this.httpService.get<JournalEntryViewDto>(`JournalEntry/View?Id=${id}`);
  }
  getTrialBalance(trial:TrialBalance){
    return this.httpService.post<TrialBalance>(`TrialBalance`,trial);
  }
  getAccountingReports(accounts:reportAccount){
    return this.httpService.post<reportAccount>(`AccountingReports/AccountStatmentReport`,accounts);
  }

  constructor(private httpService: HttpService) {}
}

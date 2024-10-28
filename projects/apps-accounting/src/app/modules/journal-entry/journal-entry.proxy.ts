import { FilterDto, HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AddJournalEntryCommandOpeningBalance, GetGlOpeningBalanceById, GetOpenFinancialPeriodDate, JournalEntryDto, JournalEntryStatus, JournalEntryViewDto, TrialBalance, costLookup, reportAccount, reportCostAllData, reportCostCenter } from './models';
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
    let query = `JournalEntry?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
  
    return this.httpService.get<PaginationVm<JournalEntryDto>>(query);
  }
  getAllJournalEntriesPaginatedOpeningBalance(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<JournalEntryDto>> {
    let query = `OpeningBalanceJournalEntry?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
  
   
    return this.httpService.get<PaginationVm<JournalEntryDto>>(query);
  }

  create(command: AddJournalEntryCommand): Observable<any> {
    return this.httpService.post('JournalEntry', command);
  }
  addJournalEntryopeningBalance(command: AddJournalEntryCommandOpeningBalance): Observable<any> {
    return this.httpService.post('OpeningBalanceJournalEntry', command);
  }


  exportGLOpeningBalance(
    searchTerm: string | undefined
  ): Observable<JournalEntryDto[]> {
    let query = `OpeningBalanceJournalEntry/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<JournalEntryDto[]>(query);
  }
  

  getById(id: number): Observable<GetJournalEntryByIdDto> {
    return this.httpService.get<GetJournalEntryByIdDto>(`JournalEntry/GetById?Id=${id}`);
  }
  getJournalEntryOpeningBalanceById(id: number): Observable<GetGlOpeningBalanceById> {
    return this.httpService.get<GetGlOpeningBalanceById>(`OpeningBalanceJournalEntry/GetById?Id=${id}`);
  }
  edit(request: EditJournalEntry): Observable<boolean> {
    return this.httpService.put<boolean>(`JournalEntry/Edit`, request);
  }
  editJournalEntryOpeningBalance(request: EditJournalEntry): Observable<boolean> {
    return this.httpService.put<boolean>(`OpeningBalanceJournalEntry/Edit`, request);
  }

  ChangeStatus(request: any): Observable<boolean> {
    return this.httpService.put<boolean>(`JournalEntry/ChangeStatus`, request);
  }
  ChangeStatusOpeneingBalance(request: any): Observable<boolean> {
    return this.httpService.put<boolean>(`OpeningBalanceJournalEntry/ChangeStatus`, request);
  }

  deleteJounralEntryLine(id: number): Observable<JournalEntryStatus> {
    return this.httpService.delete<number>(`JournalEntry/DeleteLine?Id=${id}`);
  }
  DeleteAttachment(id: number): Observable<any> {
    return this.httpService.delete<number>(`JournalEntry/DeleteAttachment?Id=${id}`);
  }
  deleteJournalEntryLineOpeningBalance(id: number): Observable<JournalEntryStatus> {
    return this.httpService.delete<number>(`OpeningBalanceJournalEntry/DeleteLine?Id=${id}`);
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
  getAccountLookup(): Observable<costLookup[]> {
    return this.httpService.get('CostCenter/CostCenterDropDown');
  }
  
  exportJournalEntriesData(
    searchTerm: string | undefined
  ): Observable<JournalEntryDto[]> {
    let query = `JournalEntry/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<JournalEntryDto[]>(query);
  }
  getCostCenterReports(cost:reportCostAllData){
    return this.httpService.post<reportAccount>(`CostCenterReports`,cost);
  }

  getOpenFinancialPeriodDate(): Observable<GetOpenFinancialPeriodDate>{
    return this.httpService.get<GetOpenFinancialPeriodDate>(`FinancialYear/GetOpenFinancialPeriodDate`);
  }
  getOpenFinancialYearDate(): Observable<GetOpenFinancialPeriodDate>{
    return this.httpService.get<GetOpenFinancialPeriodDate>(`FinancialYear/GetOpenFinancialYearDate`);
  }

  constructor(private httpService: HttpService) {}
}

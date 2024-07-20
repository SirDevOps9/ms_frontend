import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { TreasureDefinitionDto } from './models/treasureDefinitionsDto';
import { AddTreasuryDto, Balance, EditTreasuryDto, GetTreasuryDtoById } from './models';

@Injectable({
  providedIn: 'root'
})
export class FinanceProxyService {

  constructor(private httpService : HttpService) { }

  getTreasureDefinitions(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TreasureDefinitionDto>> {
    let query = `Treasury?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<TreasureDefinitionDto>>(query);
  }
  addTreasureDefinitions(obj : AddTreasuryDto) : Observable <AddTreasuryDto> {
    return this.httpService.post('Treasury' , obj);
  }
  EditTreasureDefinitionsById(obj : EditTreasuryDto) : Observable <EditTreasuryDto> {
    return this.httpService.put(`Treasury` , obj);
  }
  getTreasureDefinitionsById(id : number) : Observable <GetTreasuryDtoById> {
    return this.httpService.get(`Treasury/${id}`);
  }

  deleteTreasury(id : number) {
    return this.httpService.get(`Treasury/${id}`);

  }
  getBranchLookup() : Observable<{ id: number; name: string }[]> {
    return this.httpService.get(`Branch/BranchDropDown`);
  }
  getChildrenAccountsDropDownLookup() : Observable<{ id: number; name: string }[]> {
    return this.httpService.get(`ChartOfAccounts/ChildrenAccountsDropDown`);
  }
  GetAccountOpeningBalance(id : number) : Observable<Balance> {
    return this.httpService.get(`ChartOfAccounts/GetAccountOpeningBalance?id=${id}`);

  }

  exportsTreasuryList(
    searchTerm: string | undefined
  ): Observable<TreasureDefinitionDto[]> {
    let query = `Treasury/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
     return this.httpService.get<TreasureDefinitionDto[]>(query);
  }
  
}

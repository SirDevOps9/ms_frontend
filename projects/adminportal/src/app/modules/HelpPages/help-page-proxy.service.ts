import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDto, HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AddHelpPage, HelpPagesList } from './models/heloPage';

@Injectable({
  providedIn: 'root'
})
export class HelpPageProxyService {
private _baseService= inject(HttpService)

getAllHelpsPages(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<HelpPagesList[]>> {
  let query = `HelpPage/pages-with-help?${pageInfo.toQuery}`;
  if (searchTerm) {
    query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
  }
  return this._baseService.get<PaginationVm<HelpPagesList[]>>(query)

}

getPageById(id : number ): Observable<AddHelpPage>{
  return this._baseService.get(`HelpPage/HelpPage/${id}`)
}
updateHelpPage( id :number, obj:AddHelpPage) {
  return this._baseService.put(`HelpPage/edit/${id}` , obj) 
 }
  //  add 
  addHelpPage(obj:AddHelpPage) {
    return this._baseService.post('HelpPage/Create' , obj)
  }


}

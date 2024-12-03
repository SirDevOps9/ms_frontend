import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PaginationVm,PageInfo } from 'shared-lib';
import { AddCMS, CMSList } from './models/cms';

@Injectable({
  providedIn: 'root'
})
export class CMSProxyService {

  private _baseService= inject(HttpService)

getAllCMS(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<CMSList[]>> {
  let query = `WebsiteHelpPage/pages-with-help?${pageInfo.toQuery}`;
  if (searchTerm) {
    query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
  }
  return this._baseService.get<PaginationVm<CMSList[]>>(query)
}

getCMSById(id : number ): Observable<AddCMS>{
  return this._baseService.get(`WebsiteHelpPage/WebsiteHelpPage/${id}`)
}
updateCMS( id :number, obj:AddCMS) {
  return this._baseService.put(`WebsiteHelpPage/edit/${id}` , obj) 
 }
  //  add 
  addCMS(obj:AddCMS) {
    return this._baseService.post('WebsiteHelpPage/Create' , obj)
  }

  publishChangeById(id : number ): Observable<boolean>{
    return this._baseService.put(`WebsiteHelpPage/PublishWebsiteHelpPage/${id}`,null)
  }
  delete(id : number ): Observable<boolean>{
    return this._baseService.put(`WebsiteHelpPage/deleteWebsiteHelpPage/${id}`,null)
  }

}

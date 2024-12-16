import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PaginationVm,PageInfo, RouterService } from 'shared-lib';
import { AddCMS, CMSList } from './models/cms';

@Injectable({
  providedIn: 'root'
})
export class CMSProxyService {
  constructor(
    private baseService: HttpService,
    private routerService: RouterService
  ) {}

getAllCMS(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<CMSList[]>> {
  let query = `WebsiteHelpPage/pages-with-help?${pageInfo.toQuery}`;
  if (searchTerm) {
    query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
  }
  return this.baseService.get<PaginationVm<CMSList[]>>(query)
}

getCMSById(id : number ): Observable<AddCMS>{
  return this.baseService.get(`WebsiteHelpPage/WebsiteHelpPage/${id}`)
}
updateCMS( id :number, obj:AddCMS) {
  return this.baseService.put(`WebsiteHelpPage/edit/${id}` , obj) 
 }
  //  add 
  addCMS(obj:AddCMS) {
    return this.baseService.post('WebsiteHelpPage/Create' , obj)
  }

  publishChangeById(id : number ): Observable<boolean>{
    return this.baseService.put(`WebsiteHelpPage/PublishWebsiteHelpPage/${id}`,null)
  }
  delete(id : number ): Observable<boolean>{
    return this.baseService.put(`WebsiteHelpPage/deleteWebsiteHelpPage/${id}`,null)
  }

  
  routeToEdit(ID: number) {
    this.routerService.navigateTo(`/help-cms/edit-CMS/${ID}`);
  }

  addNew() {
    this.routerService.navigateTo(`/help-cms/add-CMS`);
  }
  backToList() {
    this.routerService.navigateTo(`/help-cms`);
  }
}

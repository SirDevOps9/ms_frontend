import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, SideMenuModel } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class LayoutProxy {
  constructor(private baseService: HttpService) {}

  loadSideMenu(): Observable<SideMenuModel[]> {
    return this.baseService.get<SideMenuModel[]>(`SideMenu`);
  }
    // get the list of branch to set the default
    branchesDropDown(companyId: string): Observable<{id:string , name : string, isDefault : boolean}[]> {
       this.baseService.addHeaders().set('companyid', companyId);

      return this.baseService.get<{id: string, name: string, isDefault: boolean}[]>(
        `Branch/BranchDropdown`,
      );
    }

    // get the list of companies to set the default
    companiesDropDown(): Observable<{id:string , name : string,companyType : string}[]> {
      return this.baseService.get<{id:string , name : string,companyType : string}[]>(
        `Company/CompanyDropdown`
      );
    }
    
    GetFirstCompany(): Observable<{id:string , name : string,code : string ,companyType : string}[]> {
      return this.baseService.get<{id:string , name : string,code : string ,companyType : string}[]>(
        `Company/GetFirstCompany`
      );
    }
}

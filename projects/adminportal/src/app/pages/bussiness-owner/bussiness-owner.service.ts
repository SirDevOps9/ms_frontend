import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BussinessOwnerProxyService } from './bussiness-owner-proxy.service';
import { AppsInfo, BussinessOwner, CompanyInfo, LicenceInfo, SubDomainInfo, bussinesOwnerDetails, userData } from './models';
import { PageInfo, PaginationVm } from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class BussinessOwnerService {

  constructor(private bussinessOwnerProxy : BussinessOwnerProxyService) { }

  getBussinessOwnerList(pageInfo: PageInfo , quieries?:string) : Observable<PaginationVm<BussinessOwner>> {
   return this.bussinessOwnerProxy.getAllPaginated(pageInfo , quieries)
  }
  getBussinessGetBusinessOwnerById(id : string) : Observable<bussinesOwnerDetails> {
   return this.bussinessOwnerProxy.getBussinessGetBusinessOwnerById(id )
  }
  getCompanyInfoById(pageInfo: PageInfo ,id : string ) : Observable<PaginationVm<CompanyInfo>>  {
    return this.bussinessOwnerProxy.getCompanyInfoById(pageInfo ,id )
  }
  getLicenseInfoById(pageInfo: PageInfo ,id : string ) : Observable<PaginationVm<LicenceInfo>>  {
    return this.bussinessOwnerProxy.getLicenseInfoById(pageInfo ,id )
  }

  getSubDomainById(id:string): Observable<SubDomainInfo> {
    return this.bussinessOwnerProxy.getSubDomainById(id)
  }

  getUsersInfo(pageInfo: PageInfo , id : string) : Observable<PaginationVm<userData>>{
    return this.bussinessOwnerProxy.getUserDta(pageInfo ,id )

  }

  getAppsInfo(pageInfo: PageInfo , id : string) : Observable<PaginationVm<AppsInfo>>{
    return this.bussinessOwnerProxy.getAppsInfo(pageInfo ,id )

  }
 
}

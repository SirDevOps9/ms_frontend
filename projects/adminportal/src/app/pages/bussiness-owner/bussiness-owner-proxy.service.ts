import { Injectable } from '@angular/core';
import { Observable, auditTime } from 'rxjs';
import { FilterDto, HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AppsInfo, BussinessOwner, CompanyInfo, LicenceInfo, SubDomainInfo, bussinesOwnerDetails, userData } from './models';

@Injectable({
  providedIn: 'root'
})
export class BussinessOwnerProxyService {

  constructor(private baseService: HttpService) { }

  getAllPaginated(filterDto: FilterDto , quieries?:string): Observable<PaginationVm<BussinessOwner>> {
    
    return this.baseService.get<PaginationVm<BussinessOwner>>(
      `BusinessOwner?${filterDto.toQuery}&${quieries ?quieries : '' }`
    )

  }
  getBussinessGetBusinessOwnerById(id:string): Observable<bussinesOwnerDetails> {
    
    return this.baseService.get<bussinesOwnerDetails>(
      `BusinessOwner/GetBusinessOwnerById/${id}`
    )
  }

  getCompanyInfoById(filterDto: FilterDto , id:string  ) : Observable<PaginationVm<CompanyInfo>> {
    return this.baseService.get<PaginationVm<CompanyInfo>>(
      `Company/${id}?${filterDto.toQuery}`
    )
  }
  
  getLicenseInfoById(filterDto: FilterDto , id:string  ) : Observable<PaginationVm<LicenceInfo>> {
    return this.baseService.get<PaginationVm<LicenceInfo>>(
      `License/${id}?${filterDto.toQuery}`
    )
  }

  getSubDomainById(id : string) : Observable<SubDomainInfo>{
    return this.baseService.get<SubDomainInfo>(
      `Subdomain/GetSubdmonainById/${id}`
    )
  }

  getUserDta(filterDto: FilterDto , id:string  ) : Observable<PaginationVm<userData>> {
    return this.baseService.get<PaginationVm<userData>>(
      `User/${id}?${filterDto.toQuery}`
    )
  }
  getAppsInfo(filterDto: FilterDto , id:string  ) : Observable<PaginationVm<AppsInfo>> {
    return this.baseService.get<PaginationVm<AppsInfo>>(
      `App/${id}?${filterDto.toQuery}`
    )
  }

}

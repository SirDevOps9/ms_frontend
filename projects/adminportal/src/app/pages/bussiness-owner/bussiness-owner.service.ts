import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BussinessOwnerProxyService } from './bussiness-owner-proxy.service';
import { BussinessOwner, bussinesOwnerDetails } from './models';
import { PageInfo, PaginationVm } from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class BussinessOwnerService {

  constructor(private bussinessOwnerProxy : BussinessOwnerProxyService) { }

  getBussinessOwnerList(pageInfo: PageInfo , quieries?:string) : Observable<PaginationVm<BussinessOwner[]>> {
   return this.bussinessOwnerProxy.getAllPaginated(pageInfo , quieries)
  }
  getBussinessGetBusinessOwnerById(id : string) : Observable<bussinesOwnerDetails> {
   return this.bussinessOwnerProxy.getBussinessGetBusinessOwnerById(id )
  }
 
}

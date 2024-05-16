import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BussinessOwnerProxyService } from './bussiness-owner-proxy.service';
import { BussinessOwner } from './models';
import { PageInfo } from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class BussinessOwnerService {

  constructor(private bussinessOwnerProxy : BussinessOwnerProxyService) { }

  getBussinessOwnerList(pageInfo: PageInfo) {
     this.bussinessOwnerProxy.getAllPaginated(pageInfo).subscribe( res =>{
      console.log(res)
    })
  }
 
}

import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BusinessOwnerProxyService } from './business-owner-proxy.service';


@Injectable({
  providedIn: 'root',
})
export class BusinessOwnerService {
    getInvoice(id:string){
        return this.bussinesOwnerProxy.GetInvoice(id).pipe(
            map((res) => {
              return res;
            })
          );
    }
    constructor(private bussinesOwnerProxy: BusinessOwnerProxyService) {}

}
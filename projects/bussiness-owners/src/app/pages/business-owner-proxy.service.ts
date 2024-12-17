import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';


@Injectable({
  providedIn: 'root',
})
export class BusinessOwnerProxyService {
  GetInvoice(id:string): Observable<any> {
    return this.httpService.getFullUrl(`2007/Invoice/${id}`);
  }

  constructor(private httpService: HttpService) {}

}
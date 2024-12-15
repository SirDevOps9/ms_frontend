import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private http: HttpService) {}

  getCustomersDropdown(): Observable<any[]> {
    return this.http.get<any[]>('Customer/GetAllCustomersDropdown');
  }

  getCustomerStatementReport(params: any): Observable<any> {
    return this.http.get<any>('Customer/GetCustomerStatementReport', params);
  }
}

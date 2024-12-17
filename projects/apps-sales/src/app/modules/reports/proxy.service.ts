import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { Customer, GetCustomerStatementReportDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private http: HttpService) {}

  getCustomersDropdown(): Observable<Customer[]> {
    return this.http.get<any[]>('Customer/GetAllCustomersDropdown');
  }

  getCustomerStatementReport(searchData: any): Observable<GetCustomerStatementReportDto> {
    let query = 'CustomerReports/CustomerStatmentReport';

    if (searchData) {
      const params = new URLSearchParams();
      Object.keys(searchData).forEach((key) => {
        const value = searchData[key];
        if (value) {
          params.append(key, value);
        }
      });
      query += '?' + params.toString();
    }

    return this.http.get(query);
  }
}

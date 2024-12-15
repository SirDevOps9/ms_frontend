import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { GetVendorStatementReportDto, SearchParams } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private http: HttpService) {}

  getVendorsReports(searchData: SearchParams): Observable<GetVendorStatementReportDto> {
    let query = 'VendorReports/VendorStatmentReport';

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

    return this.http.get<GetVendorStatementReportDto>(query);
  }

  getVendorsDropdown(): Observable<[]> {
    return this.http.get('Vendor/GetAllVendorsDropdown');
  }
}

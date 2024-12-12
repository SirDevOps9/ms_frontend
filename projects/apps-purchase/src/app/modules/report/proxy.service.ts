import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { GetVendorStatementReportDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  constructor(private http: HttpService) {}

  getVendorsReports(searchData: any): Observable<GetVendorStatementReportDto> {

    const query = 'VendorReports/VendorStatmentReport'

    return this.http.get<GetVendorStatementReportDto>('VendorReports/VendorStatmentReport');
  }

  getVendorsDropdown(): Observable<[]> {
    return this.http.get('Vendor/GetAllVendorsDropdown');
  }
}

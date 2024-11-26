import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class PurchaseTransactionsProxyService {

  constructor(private httpService: HttpService) {}
  LatestVendor(searchTerm: string | undefined) {
    let query = `Vendor/LatestVendorWithCurrencyLookup`;
    if (searchTerm) {
      query += `?searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get(query);
  }
  GetAllVendor(
      searchTerm: string,
      pageInfo: PageInfo
    ): Observable<PaginationVm<any>> {
      let query = `Vendor/VendorWithCurrencyLookup?${pageInfo.toQuery}`;
      if (searchTerm) {
        query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
      }
      return this.httpService.get<PaginationVm<any>>(query);
    }
}

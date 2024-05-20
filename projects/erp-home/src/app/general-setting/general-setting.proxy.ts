import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { TagDto } from './models/TagDto';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingProxy {
 
  getAllTagsPaginated(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<TagDto>> {
    const queryParams = new URLSearchParams({
      SearchKey: searchTerm,
      PageNumber: pageInfo.pageNumber.toString(),
      PageSize: pageInfo.pageSize.toString(),
    });
    return this.httpService.get<PaginationVm<TagDto>>(`Tag?${pageInfo.toQuery}`);
  }
  constructor(private httpService: HttpService) {}
}

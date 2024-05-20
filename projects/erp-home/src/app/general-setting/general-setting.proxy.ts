import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { TagDto } from './models/TagDto';
import { AddTagDto } from './models/AddTagDto';
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
  addTag(addTagDto: AddTagDto): Observable<string> {
     return this.httpService.post<TagDto>(`Tag`,addTagDto);
  }
  constructor(private httpService: HttpService) {}
}

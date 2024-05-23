import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { TagDto ,AddTagDto } from './models';
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
    const url = `Tag?SearchKey=${searchTerm}&pageNumber=${pageInfo.pageNumber}&pageSize=${pageInfo.pageSize}`;

    return this.httpService.get<PaginationVm<TagDto>>(url);
  }
  addTag(addTagDto: AddTagDto): Observable<TagDto> {
     return this.httpService.post<TagDto>(`Tag`,addTagDto);
  }
  constructor(private httpService: HttpService) {}
}

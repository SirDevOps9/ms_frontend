import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { TagDto } from './models/tagDto';
import { AddTagDto } from './models/addTagDto';

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

  addTag(addTagDto: AddTagDto): Observable<any> {
     return this.httpService.post<any>(`Tag`,addTagDto);
  }

  editTag(TagDto: TagDto): Observable<boolean> {
    return this.httpService.put<boolean>(`Tag`,TagDto);
 }

 getTagById(Id: number): Observable<TagDto> {
  return this.httpService.get<TagDto>(`Tag/GetById?Id=${Id}`);
}

  constructor(private httpService: HttpService) {}
}

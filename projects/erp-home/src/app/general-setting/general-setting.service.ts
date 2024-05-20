import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { GeneralSettingProxy } from './general-setting.proxy';
import { TagDto } from './models/TagDto';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingService {
  private tagDataSource = new BehaviorSubject<TagDto[]>([]);

  public TagList = this.tagDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  initTagList(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAllTagsPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.tagDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getAllTagsPaginated(searchTerm: string, pageInfo: PageInfo) {
    return this.GeneralSettingproxy.getAllTagsPaginated(searchTerm, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  

 
  constructor(private GeneralSettingproxy: GeneralSettingProxy) {}
}

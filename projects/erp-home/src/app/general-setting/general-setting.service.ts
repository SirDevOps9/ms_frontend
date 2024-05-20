import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, ToasterService } from 'shared-lib';
import { GeneralSettingProxy } from './general-setting.proxy';
import { TagDto } from './models/TagDto';
import { AddTagDto } from './models/AddTagDto';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingService {
  private tagDataSource = new BehaviorSubject<TagDto[]>([]);

  public TagList = this.tagDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public TagCode = "";
 
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

  addTag(addTagDto: AddTagDto
    ,dialogRef: DynamicDialogRef
  ){
    this.loaderService.show();
    this.GeneralSettingproxy.addTag(addTagDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.Success'),
          this.languageService.transalte('tag.addtag.Success')
        );
        this.loaderService.hide();
        this.TagCode=res;
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  

 
  constructor(private GeneralSettingproxy: GeneralSettingProxy,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private toasterService: ToasterService,

  ) {}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, ToasterService } from 'shared-lib';
import { GeneralSettingProxy } from './general-setting.proxy';
import { TagDto ,AddTagDto} from './models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingService {
  private tagDataSource = new BehaviorSubject<TagDto[]>([]);
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  private currentTagDataSource = new BehaviorSubject<TagDto>({} as TagDto);


  public currentTag = this.currentTagDataSource.asObservable();
  public TagList = this.tagDataSource.asObservable();
 
  GetTagList(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAllTagsPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.tagDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  addTag(addTagDto: AddTagDto
    ,dialogRef: DynamicDialogRef
  ){
    this.loaderService.show();
    this.GeneralSettingproxy.addTag(addTagDto).subscribe({
      next: (res) => {
        console.log("Code",res)
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.Success'),
          this.languageService.transalte('tag.addtag.Success')
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  editTag(TagDto: TagDto
    ,dialogRef: DynamicDialogRef
  ){
    this.loaderService.show();
    this.GeneralSettingproxy.editTag(TagDto).subscribe({
      next: (res) => {
        console.log("res",res)
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.Success'),
          this.languageService.transalte('tag.addtag.Success')
        );
        this.loaderService.hide();
        dialogRef.close();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  getTagById(Id:number) {
    this.GeneralSettingproxy.getTagById(Id).subscribe((response) => {
      this.currentTagDataSource.next(response);
    });
  }

  async deleteTag(id: number){
    const confirmed = await this.toasterService.showConfirm(
      'Delete'
    );
    if (confirmed) {
      this.loaderService.show();
      this.GeneralSettingproxy.deleteTag(id).subscribe({
        next: (res) => {
          console.log("res",res)
          this.toasterService.showSuccess(
            this.languageService.transalte('tag.addtag.Success'),
            this.languageService.transalte('tag.addtag.Success')
          );
          this.loaderService.hide();
          return res;
        },
        error: (err) => {
          this.loaderService.hide();
        },
      });

    }
  }

 
  constructor(private GeneralSettingproxy: GeneralSettingProxy,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private toasterService: ToasterService,

  ) {}
}

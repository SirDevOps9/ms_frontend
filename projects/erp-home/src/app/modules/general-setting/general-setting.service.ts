import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, ToasterService } from 'shared-lib';
import { GeneralSettingProxy } from './general-setting.proxy';
import { TagDto ,AddTagDto, financialCalendar, AddFinancialCalendar, VendorCategoryDto, AddVendorCategory, EditVendorCategoryDto} from './models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingService {
  private tagDataSource = new BehaviorSubject<TagDto[]>([]);
  private financialCalendarDataSource = new BehaviorSubject<financialCalendar[]>([]);
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  private currentTagDataSource = new BehaviorSubject<TagDto>({} as TagDto);
  private addFinancialCalendarRes = new BehaviorSubject<any>('');
  private openFinancialCalendarRes = new BehaviorSubject<any>('');
  private FinancialPeriodLastYearDate = new BehaviorSubject<any>(null);
  private FinancialPeriodDataByID = new BehaviorSubject<any>(null);
  private EditFinancialPeriodData = new BehaviorSubject<any>(null);
  private vendorCategoryDataSource = new BehaviorSubject<VendorCategoryDto[]>([]);
  private addVendorCategoryData = new BehaviorSubject<any>(null);
  private sendChildrenAccountsDropDownData = new BehaviorSubject<any>([]);
  private sendPriceListsDropDownData = new BehaviorSubject<any>([]);
  private sendPaymentTermsDropDownData = new BehaviorSubject<any>([]);
  private vendorCategoryDataByID = new BehaviorSubject<any>(null);


  public currentTag = this.currentTagDataSource.asObservable();
  public financialCalendarDataSourceObservable = this.financialCalendarDataSource.asObservable();
  public tagList = this.tagDataSource.asObservable();
  public addFinancialCalendarResObservable = this.addFinancialCalendarRes.asObservable();
  public openFinancialCalendarResObservable = this.openFinancialCalendarRes.asObservable();
  public FinancialPeriodLastYearDateObservable = this.FinancialPeriodLastYearDate.asObservable();
  public FinancialPeriodDataByIDObservable = this.FinancialPeriodDataByID.asObservable();
  public EditFinancialPeriodDataObservable = this.EditFinancialPeriodData.asObservable();

  public vendorCategoryDataSourceObservable = this.vendorCategoryDataSource.asObservable();
  public sendChildrenAccountsDropDownDataObservable = this.sendChildrenAccountsDropDownData.asObservable();
  public addVendorCategoryDataObservable = this.addVendorCategoryData.asObservable();
  public sendPriceListsDropDownDataObservable = this.sendPriceListsDropDownData.asObservable();
  public sendPaymentTermsDropDownDataObservable = this.sendPaymentTermsDropDownData.asObservable();
  public vendorCategoryDataByIDObservable = this.vendorCategoryDataByID.asObservable();
 
  getTagList(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAllTagsPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.tagDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getfinancialCalendar(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getAllfinancialCalendarPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.financialCalendarDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  getVendorCategory(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getVendorCategory(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.vendorCategoryDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getVendorCategoryByID(id : number) {
    this.GeneralSettingproxy.getVendorCategoryByID(id)
    .subscribe(res=>{
      if(res) {
        this.vendorCategoryDataByID.next(res)

      }
    })
  }

  addVendorCategory(addvendorCategory : AddVendorCategory) {
    this.loaderService.show();
    this.GeneralSettingproxy.addvendorCategory(addvendorCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addVendorCategory.success'),
          this.languageService.transalte('addVendorCategory.successAdd')
        );
        if(res) {
          this.addVendorCategoryData.next(res)

        }
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  EditVendorCategory(editvendorCategory : EditVendorCategoryDto) {
    this.loaderService.show();
    this.GeneralSettingproxy.EditVendorCategory(editvendorCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('EditVendorCategory.success'),
          this.languageService.transalte('EditVendorCategory.successAdd')
        );
        if(res) {
          this.addVendorCategoryData.next(res)

        }
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }


  addTag(addTagDto: AddTagDto
    ,dialogRef: DynamicDialogRef
  ){
    this.loaderService.show();
    this.GeneralSettingproxy.addTag(addTagDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.success'),
          this.languageService.transalte('tag.addtag.success')
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  editTag(tagDto: TagDto
    ,dialogRef: DynamicDialogRef
  ){
    this.loaderService.show();
    this.GeneralSettingproxy.editTag(tagDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.success'),
          this.languageService.transalte('tag.addtag.success')
        );
        this.loaderService.hide();
        dialogRef.close();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  addFinancialCalendar(addFinancialCalendar: AddFinancialCalendar){
    this.loaderService.show();
    this.GeneralSettingproxy.addFinancialCalendar(addFinancialCalendar).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addFinancialCalendar.success'),
          this.languageService.transalte('addFinancialCalendar.successAdd')
        );
        this.addFinancialCalendarRes.next(res)
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  OpenFinancialCalendar(openList : {}){
    this.loaderService.show();
    this.GeneralSettingproxy.openFinancialCalendar(openList).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addFinancialCalendar.success'),
          this.languageService.transalte('addFinancialCalendar.openSuccess')
        );
        this.openFinancialCalendarRes.next(res)
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  GetFinancialPeriodLastYearDate() {
    this.GeneralSettingproxy.GetFinancialPeriodLastYearDate()
    .subscribe(res=>{
      if(res) {
        this.FinancialPeriodLastYearDate.next(res)

      }
    })
  }

  editFinancialPeriod({ id, name }: { id: number; name: string }) {
    this.GeneralSettingproxy.editFinancialPeriodLastYearDate({ id, name })
    .subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addFinancialCalendar.success'),
          this.languageService.transalte('addFinancialCalendar.successEdit')
        );
        this.EditFinancialPeriodData.next(res)
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
     
    })
  }
  GetFinancialPeriodByID(id : number) {
    this.GeneralSettingproxy.GetFinancialPeriodByID(id)
    .subscribe(res=>{
      if(res) {
        this.FinancialPeriodDataByID.next(res)

      }
    })
  }

  getChildrenAccountsDropDown() {
    this.GeneralSettingproxy.getChildrenAccountsDropDown()
    .subscribe(res=>{
      if(res) {
        this.sendChildrenAccountsDropDownData.next(res)
      }
    })
  }
  getpriceListDropDown() {
    this.GeneralSettingproxy.getpriceListDropDown()
    .subscribe(res=>{
      if(res) {
        this.sendPriceListsDropDownData.next(res)
      }
    })
  }
  getpaymentTermsListDropDown() {
    this.GeneralSettingproxy.getpriceListDropDown()
    .subscribe(res=>{
      if(res) {
        this.sendPaymentTermsDropDownData.next(res)
      }
    })
  }




  getTagById(id:number) {
    this.GeneralSettingproxy.getTagById(id).subscribe((response) => {
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
          this.toasterService.showSuccess(
            this.languageService.transalte('tag.success'),
            this.languageService.transalte('tag.success')
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

  async activate(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      'Activate'
    );
    if (confirmed) {
      this.GeneralSettingproxy.activateTag(id).subscribe({
        next: () => {
          const tagToChange = this.tagDataSource.value.find(
            (item) => item.id === id
          );
          if (tagToChange) {
            tagToChange.isActive = true;
            this.tagDataSource.next([...this.tagDataSource.value]);
          }
          this.toasterService.showSuccess(
            this.languageService.transalte('tag.success'),
            this.languageService.transalte(
              'tag.success'
            )
          );
        },
      });
    } 
    else {
      this.tagDataSource.value.find((item) => {
        if (item.id === id) {
          item.isActive = false;
        }
      });
    }
  }
  async deactivate(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      'Deactivate'
    );
    if (confirmed) {
      this.GeneralSettingproxy.deactivateTag(id).subscribe({
        next: () => {
          const tagToChange = this.tagDataSource.value.find(
            (item) => item.id === id
          );
          if (tagToChange) {
            tagToChange.isActive = false;
            this.tagDataSource.next([...this.tagDataSource.value]);
          }
          this.toasterService.showSuccess(
            this.languageService.transalte('tag.success'),
            this.languageService.transalte(
              'tag.success'
            )
          );
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

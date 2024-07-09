import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { GeneralSettingProxy } from './general-setting.proxy';


import { TagDto ,AddTagDto, financialCalendar, AddFinancialCalendar, VendorCategoryDto, AddVendorCategory, EditVendorCategoryDto, CustomerCategoryDto, EditCustomerCategoryDto, vendorDefinitionDto, AddCustomerDefinitionDto, EditCustomerDefintionsDto, editFinancialCalndar} from './models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCustomerCategoryDto } from './models/addCustomerCategoryDto';
import { AddVendorCommand } from './models/AddVendorCommand';
import { CategoryDropdownDto } from './models/CategoryDropdownDto';
import { CityDto } from './models/CityDto';
import { CountryDto } from './models/CountryDto';
import { CurrencyDto } from './models/CurrencyDto'; 
import { TagDropDownDto } from './models/TagDropDownDto';

import { EditVendorCommand } from './models/editVendorCommand';
import { GetVendorById } from './models/getVendorById';
@Injectable({
  providedIn: 'root',
})
export class GeneralSettingService {
  private tagDataSource = new BehaviorSubject<TagDto[]>([]);
  private financialCalendarDataSource = new BehaviorSubject<financialCalendar[]>([]);
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  private currentTagDataSource = new BehaviorSubject<TagDto>({} as TagDto);
  private addFinancialCalendarRes = new BehaviorSubject<AddFinancialCalendar| any>({} as AddFinancialCalendar);
  private openFinancialCalendarRes = new BehaviorSubject<number[]>([]);
  private FinancialPeriodLastYearDate = new BehaviorSubject<any>(null);
  private FinancialPeriodDataByID = new BehaviorSubject<editFinancialCalndar>({} as editFinancialCalndar);
  private EditFinancialPeriodData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  private vendorCategoryDataSource = new BehaviorSubject<VendorCategoryDto[]>([]);
  private addVendorCategoryData = new BehaviorSubject<AddVendorCategory>({} as AddVendorCategory);
  private sendChildrenAccountsDropDownData = new BehaviorSubject<any>([]);
  private sendPriceListsDropDownData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  private sendPaymentTermsDropDownData = new BehaviorSubject<{ id: number; name: string }[]>([]);
  private sendgetVendorCategoryDropdownData = new BehaviorSubject<CategoryDropdownDto[]>([]);
  private vendorCategoryDataByID = new BehaviorSubject<EditVendorCategoryDto>({} as EditVendorCategoryDto);

  public vendorDefinitionDataByID = new BehaviorSubject<GetVendorById | undefined>({} as GetVendorById  | undefined );

  private customerCategoryDataSource = new BehaviorSubject<CustomerCategoryDto[]>([]);
  private customerCategoryDataByID = new BehaviorSubject<EditVendorCategoryDto>({} as EditVendorCategoryDto);
  private addCustomerCategoryData = new BehaviorSubject<AddCustomerCategoryDto>({} as AddCustomerCategoryDto);
  private customerDefinitionDataSource = new BehaviorSubject<CustomerCategoryDto[]>([]);
  private vendorDefinitionDataSource = new BehaviorSubject<vendorDefinitionDto[]>([]);
  private tagsDataSource = new BehaviorSubject<TagDropDownDto[]>([]); 
  private countryDataSource = new BehaviorSubject<CountryDto[]>([]);
  private cityDataSource = new BehaviorSubject<CityDto[]>([]);
  private currenciesDataSource = new BehaviorSubject<CurrencyDto[]>([]);
  private addCustomerDefinitionRes = new BehaviorSubject<AddCustomerDefinitionDto>({} as AddCustomerDefinitionDto);
  private editCustomerDefinitionRes = new BehaviorSubject<EditCustomerDefintionsDto>({} as EditCustomerDefintionsDto);
  public getCustomerDefinitionResByID = new BehaviorSubject<AddCustomerDefinitionDto>({} as AddCustomerDefinitionDto);

  public currencies = this.currenciesDataSource.asObservable();

  public cities = this.cityDataSource.asObservable();

  public countries = this.countryDataSource.asObservable();

  public tags = this.tagsDataSource.asObservable();
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
  public sendgetVendorCategoryDropdownDataObservable = this.sendgetVendorCategoryDropdownData.asObservable();
  public vendorCategoryDataByIDObservable = this.vendorCategoryDataByID.asObservable();
  public vendorDefinitionDataByIDObservable = this.vendorDefinitionDataByID.asObservable();

  public customerCategoryDataSourceObservable = this.customerCategoryDataSource.asObservable();
  public customerCategoryDataByIDObservable = this.customerCategoryDataByID.asObservable();
  public addCustomerCategoryDataObservable = this.addCustomerCategoryData.asObservable();

  public customerDefinitionDataSourceObservable = this.customerDefinitionDataSource.asObservable();
  public vendorDefinitionDataSourceObservable = this.vendorDefinitionDataSource.asObservable();


  public customerDefinitionObservable = this.addCustomerDefinitionRes.asObservable();
  public editCustomerDefinitionResObservable = this.editCustomerDefinitionRes.asObservable();
  public getCustomerDefinitionResByIDObservable = this.getCustomerDefinitionResByID.asObservable();


  
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
        this.vendorCategoryDataByID.next(res)

      
    })
  }

  addVendorCategory(addvendorCategory : AddVendorCategory) {
    this.GeneralSettingproxy.addvendorCategory(addvendorCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('addVendorCategory.successAdd')
        );
        if(res) {
          this.addVendorCategoryData.next(res)

        }
      },
    
    });
  }

  EditVendorCategory(editvendorCategory : EditVendorCategoryDto) {
    this.GeneralSettingproxy.EditVendorCategory(editvendorCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('addVendorCategory.successEdit')
        );
        if(res)
        this.routerService.navigateTo('vendor-category');

        
      },
  
    });
  }

  

  async deleteVendorCategory(id: number){
    const confirmed = await this.toasterService.showConfirm(
      'Delete'
    );
    if (confirmed) {
      this.GeneralSettingproxy.deleteVendorCategory(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('deleteVendorCategory.delete')
          );
          let data = this.vendorCategoryDataSource.getValue()
          const updatedVendor = data.filter((elem) => elem.id !== id);
          this.vendorCategoryDataSource.next(updatedVendor);

          return res;
        },
        error: (err) => {
        },
      });

    }
  }

  

  getcustomerCategory(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getcustomerCategory(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.customerCategoryDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  
  getCustomerCategoryByID(id : number) {
    this.GeneralSettingproxy.getCustomerCategoryByID(id)
    .subscribe(res=>{
      if(res) {
        this.customerCategoryDataByID.next(res)

      }
    })
  }

  addCustomerCategory(addCustomerCategory : AddCustomerCategoryDto) {
    this.GeneralSettingproxy.addCustomerCategory(addCustomerCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('addCustomerCategory.successAdd')
        );
        if(res) {
          this.addCustomerCategoryData.next(res)

        }
      },
    
    });
  }

  EditCustomerCategory(editCustomerCategory : EditCustomerCategoryDto) {
    this.GeneralSettingproxy.EditCustomerCategory(editCustomerCategory).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('addCustomerCategory.successEdit')
        );
        if(res) {
          this.routerService.navigateTo('customer-category')

        }
      },
  
    });
  }

  async deleteCustomerCategory(id: number){
    const confirmed = await this.toasterService.showConfirm(
      'Delete'
    );
    if (confirmed) {
      this.GeneralSettingproxy.deleteCustomerCategory(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('addCustomerCategory.delete')
          );
          let data = this.customerCategoryDataSource.getValue()
          const updatedVendor = data.filter((elem) => elem.id !== id);
          this.customerCategoryDataSource.next(updatedVendor);

          return res;
        },
        error: (err) => {
        },
      });

    }
  }
  // customer definition

  getcustomerDefinition(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getcustomerDefinition(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.customerDefinitionDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  async deleteCustomerDefinition(id: number){
    const confirmed = await this.toasterService.showConfirm(
      'Delete'
    );
    if (confirmed) {
      this.GeneralSettingproxy.deleteCustomerDefinition(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('deleteCustomerDefinition.delete')
          );
          let data = this.customerDefinitionDataSource.getValue()
          const updatedVendor = data.filter((elem) => elem.id !== id);
          this.customerDefinitionDataSource.next(updatedVendor);

          return res;
        },
      });

    }
  }

  // vendor
  getVendorDefinition(searchTerm: string, pageInfo: PageInfo) {
    this.GeneralSettingproxy.getVendorDefinition(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.vendorDefinitionDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  async deletevendorDefinition(id: number){
    const confirmed = await this.toasterService.showConfirm(
      'Delete'
    );
    if (confirmed) {
      this.GeneralSettingproxy.deleteVendorDefinition(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('deleteVendorDefinition.delete')
          );
          let data = this.vendorDefinitionDataSource.getValue()
          const updatedVendor = data.filter((elem) => elem.id !== id);
          this.vendorDefinitionDataSource.next(updatedVendor);

          return res;
        },
      });

    }
  }

  // 

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
    this.GeneralSettingproxy.getpaymentTermsListDropDown()
    .subscribe(res=>{
      if(res) {
        this.sendPaymentTermsDropDownData.next(res)
      }
    })
  }
  getVendorCategoryDropdown() {
    this.GeneralSettingproxy.getVendorCategoryDropdown()
    .subscribe(res=>{
      if(res) {
        this.sendgetVendorCategoryDropdownData.next(res)
      }
    })
  }
  getCustomerCategoryDropdown() {
    this.GeneralSettingproxy.getCustomerCategoryDropdown()
    .subscribe(res=>{
      if(res) {
        this.sendgetVendorCategoryDropdownData.next(res)
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
  getTags() {
    this.GeneralSettingproxy.getTags().subscribe((response) => {
      this.tagsDataSource.next(response);
    });
  }
  loadCountries() {
    this.GeneralSettingproxy.getAllCountries().subscribe((response) => {
      this.countryDataSource.next(response);
    });
  }
  loadCities(countryCode: string) {
    this.GeneralSettingproxy.getCities(countryCode).subscribe((response) => {
      this.cityDataSource.next(response);
    });
  }
  getCurrencies(searchKey:string) {
    this.GeneralSettingproxy.getCurrencies(searchKey).subscribe((res)=> {
      this.currenciesDataSource.next(res);
    });
    
  }
  addNewVendorDefinition(vendor:AddVendorCommand){
    this.loaderService.show();
    this.GeneralSettingproxy.addNewVendorDefinition(vendor).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addFinancialCalendar.success'),
          this.languageService.transalte('addFinancialCalendar.openSuccess')
        
        );
        this.routerService.navigateTo(`/vendor-definitions`)
        // this.addVendorCategoryRes.next(res)
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  addNewCustomerDefinition(customer:AddCustomerDefinitionDto){
    this.loaderService.show();
    this.GeneralSettingproxy.addNewCustomerDefinition(customer).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addCustomerDefinition.success'),
          this.languageService.transalte('addCustomerDefinition.successAdd')
        );
        if(res) {
          this.addCustomerDefinitionRes.next(res)
          this.loaderService.hide();
          this.routerService.navigateTo('/customer-definitions')

        }
      },
      error: (err) => {
        this.loaderService.hide();
      },
      })
    }
  
  editVendorDefinition(vendor:EditVendorCommand){
    this.loaderService.show();
    this.GeneralSettingproxy.editVendorDefinition(vendor).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('vendorDefinition.success'),
          this.languageService.transalte('vendorDefinition.vendorSuccess')
        );
        // this.addVendorCategoryRes.next(res)
        this.routerService.navigateTo(`/vendor-definitions`)
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  editCustomerDefinition(customer:EditCustomerDefintionsDto){
    this.GeneralSettingproxy.editCustomerDefinition(customer).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('addCustomerDefinition.success'),
          this.languageService.transalte('addCustomerDefinition.successEdit')
        );
        if(res) {
          this.editCustomerDefinitionRes.next(res)

        }
      },
    
    });
  }

  getCustomerDefinitionByID(id : string){
    this.GeneralSettingproxy.getCustomerDefinitionByID(id).subscribe({
      next: (res) => {
      
         this.getCustomerDefinitionResByID.next(res)
      },
    
    });
  }
 
  getVendorDefinitionByID(id : number) {
    this.GeneralSettingproxy.getVendorDefinitionByID(id)
    .subscribe(res=>{
        this.vendorDefinitionDataByID.next(res)
      
    })
  }
 
  constructor(
    private GeneralSettingproxy: GeneralSettingProxy,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private toasterService: ToasterService,
    private routerService: RouterService


  ) {}
}

import { Component } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { RouterService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { currencyListDto, vendorDefinitionDto } from '../../../models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCurrencyDefinitionComponent } from '../../../components/currencyDefinition/add-currency-definition/add-currency-definition.component';

@Component({
  selector: 'app-currency-definition',
  templateUrl: './currency-definition.component.html',
  styleUrl: './currency-definition.component.scss'
})
export class CurrencyDefinitionComponent {
  constructor(
    public authService: AuthService,
    private generalSettingService: GeneralSettingService,
    private routerService : RouterService,
    private dialog: DialogService,

  ) {}

  tableData : currencyListDto[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  ref: DynamicDialogRef;

  ngOnInit() {

     this.getCurrencyList();

  }

  
  // routeToAdd(branchId: string) {
  //   this.generalSettingService.openEditBranchModel(branchId, this.ref, this.dialog);
  // }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`edit-vendor-definitions/${id}`)
  }

  // initFinancialCalendarData() {
  //   this.generalSettingService.getVendorDefinition('', new PageInfo());

  //   this.generalSettingService.vendorDefinitionDataSourceObservable.subscribe({
  //     next: (res) => {
  //       this.tableData = res;
        
  //     },
  //   });

  //   this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
  //     this.currentPageInfo = currentPageInfo;
  //   });
  // }

 
  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getCurrencyList('', pageInfo);

    this.generalSettingService.currencyDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }



  onSearchChange(event : any) {
    this.generalSettingService.getCurrencyList(event, new PageInfo());

    this.generalSettingService.currencyDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.generalSettingService.deletevendorDefinition(id);
  }
  addNew(){
    // const dialogRef = this.dialog.open(AddCurrencyDefinitionComponent, {
    //   width: '600px',
    //   height : '700px'
    
    // });
    // dialogRef.onClose.subscribe(() => {
    //   // this.initTaxGroupData();
    // });
    this.generalSettingService.openEditBranchModel()
  }
  getCurrencyList(){
     this.generalSettingService.getCurrencyList('', new PageInfo())
     
     this.generalSettingService.currencyDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }


 
}



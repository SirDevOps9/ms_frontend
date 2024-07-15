import { Component } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { RouterService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { currencyListDto } from '../../../models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

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

  routeToEdit(id : number) {
    this.routerService.navigateTo(`edit-vendor-definitions/${id}`)
  }

 
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
    this.generalSettingService.deleteCurrency(id);
  }
  addNew(){
    this.generalSettingService.openCurrencyAdded()
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



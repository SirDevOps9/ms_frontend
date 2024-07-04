import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CustomerCategoryDto, vendorDefinitionDto } from '../../../models';

@Component({
  selector: 'app-vendor-definitions-list',
  templateUrl: './vendor-definitions-list.component.html',
  styleUrl: './vendor-definitions-list.component.scss'
})
export class VendorDefinitionsListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private generalSettingService: GeneralSettingService,
    private routerService : RouterService
  ) {}

  tableData : vendorDefinitionDto[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
 
  ngOnInit() {

     this.initFinancialCalendarData();

  }

  routeToAdd() {
    this.routerService.navigateTo('add-vendor-definitions')
  }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`edit-vendor-definitions/${id}`)
  }

  initFinancialCalendarData() {
    this.generalSettingService.getVendorDefinition('', new PageInfo());

    this.generalSettingService.vendorDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res.reverse();
        
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

 
  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getVendorDefinition('', pageInfo);

    this.generalSettingService.vendorDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }



  onSearchChange(event : any) {
    this.generalSettingService.getVendorDefinition(event, new PageInfo());

    this.generalSettingService.vendorDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.generalSettingService.deletevendorDefinition(id);
  }



 
}

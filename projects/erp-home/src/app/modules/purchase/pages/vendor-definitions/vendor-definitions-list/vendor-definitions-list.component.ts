import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import {  vendorDefinitionDto } from '../../../models';
import { PurchaseService } from '../../../purchase.service';

@Component({
  selector: 'app-vendor-definitions-list',
  templateUrl: './vendor-definitions-list.component.html',
  styleUrl: './vendor-definitions-list.component.scss'
})
export class VendorDefinitionsListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private purchaseService: PurchaseService,
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
    this.routerService.navigateTo('/purchase/add-vendor-definitions')
  }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`/purchase/edit-vendor-definitions/${id}`)
  }

  initFinancialCalendarData() {
    this.purchaseService.getVendorDefinition('', new PageInfo());

    this.purchaseService.vendorDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        
      },
    });

    this.purchaseService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

 
  onPageChange(pageInfo: PageInfo) {
    this.purchaseService.getVendorDefinition('', pageInfo);

    this.purchaseService.vendorDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }



  onSearchChange(event : any) {
    this.purchaseService.getVendorDefinition(event, new PageInfo());

    this.purchaseService.vendorDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.purchaseService.deletevendorDefinition(id);
  }



 
}

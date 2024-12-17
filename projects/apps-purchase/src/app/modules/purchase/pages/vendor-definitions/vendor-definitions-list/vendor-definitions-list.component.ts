import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { RouterService, PageInfoResult, MenuModule, PageInfo, lookupDto, SharedEnums } from 'shared-lib';
import {  vendorDefinitionDto } from '../../../models';
import { PurchaseService } from '../../../purchase.service';
import { SequenceService } from 'apps-shared-lib';

@Component({
  selector: 'app-vendor-definitions-list',
  templateUrl: './vendor-definitions-list.component.html',
  styleUrl: './vendor-definitions-list.component.scss'
})
export class VendorDefinitionsListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private purchaseService: PurchaseService,
    private routerService : RouterService,
    private sequenceService: SequenceService,
      private sharedEnums: SharedEnums
  ) {}

  tableData : vendorDefinitionDto[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  
  exportColumns: lookupDto[];
  exportData: vendorDefinitionDto[];
  ngOnInit() {

     this.initFinancialCalendarData();

  }
  onAdd() {
    this.sequenceService.isHaveSequence(
      this.sharedEnums.Pages.Vendor,
      '/masterdata/vendor-definitions/add-vendor-definitions'
    );
  }
 
  onEdit(id : number) {
    this.routerService.navigateTo(`/masterdata/vendor-definitions/edit-vendor-definitions/${id}`)
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


  exportVendorsData(searchTerm: string) {
    this.purchaseService.exportVendorsData(searchTerm);
    this.purchaseService.exportsVendorsDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
 
}

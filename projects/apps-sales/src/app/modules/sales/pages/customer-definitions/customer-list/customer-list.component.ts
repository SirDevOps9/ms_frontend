import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo, lookupDto, SharedEnums } from 'shared-lib';
import { SalesService } from '../../../sales.service';
import { CustomerDefinitionDto } from '../../../models/customerDefinitionDto';
import { SequenceService } from 'apps-shared-lib';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private accountService: AccountService,
    private salesService: SalesService,
    private routerService : RouterService,
    private sequenceService : SequenceService,
    private sharedEnums : SharedEnums
  ) {}

  tableData : any[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  exportColumns: lookupDto[];
  exportData: CustomerDefinitionDto[];
  ngOnInit() {

     this.initFinancialCalendarData();

  }

  onAdd() {
    this.sequenceService.isHaveSequence(
      this.sharedEnums.Pages.Customer,
      '/masterdata/customer-definitions/add-customer-definitions'
    );
  }
  onEdit(id : number) {
    this.routerService.navigateTo(`/masterdata/customer-definitions/edit-customer-definitions/${id}`)
  }


  initFinancialCalendarData() {
    this.salesService.getcustomerDefinition('', new PageInfo());

    this.salesService.customerDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.salesService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

 
  onPageChange(pageInfo: PageInfo) {
    this.salesService.getcustomerDefinition('', pageInfo);

    this.salesService.customerDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }



  onSearchChange(event : any) {
    this.salesService.getcustomerDefinition(event, new PageInfo());

    this.salesService.customerDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log('onSearchChange',this.tableData)

      },
    });
  }
  

  onDelete(id: number) {
    this.salesService.deleteCustomerDefinition(id);
  }

  onColumnsChange(e:any) {

  }

  exportCustomersData(searchTerm: string) {
    this.salesService.exportCustomersData(searchTerm);
    this.salesService.exportsCustomersDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
}

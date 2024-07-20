import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { SalesService } from '../../../sales.service';


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
    private routerService : RouterService
  ) {}

  tableData : any[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
 
  ngOnInit() {

     this.initFinancialCalendarData();

  }

  routeToAdd() {
    this.routerService.navigateTo('masterdata/add-customer-definitions')
  }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`masterdata/edit-customer-definitions/${id}`)
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
    this.salesService.getcustomerDefinition(event.target.value, new PageInfo());

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

 
}

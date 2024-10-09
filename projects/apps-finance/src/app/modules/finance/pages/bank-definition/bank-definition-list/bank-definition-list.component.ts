import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, lookupDto, PageInfoResult, MenuModule, PageInfo, LanguageService } from 'shared-lib';

import { FinanceService } from '../../../finance.service';
import { BankDefinitionDto } from '../../../models/BankDefinitionDto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-bank-definition-list',
  templateUrl: './bank-definition-list.component.html',
  styleUrl: './bank-definition-list.component.scss'
})
export class BankDefinitionListComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private financeService: FinanceService
  ) {

  }

  tableData: BankDefinitionDto[];

  exportData: BankDefinitionDto[];
  cols = [
   
    {
      field: 'Code',
      header: 'code',
    },

    {
      field: 'Name',
      header: 'name',
    },
    {
      field: 'Short Name',
      header: 'shortName',
    },
   
  ];
  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  ngOnInit() {
    this.initTreasurData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  initTreasurData() {
    this.financeService.getBankDefinitions('', new PageInfo());

    this.financeService.sendBankDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.financeService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.financeService.getBankDefinitions('', pageInfo);

    this.financeService.sendBankDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  exportClick(e?: Event) {
    this.exportBankData(this.searchTerm);
  }

  exportBankData(searchTerm: string) {
    this.financeService.exportsBankList(searchTerm);
    this.financeService.exportedBankListDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {
  this.routerService.navigateTo('/masterdata/bank-definition/add-bank-definition')
  }

  onEdit(data: any) {
          this.routerService.navigateTo(`/masterdata/bank-definition/edit-bank-definition/${data.id}`);


  }
  view(id: number) {
    this.routerService.navigateTo(`/masterdata/bank-definition/view-bank-definition/${id}`);
  }

  onSearchChange() {
    this.financeService.getBankDefinitions(this.searchTerm, new PageInfo());
    this.financeService.sendBankDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log(res);
      },
    });
  }

  onDelete(id: number) {
    this.financeService.deleteBank(id);
  }
}

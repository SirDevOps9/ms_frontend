import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, lookupDto, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { ItemTypeDto } from '../../../models';

@Component({
  selector: 'app-item-type-list',
  templateUrl: './item-type-list.component.html',
  styleUrl: './item-type-list.component.scss'
})
export class ItemTypeListComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private itemsService : ItemsService
  ) {
    this.title.setTitle(this.langService.transalte('bank.BankDefinitonsList'));

  }

  tableData: ItemTypeDto[];

  exportData: ItemTypeDto[];
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
    this.initItemTypeData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
    
  }
  

  initItemTypeData() {
    console.log('wasdf')

    this.itemsService.getItemType('', new PageInfo());

    this.itemsService.sendItemTypeDataSource.subscribe({
      next: (res) => {
        console.log(res)
        this.tableData = res;
      },
    });

    this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getItemType('', pageInfo);
  }

  exportClick(e?: Event) {
    this.exportBankData(this.searchTerm);
  }

  exportBankData(searchTerm: string) {
    // this.financeService.exportsBankList(searchTerm);
    // this.financeService.exportedBankListDataSourceObservable.subscribe((res) => {
    //   this.exportData = res;
    // });
  }

  onAdd() {
  // this.routerService.navigateTo('/masterdata/bank-definition/add-bank-definition')
  }

  onEdit(data: any) {
          // this.routerService.navigateTo(`/masterdata/bank-definition/edit-bank-definition/${data.id}`);


  }

  onSearchChange() {
    this.itemsService.getItemType(this.searchTerm, new PageInfo());
    
  }

  onDelete(id: number) {
    // this.financeService.deleteBank(id);
  }
}


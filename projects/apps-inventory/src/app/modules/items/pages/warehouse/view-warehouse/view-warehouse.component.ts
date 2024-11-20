import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService, lookupDto, PageInfoResult, MenuModule, PageInfo, PrintService } from 'shared-lib';
import { AddWarehousePopupComponent } from '../../../components/warehouse/add-warehouse-popup/add-warehouse-popup.component';
import { ItemsService } from '../../../items.service';
import { GetWarehouseList } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { DebugService } from '../log';

@Component({
  selector: 'app-view-warehouse',
  templateUrl: './view-warehouse.component.html',
  styleUrl: './view-warehouse.component.scss'
})
export class ViewWarehouseComponent {
  pi: string;
id:number
  constructor(
    private route : ActivatedRoute,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private debugService: DebugService,
    private Print_Service: PrintService,
    private langService: LanguageService,
    private itemsService : ItemsService,

  ) {
    this.id = this.route.snapshot.params['id']
  }

  tableData: GetWarehouseList[];

  exportData: GetWarehouseList[];
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
    {
      field: 'Item Category Name',
      header: 'itemCategoryName',
    },
    {
      field: 'UOM Name',
      header: 'uomName',
    },

  ];
  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  SortBy?: number;
  SortColumn?: string;
  ngOnInit() {
    this.debugService.log('Component Initialized');

    // يمكنك أيضًا عرض أي بيانات أخرى
    this.initItemDefinitionData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  initItemDefinitionData() {
    const pageInfo = new PageInfo();
    this.itemsService.getWarehouseListView('', this.id,new PageInfo());
     this.itemsService.WarehouseViewDataSourceObs.subscribe({
        next: (res) => {
          this.tableData = res;
          console.log(this.tableData);

        },
      })
      this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
        this.currentPageInfo = currentPageInfo;
      });
    };

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getWarehouseList('', pageInfo);
  }

  onSearchChange(event: any) {
    // Assuming 'warehouseId' is available in the event or another way to retrieve it
    const warehouseId = this.id // Modify as needed
  
    // Call the service method with the correct number of arguments
    this.itemsService.getWarehouseListView(event, warehouseId, new PageInfo());
  
    this.itemsService.WarehouseViewDataSourceObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  
  // exportClick(e?: Event) {
  //   console.log(e)
  //   this.exportWarehouseData(this.searchTerm);
  // }


  // exportClick(){
  //   this.itemsService.exportsWayehouseList(this.searchTerm ,this.SortBy,this.SortColumn);
  //   this.itemsService.exportedWarehouseDataSourceObs.subscribe((res) => {
  //     this.exportData = res;
  //   });
  // }

  // exportWarehouseData(searchTerm: string) {
  //   this.itemsService.exportsWayehouseList(this.searchTerm ,this.SortBy,this.SortColumn);
  //   this.itemsService.exportedWarehouseDataSourceObs.subscribe((res) => {
  //     this.exportData = res;
  //   });
  // }
  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }

  exportClick(){
    this.itemsService.exportsWayehouseList(this.searchTerm ,this.SortBy,this.SortColumn);


    this.itemsService.exportedWarehouseDataSourceObs.subscribe((res) => {
      this.exportData = res;
    });
  }
  onAdd() {
      const dialogRef = this.dialog.open(AddWarehousePopupComponent, {
      width: '650px',
      height : '420px',
    });
    dialogRef.onClose.subscribe(() => {
    this.initItemDefinitionData()
    });

  }

  onEdit(data: any) {
  }

  onView(data: any) {
  }



  // onSearchChange() {
  //   this.itemsService.getWarehouseList(this.searchTerm, new PageInfo());

  // }


  onDelete(id: number) {
     this.itemsService.deleteWareHouse(id)
  }

  printTable(id: string) {
    this.Print_Service.print(id);
  }

  ngOnDestroy(): void {
    // مسح جميع الرسائل عند مغادرة المكون
    this.debugService.clearLogs();
    console.log('Logs cleared when component destroyed');
  }

  someFunction() {
    // مثال على استخدام log في أي دالة أخرى
    this.debugService.log('Function called');
  }
}

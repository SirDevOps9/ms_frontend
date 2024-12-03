import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { UOMCategoryDto } from '../../../models';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from '../../../models/SortTable';

@Component({
  selector: 'app-uom-list',
  templateUrl: './uom-list.component.html',
  styleUrl: './uom-list.component.scss'
})
export class UOMListComponent implements OnInit {
  tableData: UOMCategoryDto[] = []
  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  exportData: UOMCategoryDto[];
  clonedExportData: UOMCategoryDto[];
  exportColumns:any[]
  SortByAll:SortTableEXport
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'code', headerText:('UOM.uomCode') },
    { name: 'name', headerText:('UOM.uomName') },
    { name: 'shortName', headerText:('UOM.shortName') },
    { name: 'categoryName', headerText:('UOM.uomCategory') },
    { name: 'factor', headerText:('UOM.uomFactor') },

  ]
  constructor(
    private routerService: RouterService,
    private itemService : ItemsService,
    public authService: AuthService,
    private title: Title,
      private exportService:ExportService
  ){

  }
  ngOnInit(): void {
    this.initTreasurData()
  }

  initTreasurData() {
    this.itemService.getUOmCategories('', new PageInfo());

    this.itemService.GetUOMCategoriesDataSourceObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.itemService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo    });
  }


  Add() {
    this.routerService.navigateTo('/masterdata/uom/add-uom')
    }
    onView(data: any) {

      this.routerService.navigateTo(`/masterdata/uom/view-uom/${data.uomCategoryId}`);
    }


  onSearchChange() {
    this.itemService.getUOmCategories(this.searchTerm, new PageInfo());


  }
  onPageChange(pageInfo: PageInfo) {
    this.itemService.getUOmCategories('', pageInfo);
  }


  exportClick() {
    this.exportOperationalData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportOperationalData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.itemService.exportUOMList(searchTerm, sortBy, sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));

    this.itemService.SendexportUOMList$.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, filteredColumns);

    });
  }
  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }

/**
 * This function filters the columns based on the selected values.
 * @param e - An array of strings containing the names of the columns to be filtered.
 *
 * Steps:
 * 1. Logs the selected column names to the console for debugging purposes.
 * 2. Updates the `filteredColumns` property with the new filtered column names.
 * 3. Iterates through each selected column:
 *    - If the column exists in the original `columns` array, perform a specific action (logic can be added here).
 *    - If the column does not exist, perform a different action (logic can also be added here).
 */
onFilterColumn(e: string[]) {
  this.filteredColumns = e; // Update the filtered columns array
}



  // exportBankData(searchTerm: string) {
  //   this.itemService.exportUOMList(searchTerm)

  //   this.itemService.SendexportUOMList$.subscribe((res)=>{
  //     this.exportData = res
  //   })
  // }
  // exportUom(searchTerm: string) {
  //   this.itemService.exportUOMList(searchTerm)

  //   this.itemService.SendexportUOMList$.subscribe((res)=>{
  //     this.exportData = res
  //   })


  // }
  onEdit(data: any) {
    this.routerService.navigateTo(`/masterdata/uom/edit-uom/${data.uomCategoryId}`);
}
onDelete(id: string) {
  this.itemService.deleteUom(id);
}
}

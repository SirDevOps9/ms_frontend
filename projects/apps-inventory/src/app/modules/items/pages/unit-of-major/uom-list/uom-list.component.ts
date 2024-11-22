import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { FinanceService } from 'projects/apps-finance/src/app/modules/finance/finance.service';
import { LanguageService, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { UOMCategoryDto } from '../../../models';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private routerService: RouterService,
    private itemService : ItemsService,

    public authService: AuthService,
    private title: Title,
    private translate: TranslateService,
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


    //     this.itemService.listOfUOMs.subscribe({
    //   next: (res) => {
    //     this.tableData = res;
    //     console.log(res);
    //   },
    // });
  }
  onPageChange(pageInfo: PageInfo) {
    this.itemService.getUOmCategories('', pageInfo);

  }


  exportClick(e?: Event) {
    this.exportOperationalData(this.searchTerm);
  }

  exportOperationalData(searchTerm: string) {
    this.itemService.exportUOMList(searchTerm);

    const columns = [
      { name: 'code', headerText: this.translate.instant('UOM.uomCode') },
      { name: 'name', headerText: this.translate.instant('UOM.uomName') },
      { name: 'shortName', headerText: this.translate.instant('UOM.shortName') },
      { name: 'categoryName', headerText: this.translate.instant('UOM.uomCategory') },
      { name: 'factor', headerText: this.translate.instant('UOM.uomFactor') },
    ];

    this.itemService.SendexportUOMList$.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);

    });
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
onDelete(id: number) {
  this.itemService.deleteCategory(id)
}

}

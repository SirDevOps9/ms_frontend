import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { FinanceService } from 'projects/apps-finance/src/app/modules/finance/finance.service';
import { LanguageService, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { UOMCategoryDto } from '../../../models';

@Component({
  selector: 'app-uom-list',
  templateUrl: './uom-list.component.html',
  styleUrl: './uom-list.component.scss'
})
export class UOMListComponent implements OnInit {
  tableData: UOMCategoryDto[] = []
  currentPageInfo: PageInfoResult = {}; 
  searchTerm: string;
  exportData: any[];
  exportColumns:any[]

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
      field: 'UOM Type',
      header: 'uomType',
    },
    {
      field: 'UOM Name',
      header: 'uomName',
    },
    {
      field: 'Conversion Ratio',
      header: 'conversionRatio',
    },
   
  ];
  constructor(
    private routerService: RouterService,
    private itemService : ItemsService,

    public authService: AuthService,
    private title: Title,
    private langService: LanguageService,

  ){

  }
  ngOnInit(): void {
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
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
    
      this.exportBankData(this.searchTerm);
  

  }

  exportBankData(searchTerm: string) {
    this.itemService.exportUOMList(searchTerm)

    this.itemService.SendexportUOMList$.subscribe((res)=>{
      this.exportData = res 
    })

  
  }
  onEdit(data: any) {
    this.routerService.navigateTo(`/masterdata/uom/edit-uom/${data.uomCategoryId}`);


}
onDelete(id: number) {
  this.itemService.deleteCategory(id)
}
  
}

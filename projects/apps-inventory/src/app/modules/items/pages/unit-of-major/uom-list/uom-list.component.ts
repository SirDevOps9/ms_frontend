import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { FinanceService } from 'projects/apps-finance/src/app/modules/finance/finance.service';
import { LanguageService, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-uom-list',
  templateUrl: './uom-list.component.html',
  styleUrl: './uom-list.component.scss'
})
export class UOMListComponent implements OnInit {
  tableData: any[] = []
  currentPageInfo: PageInfoResult = {}; 
  searchTerm: string;
  exportData: any[];
  exportColumns:any[]

  constructor(
    private routerService: RouterService,
    private itemService : ItemsService,

    public authService: AuthService,
    private title: Title,
    private langService: LanguageService,

  ){
    this.title.setTitle(this.langService.transalte('UOM.uomList'));

  }
  ngOnInit(): void {

    this.initTreasurData()
    

  }  

  initTreasurData() {
    this.itemService.getListOfUom('', new PageInfo());

    this.itemService.listOfUOMs.subscribe({
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
    this.itemService.getListOfUom(this.searchTerm, new PageInfo());


    //     this.itemService.listOfUOMs.subscribe({
    //   next: (res) => {
    //     this.tableData = res;
    //     console.log(res);
    //   },
    // });
  }
  onPageChange(pageInfo: PageInfo) {
    this.itemService.getListOfUom('', pageInfo);

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
    this.routerService.navigateTo(`/masterdata/uom/edit-uom/${data.id}`);


}
onDelete(id: number) {
  this.itemService.deleteUOM(id)
}
  
}

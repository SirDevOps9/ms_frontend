import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { FinanceService } from 'projects/apps-finance/src/app/modules/finance/finance.service';
import { PageInfoResult, RouterService, LanguageService, PageInfo } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { IAttrributeDifinitionResult } from '../../../models/AttrbuteDiffintion';

@Component({
  selector: 'app-attribute-definition-list',
  templateUrl: './attribute-definition-list.component.html',
  styleUrl: './attribute-definition-list.component.scss'
})
export class AttributeDefinitionListComponent implements OnInit {
  tableData: any[] = [

  ]
  currentPageInfo: PageInfoResult = { totalItems: 0 }; 
  searchTerm: string;
  exportData: IAttrributeDifinitionResult[];
  exportColumns:any[]

  constructor(
    private routerService: RouterService,
    private itemService : ItemsService,

    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,

  ){
    this.title.setTitle(this.langService.transalte('attributeDefinition.attributeDefinition'));

  }
  ngOnInit(): void {
    this.initTreasurData()
    
    this.itemService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }  

  initTreasurData() {
    this.itemService.getListOfAttr('', new PageInfo());

    this.itemService.listOfAttrDifinition$.subscribe({
      next: (res) => {
    
        this.tableData = res;
      },
    });

    this.itemService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }


  Add() {
    this.routerService.navigateTo('/masterdata/attribute-definition/add-attribute')
    }

  onSearchChange() {
    this.itemService.getListOfAttr(this.searchTerm, new PageInfo());


        this.itemService.listOfAttrDifinition$.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log(res);
      },
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this.itemService.getListOfAttr('',  pageInfo);

    this.itemService.listOfAttrDifinition$.subscribe({
      next: (res) => {
    
        this.tableData = res;
      },
    });
  }

  exportClick(e?: Event) {

    this.exportAttrData(this.searchTerm);
  }

  exportAttrData(searchTerm: string) {

    this.itemService.exportAttrDifinitionList(searchTerm)

    this.itemService.SendexportAttrDifinitionList$.subscribe((res)=>{
      this.exportData = res
    })

  
  }
  onEdit(data: any) {
    console.log(data);
    
    this.routerService.navigateTo(`/masterdata/attribute-definition/edit-attribute/${data.id}`);


}
onDelete(id: number) {
  this.itemService.deleteAttributeGroup(id);
  this.initTreasurData()

}



}
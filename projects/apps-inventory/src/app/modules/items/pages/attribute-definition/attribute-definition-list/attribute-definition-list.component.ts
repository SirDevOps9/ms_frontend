import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { FinanceService } from 'projects/apps-finance/src/app/modules/finance/finance.service';
import { PageInfoResult, RouterService, LanguageService, PageInfo, ToasterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { IAttrributeDifinitionResult } from '../../../models/AttrbuteDiffintion';
import { ItemsProxyService } from '../../../items-proxy.service';
import { EditAttributeDefinitionComponent } from '../edit-attribute-definition/edit-attribute-definition.component';
import { ViewAttributeDetalisComponent } from '../view-attribute-detalis/view-attribute-detalis/view-attribute-detalis.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-attribute-definition-list',
  templateUrl: './attribute-definition-list.component.html',
  styleUrl: './attribute-definition-list.component.scss'
})
export class AttributeDefinitionListComponent implements OnInit {
  tableData: any[] = []
  currentPageInfo: PageInfoResult = { totalItems: 0 }; 
  searchTerm: string;
  exportData: IAttrributeDifinitionResult[];
  exportColumns:any[]

  constructor(
    private routerService: RouterService,
    private itemService : ItemsService,
       private itemPoxcy : ItemsProxyService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private toaserService: ToasterService,
    private langService: LanguageService,
  ){
    this.title.setTitle(this.langService.transalte('attributeDefinition'));

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
        debugger
        this.tableData = res;
      },
    });

    this.itemService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });

    this.itemService.editStatusAttributeiantDataObs.subscribe((data:any)=>{
      if(data.status){
        alert('fome')
      }
    })
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
        debugger
        this.tableData = res;
      },
    });
  }

  exportClick(e?: Event) {
    debugger
    this.exportAttrData(this.searchTerm);
  }

  exportAttrData(searchTerm: string) {
    debugger
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


edits(row: any, newValue: any): void {
  const payload = {
    id: row.id,
    status: newValue.value
  }; 
  console.log('Payload to send:', payload);
  this.itemService.editStatusAttributeGroup(payload)
this.itemService.editStatusAttributeiantDataObs.subscribe((data:any)=>{
 alert('done')
})
}

async confirmChange(newValue: boolean, user: any) {
  user.isActive =!user.isActive
  const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');

  if (confirmed) {
    const command = {
      id: user.id,
      status: user.isActive,
    };
    console.log(command);
    
    this.itemService.editStatusAttributeGroup(command)
  } else {
    user.isActive =!user.isActive

    console.log('Change was canceled', user.isActive);
  }
}



onView(data:any):void {
  const dialogRef = this.dialog.open(ViewAttributeDetalisComponent, {
  
    width: '800px',
    height : '700px',
    data: data

  });

  dialogRef.onClose.subscribe(() => {
  });
}
}
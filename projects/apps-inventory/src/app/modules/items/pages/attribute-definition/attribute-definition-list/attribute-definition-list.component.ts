import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { FinanceService } from 'projects/apps-finance/src/app/modules/finance/finance.service';
import { PageInfoResult, RouterService, LanguageService, PageInfo, ToasterService } from 'shared-lib';
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
action: any;

  constructor(
    private routerService: RouterService,
    private itemService : ItemsService,
    private toasterService: ToasterService,

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

onToggleActive(newStatus: boolean, id: number): void {
  // Find the row with the corresponding ID and update its isActive value
  const index = this.tableData.findIndex(item => item.id === id);
  if (index !== -1) {
    this.tableData[index].isActive = newStatus;

    // Optionally, trigger a save/update action
    this.saveChanges(this.tableData[index]);
  }
}

saveChanges(updatedRow: any): void {
  // // Implement the logic to save the changes (e.g., send to the server)
  // this.attributeService.updateAttribute(updatedRow.id, updatedRow).subscribe(response => {
  //   console.log('Updated successfully');
  // });
}

async confirmChange(newValue: boolean, user: any) {
  user.isActive =!user.isActive
  const confirmed = await this.toasterService.showConfirm('ConfirmButtonTexttochangestatus');

  if (confirmed) {
    const command = {
      id: user.id,
      status: user.isActive,
    };

    
    this.itemService.editStatusAttributeGroup(command)
  
  } else {
    user.isActive =!user.isActive

    console.log('Change was canceled', user.isActive);
  }
}

}
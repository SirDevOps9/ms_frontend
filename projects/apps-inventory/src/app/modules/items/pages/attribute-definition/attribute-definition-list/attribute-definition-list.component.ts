import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { FinanceService } from 'projects/apps-finance/src/app/modules/finance/finance.service';
import { PageInfoResult, RouterService, LanguageService, PageInfo, ToasterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { IAttrributeDifinitionResult } from '../../../models/AttrbuteDiffintion';
import { AttributeDefinitionValuesComponent } from '../attribute-definition-values/attribute-definition-values/attribute-definition-values.component';
import { AttributeDefinitionListValuesComponent } from '../attribute-definition-list-values/attribute-definition-list-values/attribute-definition-list-values.component';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { TranslateService } from '@ngx-translate/core';
import { SortTableEXport } from '../../../models/SortTable';

interface Attribute {
  nameEn: string;
  nameAr?: string;
}

interface RowData {
  id: number;
  nameEn: string;
  nameAr?: string;
  isActive: boolean;
  itemAttributes: Attribute[] ;
}

@Component({
  selector: 'app-attribute-definition-list',
  templateUrl: './attribute-definition-list.component.html',
  styleUrl: './attribute-definition-list.component.scss'
})
export class AttributeDefinitionListComponent implements OnInit {
  tableData: RowData[]
  tableDataOb: any={}
  SortByAll:SortTableEXport
  currentPageInfo: PageInfoResult = { totalItems: 0 };
  searchTerm: string;
  exportData: IAttrributeDifinitionResult[];
  exportColumns:any[]
action: any;
isRtl: boolean = false;
currentLang:string = ''
filteredColumns: string[] = [];
columns: { name: any; headerText: any }[] = [
  { name: 'nameEn' , headerText: ('attributeDefinition.nameEn') },
  { name: 'nameAr' , headerText: ('attributeDefinition.nameAr') },
  { name: 'itemAttributes', headerText: ('attributeDefinition.values') },
  { name: this.currentLang === 'en' ? 'isActive' : 'isActive', headerText: ('attributeDefinition.status') },
]
  constructor(
    private routerService: RouterService,
    private itemService : ItemsService,
    private toasterService: ToasterService,
    private exportService:ExportService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private translate: TranslateService,
    public languageService: LanguageService,


  ){
    this.title.setTitle(this.languageService.transalte('attributeDefinition.attributeDefinition'));
    this.currentLang = this.languageService.getLang();
  }
  ngOnInit(): void {

    this.initTreasurData()


  }


  initTreasurData() {
    this.itemService.getListOfAttr('', new PageInfo());

    this.itemService.listOfAttrDifinition$.subscribe({
      next: (res) => {
        this.tableData = res
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
  exportClick() {
    this.exportAttrData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }
  exportAttrData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.itemService.exportAttrDifinitionList(searchTerm, sortBy, sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));
    this.itemService.SendexportAttrDifinitionList$.subscribe((res) => {
      this.exportData = this.exportService.formatItemAttributes(res, filteredColumns);
      // console.log('Export data:', this.exportData);
    });
  }

  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }

  onFilterColumn(e: string[]) {
    this.filteredColumns = e;

  }
  onEdit(data: any) {
    this.routerService.navigateTo(`/masterdata/attribute-definition/edit-attribute/${data.id}`);
}
onDelete(id: number) {
  this.itemService.deleteAttributeGroup(id);
  this.initTreasurData()
}

onToggleActive(newStatus: boolean, id: number): void {
  const index = this.tableData.findIndex(item => item.id === id);
  if (index !== -1) {
    this.tableData[index].isActive = newStatus;
    this.saveChanges(this.tableData[index]);
  }
}

saveChanges(updatedRow: any): void {

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



onViewttributeValues(selectedId: number) {
  const selectedItem = this.tableData.find(item => item.id === selectedId);
  this.dialog.open(AttributeDefinitionValuesComponent, {
    width: '750px',
    height: 'auto',
    data: selectedItem,

  });
}

onViewttributeValuesList(data: any) {
  this.routerService.navigateTo(`/masterdata/attribute-definition/view/${data.id}`)
}

}

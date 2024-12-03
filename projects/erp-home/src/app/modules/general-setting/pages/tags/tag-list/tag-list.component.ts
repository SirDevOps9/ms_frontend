import { Component, OnInit } from '@angular/core';
import {
  lookupDto,
  MenuModule,
  PageInfo,
  PageInfoResult,
} from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { LayoutService } from 'libs/apps-shared-lib/src/lib/modules/layout/layout.service';
import { GeneralSettingService } from '../../../general-setting.service';
import { ExportTagDto, TagDto } from '../../../models';
import { TagEditComponent } from '../../../components/tag-edit/tag-edit.component';
import { TagAddComponent } from '../../../components/tag-add/tag-add.component';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';
@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  tableData: TagDto[];
  currentPageInfo: PageInfoResult;
  modulelist: MenuModule[];
  searchTerm: string;
  SortBy?: number
  SortColumn?:string
  mappedExportData: TagDto[];
  exportData: ExportTagDto[];
  exportColumns: any[];
  SortByAll:SortTableEXport
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'code', headerText:('tag.code') },
    { name: 'name', headerText:('tag.Name') },
    { name: 'modules', headerText:('tag.Modules') },
    { name: 'isActive', headerText:('tag.status') },
  ]
  constructor(
    private generalSettingService: GeneralSettingService,
    public layoutService: LayoutService,
    private dialog: DialogService,
    private exportService:ExportService
  ) {
  }




  addNew(e: boolean) {
    if (e) {
      this.newTag();
    }
  }
  ngOnInit() {
    this.modulelist = this.layoutService.getModules();
    this.initTagData();
  }

  initTagData() {
    this.generalSettingService.getTagList('', new PageInfo());

    this.generalSettingService.tagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  viewModulesName(tag: number[]) {
    let moduleName: any = this.modulelist;
    moduleName = moduleName
      .filter((elem: any) => tag.includes(elem.moduleId))
      .map((elem: any) => elem.module);
    return moduleName;
  }

  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getTagList('', pageInfo);

    this.generalSettingService.tagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  routeToEdit(data: any) {
    const dialogRef = this.dialog.open(TagEditComponent, {
      // header: this.languageService.transalte('tag.EditTag'),
      width: '500px',
      height: '500px',
    //  position: 'bottom-right', // A
      data: data,
    });

    dialogRef.onClose.subscribe(() => {
      this.initTagData();
    });
  }

  changed(e: any, id: number) {
    if (e.checked === false) {
      this.generalSettingService.deactivate(id);
    } else {
      this.generalSettingService.activate(id);
    }
  }

  newTag() {
    const dialogRef = this.dialog.open(TagAddComponent, {
      // header: this.languageService.transalte('tag.AddNewTag'),
      width: '500px',
      height: '500px',
      // position: 'bottom-right', // Adjust position as needed
    });

    dialogRef.onClose.subscribe(() => {
      this.initTagData();
    });
  }

  onSearchChange(e: any) {
    this.generalSettingService.getTagList(e, new PageInfo());

    this.generalSettingService.tagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  exportClick() {
    this.exportTagData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportTagData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.generalSettingService.exportTagData(searchTerm , sortBy , sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));

    this.generalSettingService.exportsTagDataSourceObservable.subscribe((res) => {
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


  Delete(id: number) {
    this.generalSettingService.deleteTag(id);
  }
}

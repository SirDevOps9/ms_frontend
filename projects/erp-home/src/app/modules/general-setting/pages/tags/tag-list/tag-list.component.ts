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

  constructor(
    private generalSettingService: GeneralSettingService,
    public layoutService: LayoutService,
    private dialog: DialogService
  ) {
  }

  exportColumns: lookupDto[] = [
    {
      id: 'id',
      name: 'Id',
    },
    {
      id: 'code',
      name: 'Code',
    },
    {
      id: 'name',
      name: 'Name',
    },
    {
      id: 'isActive',
      name: 'Status',
    },
    {
      id: 'modules',
      name: 'Modules',
    },
  ];

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

  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }
  exportTagData() {
    this.generalSettingService.exportTagData(this.searchTerm ,this.SortBy, this.SortColumn);
    this.generalSettingService.exportsTagDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  Delete(id: number) {
    this.generalSettingService.deleteTag(id);
  }
}

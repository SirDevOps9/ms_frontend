import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'apps-shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, MenuModule, RouterService, PageInfo } from 'shared-lib';
import { TagAddComponent } from '../../../components/tag-add/tag-add.component';
import { TagEditComponent } from '../../../components/tag-edit/tag-edit.component';
import { GeneralSettingService } from '../../../general-setting.service';
import { TagDto } from '../../../models';

@Component({
  selector: 'app-financial-calendar-list',
  templateUrl: './financial-calendar-list.component.html',
  styleUrl: './financial-calendar-list.component.scss'
})
export class FinancialCalendarListComponent implements OnInit {
  tableData: TagDto[];
  currentPageInfo: PageInfoResult;
  modulelist: MenuModule[];
  searchTerm: string;

  constructor(
    private routerService: RouterService,
    private generalSettingService: GeneralSettingService,
    public layoutService: LayoutService,
    private dialog: DialogService
  ) {}

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
      header : "Edit Tag",
      width: '800px',
      position: 'bottom-right' ,// A
      data : data
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
      header : "Add New Tag",
      width: '600px',
      position: 'bottom-right' // Adjust position as needed
    
    });

    dialogRef.onClose.subscribe(() => {
      this.initTagData();
    });
  }

  onSearchChange() {
    this.generalSettingService.getTagList(this.searchTerm, new PageInfo());

    this.generalSettingService.tagList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  Delete(id: number) {
    this.generalSettingService.deleteTag(id);
    const index = this.tableData.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.tableData.splice(index, 1);
    }
  }
}
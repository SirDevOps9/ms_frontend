import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { PageInfoResult, RouterService, LanguageService, PageInfo, ToasterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { IOperationalTagResult } from '../../../models';
import { TranslateService } from '@ngx-translate/core';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';

@Component({
  selector: 'app-operation-tag-list',
  templateUrl: './operation-tag-list.component.html',
  styleUrl: './operation-tag-list.component.scss',
})
export class OperationTagListComponent implements OnInit {
  tableData: IOperationalTagResult[] = [];
  currentPageInfo: PageInfoResult = { totalItems: 0 };
  searchTerm: string;
  exportData: IOperationalTagResult[];
  exportColumns: any[];

  constructor(
    private routerService: RouterService,
    private itemService: ItemsService,
    private toaserService: ToasterService,
    private translate: TranslateService,
    public authService: AuthService,
    private title: Title,
    private langService: LanguageService,
    private exportService:ExportService
  ) {
    this.title.setTitle(this.langService.transalte('OperationalTag.OperationalTag'));
  }
  ngOnInit(): void {
    this.initOperationalTagData();

    this.itemService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  initOperationalTagData() {
    this.itemService.getOperationalTagList('', new PageInfo());

    this.itemService.listOfOperationalTag$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.itemService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  Add() {
    this.routerService.navigateTo('/masterdata/operational-tag/add-operational-tag');
  }

  onSearchChange() {
    this.itemService.getOperationalTagList(this.searchTerm, new PageInfo());

    this.itemService.listOfOperationalTag$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.itemService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });

  }
  onPageChange(pageInfo: PageInfo) {
    this.itemService.getOperationalTagList('', pageInfo);

    this.itemService.listOfOperationalTag$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  exportClick(e?: Event) {
    this.exportOperationalData(this.searchTerm);
  }

  exportOperationalData(searchTerm: string) {
    this.itemService.ExportOperationalTagList(searchTerm);

    const columns = [
      { name: 'name', headerText: this.translate.instant('OperationalTag.name') },
      { name: 'operationType', headerText: this.translate.instant('OperationalTag.operationType') },
      { name: 'warehouseName', headerText: this.translate.instant('OperationalTag.warehouseName') },
      { name: 'glAccountId', headerText: this.translate.instant('OperationalTag.glAccountId') },
      { name: 'code', headerText: this.translate.instant('OperationalTag.code') },
    ];

    this.itemService.SendExportOperationalTagList$.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);

    });
  }





  onEdit(data: any) {
    this.routerService.navigateTo(`/masterdata/operational-tag/edit-operational-tag/${data.id}`);
    this.initOperationalTagData()
  }
  onDelete(id: number) {
    this.itemService.deleteOperationalTag(id);
    this.initOperationalTagData();
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
      this.itemService.ActivateOperationalTag(command)
    } else {
      user.isActive =!user.isActive
      console.log('Change was canceled', user.isActive);
    }
  }
}

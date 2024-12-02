import { Component, inject } from '@angular/core';
import { PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { CMSList } from '../../models/cms';
import { CMSService } from '../../cms.service';
import { CMSProxyService } from '../../cms-proxy.service';

@Component({
  selector: 'app-list-cms',
  templateUrl: './list-cms.component.html',
  styleUrl: './list-cms.component.scss'
})
export class ListCMSComponent {
  constructor(private cMSProxyService:CMSProxyService,private _helpService :CMSService){
  }

  tableData: CMSList[];
  searchTerm: string;
  active: boolean = false;
  currentPageInfo: PageInfoResult = {};

  ngOnInit() {
    this.initgetCMSList();
  }
  // init help page 
  initgetCMSList() {
    this._helpService.getCMSList('', new PageInfo());
    this._helpService.helpsPageList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this._helpService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this._helpService.getCMSList('', pageInfo);
    this._helpService.helpsPageList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onSearchChange() {
    this._helpService.getCMSList(this.searchTerm, new PageInfo());

    this._helpService.helpsPageList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this._helpService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  routeToEdit(ID: number) {
    this.cMSProxyService.routeToEdit(ID);
  }

  addNew() {
    this.cMSProxyService.addNew();
  }

  async onPublishChange(id: number) {
    const confirmed = await this._helpService.showConfirm();
    if (confirmed) {
      this._helpService.publishChangeById(id);
    } else this.initgetCMSList();
  }

  async onDelete(id: number) {
    const confirmed = await this._helpService.showConfirm();
    if (confirmed) {
      this._helpService.delete(id);
    };
  }

}

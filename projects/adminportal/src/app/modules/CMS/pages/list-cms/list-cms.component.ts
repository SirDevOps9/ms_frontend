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
  constructor(
    private helpService: CMSService,
    public cMSProxyService: CMSProxyService
  ) {}


  tableData: CMSList[];
  searchTerm: string;
  active: boolean = false;
  currentPageInfo: PageInfoResult = {};

  ngOnInit() {
    this.initgetCMSList();
  }
  // init help page 
  initgetCMSList() {
    this.helpService.getCMSList('', new PageInfo());
    this.helpService.helpsPageList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.helpService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.helpService.getCMSList('', pageInfo);
    this.helpService.helpsPageList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onSearchChange() {
    this.helpService.getCMSList(this.searchTerm, new PageInfo());

    this.helpService.helpsPageList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.helpService.currentPageInfo.subscribe((currentPageInfo) => {
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
    const confirmed = await this.helpService.showConfirm();
    if (confirmed) {
      this.helpService.publishChangeById(id);
    } else this.initgetCMSList();
  }

  async onDelete(id: number) {
    const confirmed = await this.helpService.showConfirm();
    if (confirmed) {
      this.helpService.delete(id);
    };
  }

}

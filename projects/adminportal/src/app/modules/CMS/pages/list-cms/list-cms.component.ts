import { Component, inject } from '@angular/core';
import { PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { CMSList } from '../../models/cms';
import { CMSService } from '../../cms.service';

@Component({
  selector: 'app-list-cms',
  templateUrl: './list-cms.component.html',
  styleUrl: './list-cms.component.scss'
})
export class ListCMSComponent {
  private _helpService = inject(CMSService);
  private routerService = inject(RouterService);

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
    this.routerService.navigateTo(`/help-cms/edit-CMS/${ID}`);
  }

  addNew() {
    this.routerService.navigateTo(`/help-cms/add-CMS`);
  }
}

import {  Component, inject, OnInit, ViewEncapsulation } from '@angular/core';

import {
 
  PageInfo,
  PageInfoResult,
  RouterService,
} from 'shared-lib';
import { HelpPageService } from '../../help-page.service';
import { HelpPagesList } from '../../models/heloPage';

@Component({
  selector: 'app-list-help-page',
  templateUrl: './list-help-page.component.html',
  styleUrl: './list-help-page.component.scss',
})
export class ListHelpPageComponent implements OnInit {
  private _helpService = inject(HelpPageService);
  private routerService = inject(RouterService);

  tableData: HelpPagesList[];
  searchTerm: string
  active: boolean = false;
  currentPageInfo: PageInfoResult = {};


  ngOnInit() {
    this.initgetHelpPagesList()

  }
  initgetHelpPagesList() {
    this._helpService.getHelpPagesList('', new PageInfo());
    this._helpService.helpsPageList$.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log(this.tableData);
        
      },
    });

    this._helpService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this._helpService.getHelpPagesList('', pageInfo);
    this._helpService.helpsPageList$.subscribe({
      next: (res) => {
        this.tableData = res;        console.log(this.tableData);

      },
    });
  }

  onSearchChange() {
    this._helpService.getHelpPagesList(this.searchTerm, new PageInfo());

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
    this.routerService.navigateTo(`/help-pages/edit-page/${ID}`);
  }

  addNew(ID: number) {
    this.routerService.navigateTo(`/help-pages/add-page/${ID}`);
  }
}

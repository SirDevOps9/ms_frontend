import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  PageInfoResult,
  MenuModule,
  RouterService,
  PageInfo,
  ToasterService,
  lookupDto,
  LanguageService,
} from 'shared-lib';
import { AccountService } from '../../../account.service';
import {
  SharedCostEnums,
  costCenterActivation,
  costCenterList,
} from '../../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  styleUrl: './cost-center-list.component.scss',
})
export class CostCenterListComponent implements OnInit {
  tableData: costCenterList[];
  currentPageInfo: PageInfoResult;
  modulelist: MenuModule[];
  searchTerm: string;
  exportColumns: lookupDto[];
  exportData: costCenterList[];
  constructor(
    private routerService: RouterService,
    private accountService: AccountService,
    public authService: AuthService,
    private toaserService: ToasterService,
    public sharedCostEnums: SharedCostEnums,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService
  ) {
    this.title.setTitle(this.langService.transalte('costCenter.CostCenterList'));
  }

  ngOnInit() {
    this.initTaxGroupData();
  }

  initTaxGroupData() {
    this.accountService.getAllCostCenter('', new PageInfo());
    this.accountService.costCenterListView.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.accountService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.accountService.getAllCostCenter('', pageInfo);
    this.accountService.costCenterListView.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onSearchChange(e: any) {
    this.accountService.getAllCostCenter(e.target.value, new PageInfo());
  }
  
  async confirmChange(event: any, user: any) {
    const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');
    if (confirmed) {
      const command: costCenterActivation = {
        id: user.id,
        status: user.isActive,
      };
      this.accountService.costCenterActivation(command);
    } else {
      user.isActive = !user.isActive;
    }
  }

  exportCostCentersData(searchTerm: string) {
    this.accountService.exportCostCentersData(searchTerm);
    this.accountService.exportsCostCentersDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
}

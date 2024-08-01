import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, MenuModule, RouterService, PageInfo, ToasterService, lookupDto } from 'shared-lib';
import { AccountService } from '../../../account.service';
import { TaxGroupAddComponent } from '../../../components/tax-group-add/tax-group-add.component';
import { TaxGroupEditComponent } from '../../../components/tax-group-edit/tax-group-edit.component';
import { SharedCostEnums, TaxGroupDto, costCenterActivation, costCenterList } from '../../../models';

@Component({
  selector: 'app-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  styleUrl: './cost-center-list.component.scss'
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
    public sharedCostEnums:SharedCostEnums,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.initTaxGroupData();
  }

  initTaxGroupData() {
    this.accountService.getAllCostCenter('',new PageInfo());
    this.accountService.costCenterListView.subscribe({
      next: (res) => {
        console.log(res);
        
        this.tableData = res;
      },
    });

    this.accountService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.accountService.getAllCostCenter('',pageInfo);
    this.accountService.costCenterListView.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  Add() {
    const dialogRef = this.dialog.open(TaxGroupAddComponent, {
      width: '600px',
      height : '700px'
    
    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxGroupData();
    });
  }

  Edit(Id:any) {
    const dialogRef = this.dialog.open(TaxGroupEditComponent, {
      width: '600px',
      height : '700px',
      data : Id
    
    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxGroupData();
    });
  }

  onSearchChange(event:string) {
    this.accountService.getAllCostCenter(event,new PageInfo());
    this.accountService.costCenterListView.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

 async Delete(id: number) {
    const deleted =await this.accountService.deleteTaxGroup(id);
    if( deleted)
      {
        const index = this.tableData.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.tableData.splice(index, 1);
    }
      }
  }
  search(event:string){
    console.log(event);
    
  }
  async confirmChange(event: any, user: any) {
    const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');
    if (confirmed) {
      const command :costCenterActivation = {
        id:user.id,
        status:user.isActive
      }
      this.accountService.costCenterActivation(command)
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


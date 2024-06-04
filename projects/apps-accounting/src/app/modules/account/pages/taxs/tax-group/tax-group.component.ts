import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { TagDto } from 'projects/erp-home/src/app/modules/general-setting/models';
import { PageInfoResult, MenuModule, RouterService, PageInfo } from 'shared-lib';
import { TaxDefinitionEditComponent } from '../../../components/tax-definition-edit/tax-definition-edit.component';
import { TaxDefinitionAddComponent } from '../../../components/tax-definition-add/tax-definition-add.component';
import { AccountService } from '../../../account.service';
import { TaxGroupDto } from '../../../models';
import { TaxGroupAddComponent } from '../../../components/tax-group-add/tax-group-add.component';

@Component({
  selector: 'app-tax-group',
  templateUrl: './tax-group.component.html',
  styleUrl: './tax-group.component.scss'
})
export class TaxGroupComponent implements OnInit {
  tableData: TaxGroupDto[];
  currentPageInfo: PageInfoResult;
  modulelist: MenuModule[];
  searchTerm: string;

  constructor(
    private routerService: RouterService,
    private accountService: AccountService,
    public authService: AuthService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.initTaxGroupData();
  }

  initTaxGroupData() {
    this.accountService.getAllTaxGroupPaginated('',new PageInfo());
    this.accountService.taxGroupList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.accountService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.accountService.getAllTaxGroupPaginated('',pageInfo);
    this.accountService.taxGroupList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  Add() {
    const dialogRef = this.dialog.open(TaxGroupAddComponent, {
      header : "Add New Tag",
      width: '700px',
      height: '600px',
      position: 'bottom-right' // Adjust position as needed
    
    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxGroupData();
    });
  }

  Edit(data:any) {
    const dialogRef = this.dialog.open(TaxDefinitionEditComponent, {
      header : "Add New Tag",
      width: '700px',
      height: '600px',
      data : data,
      position: 'bottom-right' // Adjust position as needed
    
    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxGroupData();
    });
  }

  onSearchChange() {
    this.accountService.getAllTaxGroupPaginated(this.searchTerm,new PageInfo());
    this.accountService.taxGroupList.subscribe({
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
}

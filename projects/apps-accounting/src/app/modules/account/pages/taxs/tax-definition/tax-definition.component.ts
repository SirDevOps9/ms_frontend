import { TaxDefinitionAddComponent } from './../../../components/tax-definition-add/tax-definition-add.component';
import { Component, OnInit, Signal, computed, effect, signal } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, MenuModule, RouterService, PageInfo, PaginationVm } from 'shared-lib';
import { AccountService } from '../../../account.service';
import { AccountDto, TaxDto } from '../../../models';
import { TaxDefinitionEditComponent } from '../../../components/tax-definition-edit/tax-definition-edit.component';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tax-definition',
  templateUrl: './tax-definition.component.html',
  styleUrl: './tax-definition.component.scss',
})
export class TaxDefinitionComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private accountService: AccountService
  ) {}

  tableData : TaxDto[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
 
  ngOnInit() {
    this.modulelist = this.authService.getModules();
    //  this.getTaxes();
     this.initTaxData();

  }

  initTaxData() {
    this.accountService.getAllTaxes('', new PageInfo());

    this.accountService.taxesDefintionList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.accountService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    // this.accountService.getAllTaxes('', pageInfo);

    this.accountService.getAllTaxes('', pageInfo);

    this.accountService.taxesDefintionList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onAdd() {
    const dialogRef =  this.dialog.open(TaxDefinitionAddComponent, {
      width: '600px',
      height: '550px',
    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxData();
    });
  }

  onEdit(data : TaxDto) {
    const dialogRef = this.dialog.open(TaxDefinitionEditComponent, {
      width: '600px',
      height: '550px',
      data : data
    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxData();
    });
  }

  onSearchChange() {
    this.accountService.getAllTaxes(this.searchTerm, new PageInfo());
    this.accountService.taxesDefintionList.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log(res);
      },
    });
  }

  onDelete(id: number) {
    this.accountService.deleteTax(id);
  }

 
}

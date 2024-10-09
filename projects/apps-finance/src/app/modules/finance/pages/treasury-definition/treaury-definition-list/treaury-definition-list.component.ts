import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  RouterService,
  PageInfoResult,
  MenuModule,
  PageInfo,
  lookupDto,
  LanguageService,
} from 'shared-lib';
import { FinanceService } from '../../../finance.service';
import { TreasureDefinitionDto } from '../../../models/treasureDefinitionsDto';
import { AddTreasuryComponent } from '../../../components/add-treasury/add-treasury.component';
import { EditTreasuryComponent } from '../../../components/edit-treasury/edit-treasury.component';
import { TaxDto } from '../../../../general/models';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ViewTreasuryComponent } from '../../../components/view-treasury/view-treasury.component';

@Component({
  selector: 'app-treaury-definition-list',
  templateUrl: './treaury-definition-list.component.html',
  styleUrl: './treaury-definition-list.component.scss',
})
export class TreauryDefinitionListComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private financeService: FinanceService,
    private languageService: LanguageService,
    private titleService: Title,
    private router: Router
  ) {}

  tableData: TreasureDefinitionDto[];
  exportData: TreasureDefinitionDto[];
  cols = [
    {
      field: 'Id',
      header: 'id',
    },
    {
      field: 'Code',
      header: 'code',
    },

    {
      field: 'Name',
      header: 'name',
    },
    {
      field: 'Currency Name',
      header: 'currencyName',
    },
    {
      field: 'Account Name',
      header: 'accountName',
    },
    {
      field: 'Opening Balance',
      header: 'openingBalance',
    },
  ];
  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  ngOnInit() {
    this.initTreasurData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  initTreasurData() {
    this.financeService.getTreasureDefinitions('', new PageInfo());

    this.financeService.sendTreasuryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.financeService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.financeService.getTreasureDefinitions('', pageInfo);

    this.financeService.sendTreasuryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  exportClick(e?: Event) {
    this.exportTreasuryData(this.searchTerm);
  }

  exportTreasuryData(searchTerm: string) {
    this.financeService.exportsTreasuryList(searchTerm);
    this.financeService.exportedTreasuryListDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddTreasuryComponent, {
      // header: this.languageService.transalte('treasury.addTreasury'),
      width: '650px',
      height: '600px',

      // position: 'bottom-right', // Adjust position as needed
    });

    dialogRef.onClose.subscribe(() => {
      this.initTreasurData();
    });
  }

  onEdit(data: TaxDto) {
    const dialogRef = this.dialog.open(EditTreasuryComponent, {
      // header: this.languageService.transalte('treasury.editTreasury'),
      width: '600px',
      height: '600px',
      data: data,
      // position: 'bottom-right', // Adjust position as needed
    });
    dialogRef.onClose.subscribe(() => {
      this.initTreasurData();
    });
  }

  view(id: number) {
    const dialogRef = this.dialog.open(ViewTreasuryComponent, {
      width: '600px',
      height: '600px',
      data: id,
    });
  }

  onSearchChange() {
    this.financeService.getTreasureDefinitions(this.searchTerm, new PageInfo());
    this.financeService.sendTreasuryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  routeTo(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`finance/reports/treasury-statement/${id}`])
    );
    window.open(url, '_blank');
  }

  onDelete(id: number) {
    this.financeService.deleteTreasury(id);
  }
}

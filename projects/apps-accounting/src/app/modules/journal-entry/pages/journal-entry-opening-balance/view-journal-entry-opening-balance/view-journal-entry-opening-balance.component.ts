import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService } from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { GetGlOpeningBalanceById } from '../../../models';
import { CostCenterAllocationPopupComponent } from '../../components/cost-center-allocation-popup/cost-center-allocation-popup.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-journal-entry-opening-balance',
  templateUrl: './view-journal-entry-opening-balance.component.html',
  styleUrl: './view-journal-entry-opening-balance.component.scss',
})
export class ViewJournalEntryOpeningBalanceComponent implements OnInit {
  data: any = {};
  journalView?: GetGlOpeningBalanceById;
  ID: number;
  totalDebitAmount: number;
  totalDebitAmountLocal: number;
  totalCreditAmountLocal: number;
  totalCreditAmount: number;
  ngOnInit() {
    this.ID = this.route.snapshot.params['id'];

    this.loadJournalView();
  }

  loadJournalView() {
    this.journalEntryService.getJournalEntryOpeningBalanceById(this.ID).subscribe((res) => {
      this.journalView = res;

      this.calculateTotalCreditAmount();
      this.calculateTotalDebitAmount();
      this.calculateTotalDebitAmountLocal();
      this.calculateTotalCreditAmountLocal();
    });
  }
  calculateTotalDebitAmount() {
    this.totalDebitAmount = this.journalView?.openingBalanceJournalEntryLines!.reduce(
      (acc, control) => {
        const debitValue = control.debitAmount;
        return acc + debitValue;
      },
      0
    )!;
  }
  calculateTotalCreditAmount() {
    this.totalCreditAmount = this.journalView?.openingBalanceJournalEntryLines!.reduce(
      (acc, control) => {
        const debitValue = control.creditAmount;
        return acc + debitValue;
      },
      0
    )!;
  }

  calculateTotalDebitAmountLocal() {
    this.totalDebitAmountLocal = this.journalView?.openingBalanceJournalEntryLines!.reduce(
      (acc, control) => {
        const debitValue = control.debitAmountLocal;
        return acc + debitValue;
      },
      0
    )!;
  }
  calculateTotalCreditAmountLocal() {
    this.totalCreditAmountLocal = this.journalView?.openingBalanceJournalEntryLines!.reduce(
      (acc, control) => {
        const debitValue = control.creditAmountLocal;
        return acc + debitValue;
      },
      0
    )!;
  }
  openCostPopup(data: any, text: string) {
    if (!data.creditAmount && !data.debitAmount) {
      return null;
    } else {
      const dialogRef = this.dialog.open(CostCenterAllocationPopupComponent, {
        width: '900px',
        height: '500px',
        header: 'View Cost Center Allocation',
        data: { ...data, text },
      });
      dialogRef.onClose.subscribe((res) => {
        if (res) data.costCenters = res;
      });
    }
  }

  constructor(
    private journalEntryService: JournalEntryService,
    private routerService: RouterService,
    private langService: LanguageService,
    private titleService: Title,
    private dialog: DialogService,
    private route: ActivatedRoute
  ) {
  }
}

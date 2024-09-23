import { Component, OnInit } from '@angular/core';
import { LanguageService, PageInfo, RouterService } from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { JournalEntryViewDto } from '../../../models';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { CostCenterAllocationPopupComponent } from '../cost-center-allocation-popup/cost-center-allocation-popup.component';

@Component({
  selector: 'app-view-journal-entry',
  templateUrl: './view-journal-entry.component.html',
  styleUrl: './view-journal-entry.component.scss',
  providers: [RouterService],
})
export class ViewJournalEntryComponent implements OnInit {
  data: any = {};
  journalView?: JournalEntryViewDto;
  totalDebitAmount: number;
  totalDebitAmountLocal: number;
  totalCreditAmountLocal: number;
  totalCreditAmount: number;
  ngOnInit() {

    this.loadJournalView();
  }

  loadJournalView() {
    this.journalEntryService.getJournalEntryViewById(this.routerService.currentId).subscribe((res) => {
      this.journalView = res;
      this.calculateTotalCreditAmount();
      this.calculateTotalDebitAmount();
      this.calculateTotalDebitAmountLocal();
      this.calculateTotalCreditAmountLocal();
    });
  }
  calculateTotalDebitAmount() {
    this.totalDebitAmount = this.journalView?.journalEntryLines!.reduce(
      (acc, control) => {
        const debitValue = control.debitAmount;
        return acc + debitValue;
      },
      0
    )!;
  }
  calculateTotalCreditAmount() {
    this.totalCreditAmount = this.journalView?.journalEntryLines!.reduce(
      (acc, control) => {
        const debitValue = control.creditAmount;
        return acc + debitValue;
      },
      0
    )!;
  }

  calculateTotalDebitAmountLocal() {
    this.totalDebitAmountLocal = this.journalView?.journalEntryLines!.reduce(
      (acc, control) => {
        const debitValue = control.debitAmountLocal;
        return acc + debitValue;
      },
      0
    )!;
  }
  calculateTotalCreditAmountLocal() {
    this.totalCreditAmountLocal = this.journalView?.journalEntryLines!.reduce(
      (acc, control) => {
        const debitValue = control.creditAmountLocal;
        return acc + debitValue;
      },
      0
    )!;
  }
  openCostPopup(data : any , text : string) {
    if(!data.creditAmount && !data.debitAmount){
      return null
    }else {
      const dialogRef =  this.dialog.open(CostCenterAllocationPopupComponent,{
        width: '900px',
        height: '600px',
        header : 'View Cost Center Allocation',
        data : {...data , text}
      });
      dialogRef.onClose.subscribe((res) => {
        if(res)data.costCenters = res
       
      });
    }
    
  }

  constructor(
    private journalEntryService: JournalEntryService,
    private routerService: RouterService,
    private langService: LanguageService,
    private titleService: Title,
    private dialog: DialogService,
  ) {

  }
}

import { Component, OnInit } from '@angular/core';
import { RouterService } from 'shared-lib';
import {
  BankPaymentMethods,
  SharedFinanceTranscationEnums,
  ViewPaymentOutDto,
} from '../../../models';
import { TranscationsService } from '../../../transcations.service';
import { DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PaymentOutPaymentMethodComponent } from '../../../components/paymentout/payment-out-payment-method/payment-out-payment-method.component';
import { AddPaymentOutCostCenterComponent } from '../../../components/paymentout/add-payment-out-cost-center/add-payment-out-cost-center.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-payment-out',
  templateUrl: './view-payment-out.component.html',
  styleUrls: ['./view-payment-out.component.scss'],
  providers: [RouterService],
})
export class ViewPaymentOutComponent implements OnInit {
  ViewForm: ViewPaymentOutDto;
  totalAmount: number = 0;
  paymentMethod: BankPaymentMethods[] = [];
  CostCenter: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: DialogService,
    private financeService: TranscationsService,
    public sharedFinanceEnums: SharedFinanceTranscationEnums,
    private routerService: RouterService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadView();

    this.financeService.AllPayMethodsDropdownObservable.subscribe((res: any) => {
      this.paymentMethod = res;
    });
  }

  calculateTotalAmount() {
    this.totalAmount = this.ViewForm.paymentOutDetails.reduce((acc, control) => {
      const debitValue = parseFloat(control.amount.toString()) || 0;
      return acc + debitValue;
    }, 0);
    this.calculateTotalLocalAmount();
  }
  calculateTotalLocalAmount() {
    let total = 0;
    this.ViewForm.paymentOutDetails.forEach((details: any) => {
      const amount = details.amount || 0;
      const rate = this.ViewForm.rate;
      if (rate) {
        total += amount * rate;
      }
    });
    return total;
  }

  loadView() {
    this.financeService.viewPaymentOut(this.routerService.currentId);
    this.financeService.ViewpaymentOutDataObservable.subscribe((res: any) => {
      this.ViewForm = res;
      this.ViewForm = res;
      if (this.ViewForm.bankId) {
        this.getAllPayMethodsDropdown(this.ViewForm.bankId!, this.ViewForm.bankAccountId!);
      }
    });
  }
  getAllPayMethodsDropdown(BankId: number, BankAccountId: number) {
    this.financeService.getAllPayMethodsDropdown(BankId, BankAccountId);
  }

  handleButtonClick(Line: any): void {
    if (Line.paymentMethodType == this.sharedFinanceEnums.paymentMethodTypeString.Cash) {
      return;
    } else {
      this.getAllPayMethodsDropdown(this.ViewForm.bankId!, this.ViewForm.bankAccountId!);
      const paymentMethodId = Line.paymentMethodId;
      const selectedPayment = this.paymentMethod.find((method) => method.id === paymentMethodId);
      if (selectedPayment) {
        const paymentMethodType = selectedPayment.paymentMethodType;

        this.openDialog(Line, selectedPayment, Line, Line.amount);
      }
    }
  }

  openDialog(value: any, selectedPayment: any, journal: any, amount: number) {
    if (
      selectedPayment.paymentMethodType == this.sharedFinanceEnums.paymentMethodTypeString.Cash ||
      selectedPayment.paymentMethodType == null
    ) {
      return true;
    } else {
      const data = value;
      const viewdata = true;
      const ref = this.dialog.open(PaymentOutPaymentMethodComponent, {
        width: '900px',
        height: '600px',
        data: { ...data, selectedPayment, viewdata },
      });
    }
  }
  openCostPopup(data: any, journal: FormGroup, account: number, index: number) {
    const viewdata = true;

    const dialogRef = this.dialog.open(AddPaymentOutCostCenterComponent, {
      width: '900px',
      height: '600px',
      header: 'Edit Cost Center Allocation',
      data: { ...data, viewdata },
    });
  }

  isCostCenterallowed(journalLine: any, costCenterConfig: string): boolean {
    console.log(costCenterConfig, 'costCenterConfig');
    if (
      costCenterConfig === this.sharedFinanceEnums.costCenterConfig.Mandatory ||
      costCenterConfig === this.sharedFinanceEnums.costCenterConfig.Optional
    ) {
      return true;
    } else {
      this.CostCenter = this.formBuilder.group({
        costCenterId: new FormControl(null),
        percentage: new FormControl(null),
      });

      return false;
    }
  }
  routeToJournalView(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/accounting/transcations/journalentry/view/${id}`])
    );
    window.open(url, '_blank');
  }
}

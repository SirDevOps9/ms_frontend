import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RouterService } from 'shared-lib';
import { BankPaymentMethods, SharedFinanceTranscationEnums } from '../../../models';
import { TranscationsService } from '../../../transcations.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ViewPaymentInDto } from '../../../models/view-payment-in-dto';
import { PaymentMethodComponent } from '../../../components/paymentin/payment-method/payment-method.component';
import { AddCostCenterComponent } from '../../../components/paymentin/add-cost-center/add-cost-center.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-payment-in',
  templateUrl: './view-payment-in.component.html',
  styleUrl: './view-payment-in.component.scss',
  providers: [RouterService],
})
export class ViewPaymentInComponent {
  ViewForm: ViewPaymentInDto;
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
  }

  calculateTotalAmount() {
    this.totalAmount = this.ViewForm.paymentInDetails.reduce((acc, control) => {
      const debitValue = parseFloat(control.amount.toString()) || 0;
      return acc + debitValue;
    }, 0);
    this.calculateTotalLocalAmount();
  }
  calculateTotalLocalAmount() {
    let total = 0;
    this.ViewForm.paymentInDetails.forEach((details: any) => {
      const amount = details.amount || 0;
      const rate = this.ViewForm.rate;
      if (rate) {
        total += amount * rate;
      }
    });
    return total;
  }

  loadView() {
    this.financeService.viewPaymentIn(this.routerService.currentId);
    this.financeService.ViewpaymentInDataObservable.subscribe((res: any) => {
      this.ViewForm = res;
      if (this.ViewForm.bankId) {
        this.getAllPayMethodsDropdown(this.ViewForm.bankId!, this.ViewForm.bankAccountId!);
      }
    });
  }
  getAllPayMethodsDropdown(BankId: number, BankAccountId: number) {
    this.financeService.getAllPayMethodsDropdown(BankId, BankAccountId);
    this.financeService.AllPayMethodsDropdown.subscribe((res: any) => {
      this.paymentMethod = res;
    });
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
      const ref = this.dialog.open(PaymentMethodComponent, {
        width: '900px',
        height: '600px',
        data: { ...data, selectedPayment, viewdata },
      });
    }
  }
  openCostPopup(data: any, journal: FormGroup, account: number, index: number) {
    const viewdata = true;

    const dialogRef = this.dialog.open(AddCostCenterComponent, {
      width: '900px',
      height: '600px',
      header: 'Edit Cost Center Allocation',
      data: { ...data, viewdata },
    });
  }

  isCostCenterallowed(journalLine: any, costCenterConfig: string): boolean {
    if (
      costCenterConfig == this.sharedFinanceEnums.costCenterConfig.Mandatory ||
      costCenterConfig == this.sharedFinanceEnums.costCenterConfig.Optional
    ) {
      return true;
    } else {
      this.CostCenter = this.formBuilder.group({
        costCenterId: new FormControl(null),
        percentage: new FormControl(null),
      });
      // journalLine.get('paymentInDetailCostCenters')?.setValue([]);

      return false;
    }
  }

  routeToJournalView(id: number) {
    if(id){
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/accounting/transcations/journalentry/view/${id}`])
      );
      window.open(url, '_blank');
    }else return
    }
  
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CurrentUserService, customValidators, FormsService, LanguageService, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { BankPaymentMethods, paymentplace, SharedFinanceTranscationEnums } from '../../../models';
import { Title } from '@angular/platform-browser';
import { TranscationsService } from '../../../transcations.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ViewPaymentInDto } from '../../../models/view-payment-in-dto';
import { PaymentMethodComponent } from '../../../components/paymentin/payment-method/payment-method.component';

@Component({
  selector: 'app-view-payment-in',
  templateUrl: './view-payment-in.component.html',
  styleUrl: './view-payment-in.component.scss',
  providers: [RouterService],
})
export class ViewPaymentInComponent {
  ViewForm: ViewPaymentInDto;
  totalAmount: number = 0;
  paymentMethod: BankPaymentMethods[] = []



  constructor(
    private formBuilder: FormBuilder,
    private dialog: DialogService,
    private lookupsService: LookupsService,
    private financeService: TranscationsService,
    private formsService: FormsService,
    public  sharedFinanceEnums: SharedFinanceTranscationEnums,
    private toasterService: ToasterService,
    private langService: LanguageService,
    private currentUserService: CurrentUserService,
    private titleService: Title,
    private routerService: RouterService,


  ) {
  }
  ngOnInit() {
    this.titleService.setTitle(
      this.langService.transalte('PaymentIn.addpaymentin')
    );
    this.loadView();


    this.financeService.AllPayMethodsDropdownObservable.subscribe((res: any) => {
      this.paymentMethod = res
    })
  }

  calculateTotalAmount() {
    this.totalAmount = this.ViewForm.paymentInDetails.reduce((acc, control) => {
      const debitValue = parseFloat(control.amount.toString()) || 0;
      return acc + debitValue;
    }, 0);
    this.calculateTotalLocalAmount()
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
      this.ViewForm = res
      console.log("ViewForm",this.ViewForm);
    })
  }
  getAllPayMethodsDropdown(BankId: number, BankAccountId: number) {
    this.financeService.getAllPayMethodsDropdown(BankId, BankAccountId)
  }

  handleButtonClick(Line: any): void {

    this.getAllPayMethodsDropdown(this.ViewForm.bankId!,this.ViewForm.bankAccountId!)
    const paymentMethodId = Line.paymentMethodId;
    console.log("Line.paymentmethodId",Line.paymentMethodId)
    const selectedPayment = this.paymentMethod.find(method => method.id === paymentMethodId);
console.log("selectedPayment",selectedPayment)
    if (selectedPayment) {
      Line.get('paymentMethodType')?.setValue(selectedPayment.paymentMethodType);
      const paymentMethodType = selectedPayment.paymentMethodType;
      this.openDialog(Line.value, selectedPayment, Line, Line.amount);
    }
  }
  
  openDialog(value: any, selectedPayment: any, journal: any, amount: number) {
    if (selectedPayment.paymentMethodType == this.sharedFinanceEnums.paymentMethodTypeString.Cash || selectedPayment.paymentMethodType == null) {
      return true
    } else {
      const data = value
      const viewdata = false;
      const ref = this.dialog.open(PaymentMethodComponent, {
        width: '900px',
        height: '600px',
        data: { ...data, selectedPayment,viewdata },
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          journal.get('paymentInMethodDetail')?.setValue(res);
        }
      });
    }
  }
}

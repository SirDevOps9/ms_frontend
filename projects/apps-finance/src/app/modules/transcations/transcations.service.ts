import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LanguageService,
  LoaderService,
  PageInfo,
  PageInfoResult,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { TranscationsProxyService } from './transcations-proxy.service';
import { BehaviorSubject, map } from 'rxjs';
import {
  AccountDto,
  AddPaymentMethodDto,
  AddPaymentTermDto,
  CurrencyRateDto,
  GetAllPaymentInDto,
  GetAllPaymentOutDto,
} from './models';
import { GetPaymentMethodByIdDto } from './models/get-payment-method-by-id-dto';

@Injectable({
  providedIn: 'root',
})
export class TranscationsService {
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public paymentInDataSource = new BehaviorSubject<GetAllPaymentInDto[]>([]);
  public exportedpaymentinListDataSource = new BehaviorSubject<GetAllPaymentInDto[]>([]);
  public sendPaymentMethodByID = new BehaviorSubject<GetPaymentMethodByIdDto>(
    {} as GetPaymentMethodByIdDto
  );
  public getTreasuryDropDownData = new BehaviorSubject<any>([]);
  public getBankDropDownData = new BehaviorSubject<any>([]);
  public getCustomerDropdownData = new BehaviorSubject<any>([]);
  public getVendorDropdownData = new BehaviorSubject<any>([]);
  public AllPayMethodsDropdown = new BehaviorSubject<any>([]);
  public AllTreasuriesPayMethodsDropdown = new BehaviorSubject<any>([]);
  public AccountBalance = new BehaviorSubject<number | undefined>(0);
  public TreasuryBalance = new BehaviorSubject<number | undefined>(0);
  public paymentSaved = new BehaviorSubject<number | undefined>(0);
  public paymentOutSaved = new BehaviorSubject<number | undefined>(0);
  public childrenAccountDataSource = new BehaviorSubject<AccountDto[]>([]);
  public childrenAccountList = this.childrenAccountDataSource.asObservable();
  public childrenAccountPageInfo = new BehaviorSubject<PageInfoResult>({});
  public paymentDetails = new BehaviorSubject<any>({});
  public accountCurrencyRateDataSource = new BehaviorSubject<CurrencyRateDto>({ rate: 0 });
  private paymenInLineDeleted = new BehaviorSubject<boolean>(false);
  public paymenInLineDeletedObser = this.paymenInLineDeleted.asObservable();

  private paymenOutLineDeleted = new BehaviorSubject<boolean>(false);
  public paymentOutLineDeletedObser = this.paymenOutLineDeleted.asObservable();

  paymentDetailsnDataObservable = this.paymentDetails.asObservable();
  getVendorDropdownDataObservable = this.getVendorDropdownData.asObservable();
  getCustomerDropdownDataObservable = this.getCustomerDropdownData.asObservable();
  getBankDropDownDataObservable = this.getBankDropDownData.asObservable();
  getTreasuryDropDownDataObservable = this.getTreasuryDropDownData.asObservable();
  sendPaymentMethodByIDObservable = this.sendPaymentMethodByID.asObservable();
  AllPayMethodsDropdownObservable = this.AllPayMethodsDropdown.asObservable();
  AllTreasuriesPayMethodsDropdownObservable = this.AllTreasuriesPayMethodsDropdown.asObservable();
  AccountBalanceObservable = this.AccountBalance.asObservable();
  TreasuryBalanceObservable = this.TreasuryBalance.asObservable();
  accountCurrencyRate = this.accountCurrencyRateDataSource.asObservable();
  paymentInDataSourceObservable = this.paymentInDataSource.asObservable();
  exportedPaymentinDataSourceObservable = this.exportedpaymentinListDataSource.asObservable();

  public paymentOutDataSource = new BehaviorSubject<GetAllPaymentOutDto[]>([]);
  public exportedpaymentOutListDataSource = new BehaviorSubject<GetAllPaymentOutDto[]>([]);
  paymentOutDataSourceObservable = this.paymentOutDataSource.asObservable();
  exportedPaymentOutDataSourceObservable = this.exportedpaymentOutListDataSource.asObservable();

  public paymentOutDetails = new BehaviorSubject<any>({});
  paymentOutDetailsDataObservable = this.paymentOutDetails.asObservable();

  public paymentOutCurrentPageInfo = new BehaviorSubject<PageInfoResult>({});

  public ViewpaymentIn = new BehaviorSubject<any>({});
  ViewpaymentInDataObservable = this.ViewpaymentIn.asObservable();

  public viewpaymentOut = new BehaviorSubject<any>({});
  ViewpaymentOutDataObservable = this.viewpaymentOut.asObservable();

  constructor(
    private TranscationsProxy: TranscationsProxyService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private http: HttpClient,
    private routerService: RouterService
  ) {}

  BankAccountDropDown(id: number) {
    return this.TranscationsProxy.BankAccountDropDown(id);
  }
  BankDropDown() {
    return this.TranscationsProxy.BankDropDown();
  }

  bankDropDown() {
    this.TranscationsProxy.BankDropDown().subscribe((res) => {
      if (res) {
        this.getBankDropDownData.next(res);
      }
    });
  }

  treasuryDropDown() {
    this.TranscationsProxy.treasuryDropDown().subscribe((res) => {
      if (res) {
        this.getTreasuryDropDownData.next(res);
      }
    });
  }
  customerDropdown() {
    this.TranscationsProxy.CustomerDropdown().subscribe((res) => {
      if (res) {
        this.getCustomerDropdownData.next(res);
      }
    });
  }
  vendorDropdown() {
    this.TranscationsProxy.VendorDropdown().subscribe((res) => {
      if (res) {
        this.getVendorDropdownData.next(res);
      }
    });
  }

  addPaymentMethod(obj: AddPaymentMethodDto) {
    this.TranscationsProxy.addPaymentMethod(obj).subscribe((res) => {
      if (res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('add-paymentMethod.add')
        );
        this.routerService.navigateTo('/masterdata/payment-method');
      }
    });
  }
  getPaymentMethodByID(id: number) {
    this.TranscationsProxy.getPaymentMethodByID(id).subscribe((res) => {
      if (res) {
        this.sendPaymentMethodByID.next(res);
      }
    });
  }
  editPaymentMethod(obj: any) {
    this.TranscationsProxy.editPaymentMethod(obj).subscribe((res) => {
      if (res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('add-paymentMethod.edit')
        );
        this.routerService.navigateTo('/masterdata/payment-method');
      }
    });
  }
  addPaymentIn(obj: AddPaymentTermDto) {
    this.loaderService.show();

    this.TranscationsProxy.addPaymentIn(obj).subscribe({
      next: (res) => {
        this.loaderService.hide();

        this.toasterService.showSuccess(
          this.languageService.transalte('PaymentIn.Success'),
          this.languageService.transalte('PaymentIn.PaymentInAddedSuccessfully')
        );
        this.paymentSaved.next(res);
        // this.routerService.navigateTo('/transcations/paymentin');
      },
      error: (error) => {
        this.loaderService.hide();
        if (error.messageCode != 4001) {
          this.toasterService.showError(
            this.languageService.transalte('Error'),
            this.languageService.transalte(error.message)
          );
        }
      },
    });
  }

  addPaymentOut(obj: AddPaymentTermDto) {
    this.loaderService.show();

    this.TranscationsProxy.addPaymentOut(obj).subscribe({
      next: (res) => {
        this.loaderService.hide();

        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('PaymentOut.add')
        );
        this.paymentOutSaved.next(res);

        // this.routerService.navigateTo('/transcations/paymentout');
      },
      error: (error) => {
        this.loaderService.hide();
        if (error.messageCode != 4001) {
          this.toasterService.showError(
            this.languageService.transalte('Error'),
            this.languageService.transalte(error.message)
          );
        }
      },
    });
  }
  getAllPayMethodsDropdown(BankId: number, BankAccountId: number) {
    this.TranscationsProxy.GetAllPayMethodsDropdown(BankId, BankAccountId).subscribe((res) => {
      if (res) {
        this.AllPayMethodsDropdown.next(res);
      }
    });
  }
  GetAllTreasuriesPaymentMethodsDropdown() {
    this.TranscationsProxy.GetAllTreasuriesPaymentMethodsDropdown().subscribe((res) => {
      if (res) {
        this.AllTreasuriesPayMethodsDropdown.next(res);
      }
    });
  }
  GetTreasuryBalance(id: number) {
    this.TranscationsProxy.GetTreasuryBalance(id).subscribe((res) => {
      this.TreasuryBalance.next(res);
    });
  }
  GetAccountBalance(id: number) {
    this.TranscationsProxy.GetAccountBalance(id).subscribe((res) => {
      this.AccountBalance.next(res);
    });
  }
  getAccountsHasNoChildren(quieries: string, pageInfo: PageInfo) {
    return this.TranscationsProxy.getAccountsHasNoChildren(quieries, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAccountsHasNoChildrenNew(quieries: string, pageInfo: PageInfo) {
    this.TranscationsProxy.getAccountsHasNoChildrenNew(quieries, pageInfo).subscribe((res) => {
      this.childrenAccountDataSource.next(res.result);
      this.childrenAccountPageInfo.next(res.pageInfoResult);
    });
  }
  getAccountCurrencyRate(currentCurrency: number, accountCurrency: number) {
    this.TranscationsProxy.getAccountCurrencyRate(currentCurrency, accountCurrency).subscribe(
      (response) => {
        this.accountCurrencyRateDataSource.next(response);
      }
    );
  }
  getAllPaymentIn(quieries: string, pageInfo: PageInfo) {
    this.TranscationsProxy.getAllPymentIn(quieries, pageInfo).subscribe((response) => {
      this.paymentInDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }

  exportsPaymentInList(searchTerm?: string ,SortBy?:number,SortColumn?:string) {
    this.TranscationsProxy.exportsPaymentInList(searchTerm ,SortBy,SortColumn).subscribe({
      next: (res: any) => {
        this.exportedpaymentinListDataSource.next(res);
      },
    });
  }

  async deletePaymentIn(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.TranscationsProxy.deletePaymentIn(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('payment-in.delete')
          );
          this.loaderService.hide();
          const currentPaymentIn = this.paymentInDataSource.getValue();
          const updatedcurrentPaymentIn = currentPaymentIn.filter((c: any) => c.id !== id);
          this.paymentInDataSource.next(updatedcurrentPaymentIn);
        },
        error: (error) => {
          this.loaderService.hide();
          this.toasterService.showError(
            this.languageService.transalte('Error'),
            this.languageService.transalte(error.message)
          );
        },
      });
    }
  }

  async paymentInDeleteLine(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.loaderService.show();

      this.TranscationsProxy.PaymentInDeleteLine(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Success'),
            this.languageService.transalte('payment-in.delete')
          );
          this.loaderService.hide();
          this.paymenInLineDeleted.next(res);
        },
        error: () => {
          this.loaderService.hide();
          this.toasterService.showError(
            this.languageService.transalte('Error'),
            this.languageService.transalte('ErrorInDelete')
          );
        },
      });
    }
  }

  async paymentOutDeleteLine(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.loaderService.show();

      this.TranscationsProxy.paymentOutDeleteLine(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Success'),
            this.languageService.transalte('PaymentOut.delete')
          );
          this.loaderService.hide();
          this.paymenOutLineDeleted.next(res);
        },
        error: (error) => {
          this.loaderService.hide();
          this.toasterService.showError(
            this.languageService.transalte('Error'),
            this.languageService.transalte(error.message)
          );
        },
      });
    }
  }

  getPaymentInById(id: number) {
    this.TranscationsProxy.GetPaymentInById(id).subscribe((res) => {
      if (res) {
        this.paymentDetails.next(res);
      }
    });
  }

  editPaymentIn(obj: any) {
    this.loaderService.show();

    this.TranscationsProxy.editPaymentIn(obj).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('PaymentIn.PaymentInEditedSuccessfully')
        );
        this.loaderService.hide();

        this.routerService.navigateTo('/transcations/paymentin');
      },
      error: (error) => {
        this.loaderService.hide();
      },
    });
  }

  postPaymentIn(id: number) {
    this.loaderService.show();

    this.TranscationsProxy.postPaymentIn(id).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('PaymentIn.Success'),
          this.languageService.transalte('PaymentIn.PaymentInPostedSuccessfully')
        );
        this.loaderService.hide();

        this.routerService.navigateTo('/transcations/paymentin');
      },
      error: (error) => {
        this.loaderService.hide();
        this.toasterService.showError(
          this.languageService.transalte('PaymentIn.Error'),
          this.languageService.transalte(error.message)
        );
      },
    });
  }

  editPaymentOut(obj: any) {
    this.TranscationsProxy.editPaymentOut(obj).subscribe((res) => {
      this.loaderService.show();

      if (res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('PaymentOut.edit')
        );
        this.loaderService.hide();

        this.routerService.navigateTo('/transcations/paymentout');
      }
    });
  }

  postPaymentOut(id: number) {
    this.loaderService.show();
    this.TranscationsProxy.postPaymentOut(id).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('PaymentOut.PaymentOutPostedSuccessfully')
        );
        this.loaderService.hide();

        this.routerService.navigateTo('/transcations/paymentout');
      },
      error: (error) => {
        this.loaderService.hide();
        this.toasterService.showError(
          this.languageService.transalte('Error'),
          this.languageService.transalte(error.message)
        );
      },
    });
  }

  GetPaymentOutById(id: number) {
    this.TranscationsProxy.GetPaymentOutById(id).subscribe((res) => {
      if (res) {
        this.paymentOutDetails.next(res);
      }
    });
  }

  getAllPaymentOut(quieries: string, pageInfo: PageInfo) {
    this.TranscationsProxy.getAllPymentOut(quieries, pageInfo).subscribe((response) => {
      this.paymentOutDataSource.next(response.result);
      this.paymentOutCurrentPageInfo.next(response.pageInfoResult);
    });
  }

  exportsPaymentOutList(searchTerm: string | undefined) {
    this.TranscationsProxy.exportsPaymentOutList(searchTerm).subscribe({
      next: (res: any) => {
        this.exportedpaymentOutListDataSource.next(res);
      },
    });
  }
  async deletePaymentOut(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.TranscationsProxy.deletePaymentOut(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('PaymentOut.delete')
          );
          this.loaderService.hide();
          const currentPaymentOut = this.paymentOutDataSource.getValue();
          const updatedcurrentPaymentOut = currentPaymentOut.filter((c: any) => c.id !== id);
          this.paymentOutDataSource.next(updatedcurrentPaymentOut);
        },
        error: (error) => {
          this.loaderService.hide();
          this.toasterService.showError(
            this.languageService.transalte('Error'),
            this.languageService.transalte(error.message)
          );
        },
      });
    }
  }
  viewPaymentIn(id: number) {
    this.TranscationsProxy.viewPaymentInById(id).subscribe((res) => {
      if (res) {
        this.ViewpaymentIn.next(res);
      }
    });
  }
  viewPaymentOut(id: number) {
    this.TranscationsProxy.viewPaymentOutById(id).subscribe((res) => {
      if (res) {
        this.viewpaymentOut.next(res);
      }
    });
  }
}

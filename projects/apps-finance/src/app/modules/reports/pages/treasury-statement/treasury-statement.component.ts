import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  customValidators,
  FormsService,
  LanguageService,
  PrintService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import {
  treasuryStatementDto,
  TreasuryStatementfilterDto,
  TreasuryStatmentTransactionDto,
} from '../../models';
import { TreasuryDropDown } from '../../../finance/models';
import { TranscationsService } from '../../../transcations/transcations.service';
import { ReportsService } from '../../reports.service';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { SourceDocument } from '../../models/source-document-dto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-treasury-statement',
  templateUrl: './treasury-statement.component.html',
  styleUrls: ['./treasury-statement.component.scss'],
  providers: [RouterService],
})
export class TreasuryStatementComponent implements OnInit {
  reportForm: FormGroup;
  treasuryDropDown: TreasuryDropDown[] = [];
  currency: string | undefined;
  tableData?: treasuryStatementDto;
  total: number = 0;
  selectedTreasuryName: string = '';


  fromDate : string = ''
  toDate : string = ''

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private financeService: TranscationsService,
    private PrintService: PrintService,
    private ReportService: ReportsService,
    public generalService: GeneralService,
    private formsService: FormsService,
    private router: Router,
    private routerService: RouterService,

    private ToasterService: ToasterService
  ) {}

  ngOnInit() {
    
    this.getTreasuryDropDown();
    this.initializeForm();
    this.initializeDates();
    this.getTreasuryFromRoute();
    this.reportForm.valueChanges.subscribe(() => {
      this.tableData = undefined;
    });
    this.reportForm.get('treasuryId')!.valueChanges.subscribe((Id) => {
      const selected = this.treasuryDropDown.find((x) => x.id === Id);
      if (selected) {
        this.reportForm.get('currency')!.setValue(selected.currencyName);
        this.currency = selected.currencyName;
        this.selectedTreasuryName = selected.name;
      }
    });

    this.reportForm.get('dateFrom')?.valueChanges.subscribe((res: any) => {
      this.fromDate = this.formatDate(res, 'yyyy-MM-dd');
    })
    this.reportForm.get('dateTo')?.valueChanges.subscribe((res: any) => {
      this.toDate = this.formatDate(res, 'yyyy-MM-dd');
    })
  }

  getTreasuryDropDown() {
    this.financeService.treasuryDropDown();
    this.financeService.getTreasuryDropDownDataObservable.subscribe((res: TreasuryDropDown[]) => {
      this.treasuryDropDown = res;
      if(res)
      this.currency = res.find( x =>x.id == this.routerService.currentId)?.currencyName
    });
  }

  initializeForm() {
    this.reportForm = this.fb.group({
      dateFrom: new FormControl('', [customValidators.required]),
      dateTo: new FormControl('', [customValidators.required]),
      treasuryId: new FormControl('', [customValidators.required]),
      currency: new FormControl(''),
    });
    this.reportForm.controls['dateFrom'].patchValue(new Date());
    this.reportForm.controls['dateTo'].patchValue(new Date());

  }

  initializeDates() {
    const today = new Date();
    let startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    startOfMonth.setDate(startOfMonth.getDate() + 1);

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);

    this.formatDate(this.reportForm.controls['dateFrom'].value, 'yyyy-MM-dd');
    this.formatDate(this.reportForm.controls['dateTo'].value, 'yyyy-MM-dd');
    this.reportForm.patchValue({
      dateFrom: startOfMonth.toISOString().split('T')[0],
      dateTo: endOfMonth.toISOString().split('T')[0],
    });
  }

  printTable(id: string) {
    this.PrintService.print(id);
  }
  getReportData() {
    if (!this.formsService.validForm(this.reportForm, false)) return;
    if (this.reportForm.get('dateFrom')?.value > this.reportForm.get('dateTo')?.value) {
      this.ToasterService.showError(
        this.languageService.transalte('Error'),
        this.languageService.transalte('DateFromLessThanToValidation')
      );
    }

    const formValue = this.reportForm.value;
    const filterDto: TreasuryStatementfilterDto = {
      DateFrom: formValue.dateFrom,
      DateTo: formValue.dateTo,
      TreasuryId: formValue.treasuryId,
    };
    this.ReportService.getTreasuryStatement(filterDto);
    this.ReportService.treasuryStatementObservable.subscribe((res) => {
      this.tableData = res;
    });
  }

  routeToPaymentView(transaction: TreasuryStatmentTransactionDto) {
    const currentUrl = location.href.split('/');

    if (transaction.paymentName == SourceDocument.PaymentIn) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([
          `${currentUrl[3]}/transcations/paymentin/view/${transaction.paymentInHeaderId}`,
        ])
      );
      window.open(url, '_blank');
    } else {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([
          `${currentUrl[3]}/transcations/paymentout/view/${transaction.paymentOutHeaderId}`,
        ])
      );
      window.open(url, '_blank');
    }
  }

  getTreasuryFromRoute() {
    if (this.routerService.currentId)
      this.reportForm.controls['treasuryId'].patchValue(parseInt(this.routerService.currentId));
  }

  routeToJournalView(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/accounting/transcations/journalentry/view/${id}`])
    );
    window.open(url, '_blank');
  }


  //  format date 
  formatDate(date: string, format: string): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(date, format) || '';
  }
}

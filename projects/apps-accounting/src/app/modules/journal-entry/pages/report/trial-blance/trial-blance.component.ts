import { Component, OnInit, ViewChild } from '@angular/core';
import { reportTrialDto } from '../../../models';
import { DateTimeService, LanguageService, PageInfo, PrintService, RouterService, ToasterService, customValidators } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { JournalEntryService } from '../../../journal-entry.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {  AccountsChildrenDropDown } from '../../../../account/models';
import { AccountService } from '../../../../account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trial-blance',
  templateUrl: './trial-blance.component.html',
  styleUrl: './trial-blance.component.scss'
})
export class TrialBlanceComponent implements OnInit {
  reportTrialForm: FormGroup;
  filteredAccounts: AccountsChildrenDropDown[] = [];
  defoultSelectedAcounts: number[] = []

  tableData: reportTrialDto[] = [];
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    private ToasterService: ToasterService,
    private PrintService: PrintService,
    private dateTimeService: DateTimeService,
    private router:Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.languageService.transalte('reportTrial.trialBalance'));
    this.tableData = []
    this.initializeForm()
    this.getAccounts();
    this.initializeDates()
    this.reportTrialForm.valueChanges.subscribe((res) => {
      this.tableData = []

    }
    )

  }
  printTable(id: string) {
    this.PrintService.print(id)
  }

  getAccounts() {
    this.accountService
    .getDetailedAccounts()
    .subscribe((r) => {
      this.filteredAccounts = r.map(account => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`

      }));
      });

  }
  initializeForm() {
    this.reportTrialForm = this.fb.group({

      dateFrom: new FormControl('', [
        customValidators.required,
      ]),
      dateTo: new FormControl('', [
        customValidators.required,
      ]),
      posted: new FormControl(true),
      unposted: new FormControl(false),
      allowZero : new FormControl(false),
      Accounts: new FormControl([]),

    });
  }
  getTrialBalance() {

    if (this.reportTrialForm.valid) {
      if (this.reportTrialForm.get('dateFrom')?.value < this.reportTrialForm.get('dateTo')?.value) {

        if (this.reportTrialForm.get('posted')?.value != true && this.reportTrialForm.get('unposted')?.value != true) {
          // At least one field must be selected
          this.ToasterService.showError(
            this.languageService.transalte('reportTrial.Error'),
            this.languageService.transalte('reportTrial.selectfaild')
          )
        }
        else {
          if(this.reportTrialForm.get('Accounts')?.value == null)
            this.reportTrialForm.get('Accounts')?.setValue([]);
          this.journalEntryService.getTrialBalance(this.reportTrialForm.value);
          this.journalEntryService.report.subscribe(((res: any) => {
             this.tableData = res
          

          }))
        }
      } else {
        this.ToasterService.showError(
          this.languageService.transalte('reportTrial.Error'),
          this.languageService.transalte(' date From is not before the end of dateTo.')
        )
      }
    }
  }
  initializeDates() {
    this.reportTrialForm.patchValue({
      dateFrom: this.dateTimeService.firstDayOfMonth(),
      dateTo: this.dateTimeService.lastDayOfMonth(),
    });
  }
  routeTo(id:number){
const test =location.href.split("/")
    console.log(test[3]);
const url = this.router.serializeUrl(
  this.router.createUrlTree([`${test[3]}/transcations/account-statement/${id}`])
);
window.open(url, '_blank');
  }

}

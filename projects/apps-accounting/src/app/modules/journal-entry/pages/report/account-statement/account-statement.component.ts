import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterService, LanguageService, PageInfo, customValidators, ToasterService } from 'shared-lib';
import { AccountService } from '../../../../account/account.service';
import { AccountDto } from '../../../../account/models';
import { JournalEntryService } from '../../../journal-entry.service';
import { reportAccount, reportTrialDto } from '../../../models';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrl: './account-statement.component.scss'
})
export class AccountStatementComponent {
  reportAccountForm: FormGroup;
  filteredAccounts: AccountDto[] = [];
defoultSelectedAcounts:number[]=[]
 
  tableData: reportAccount[];
  cols: any[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    private ToasterService:ToasterService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.languageService.transalte('reportAccount.AccountStatement'));
    // this.tableData=[
    //   {
    //     "accountCode": "1101001004",
    //     "accountName": "صندوق 4",
    //     "natuar": "Debit",
    //     "journalEntryDtos": []
    // },
    //   {
    //     "accountCode": "string",
    //     "accountName": "string",
    //     "natuar": "string",
    //     "journalEntryDtos": [
    //       {
    //         "journalEntryCode": "string",
    //         "journalEntryDate": "2024-06-26T11:25:17.813Z",
    //         "description": "string",
    //         "debitAmount": 0,
    //         "creditAmount": 0,
    //         "balance": 0,
    //         "sourceDocumentCode": "string",
    //         "sourceDocumentName": "string"
    //       },{
    //         "journalEntryCode": "string",
    //         "journalEntryDate": "2024-06-26T11:25:17.813Z",
    //         "description": "string",
    //         "debitAmount": 0,
    //         "creditAmount": 0,
    //         "balance": 0,
    //         "sourceDocumentCode": "string",
    //         "sourceDocumentName": "string"
    //       }
    //     ]
    //   },
    //   {
    //     "accountCode": "string",
    //     "accountName": "string",
    //     "natuar": "string",
    //     "journalEntryDtos": [
    //       {
    //         "journalEntryCode": "string",
    //         "journalEntryDate": "2024-06-26T11:25:17.813Z",
    //         "description": "string",
    //         "debitAmount": 0,
    //         "creditAmount": 0,
    //         "balance": 0,
    //         "sourceDocumentCode": "string",
    //         "sourceDocumentName": "string"
    //       },{
    //         "journalEntryCode": "string",
    //         "journalEntryDate": "2024-06-26T11:25:17.813Z",
    //         "description": "string",
    //         "debitAmount": 0,
    //         "creditAmount": 0,
    //         "balance": 0,
    //         "sourceDocumentCode": "string",
    //         "sourceDocumentName": "string"
    //       }
    //     ]
    //   },
    // ]
    this. initializeForm()
    this.getAccounts();
    this.initializeDates()

    setTimeout(() => {
      this.getAccountingReports()

    }, 500);

    this.reportAccountForm.valueChanges.subscribe(()=>{
        this.tableData=[]
    }
    )

  }
  getAccounts() {
    this.accountService
      .getAccountsHasNoChildren('', new PageInfo())
      .subscribe((r) => {
        this.filteredAccounts = r.result.map(account => ({
          ...account,
          displayName: `${account.name} (${account.accountCode})`

        }));
        this.filteredAccounts.forEach(element => {
          this.defoultSelectedAcounts.push(element.id)  
        });

        this.reportAccountForm.patchValue({
          Accounts:this.defoultSelectedAcounts
        })
        
      });
     
  }
  initializeForm() {
    this.reportAccountForm = this.fb.group({
    
      dateFrom: new FormControl('', [
        customValidators.required,
      ]),
      dateTo: new FormControl('', [
        customValidators.required,
      ]),
      posted: new FormControl(true),
      unposted: new FormControl(false),
      Accounts: new FormControl('', [
        customValidators.required,
      ]),
     
    });
  }
  getAccountingReports(){
    
    if(this.reportAccountForm.valid){
      if( this.reportAccountForm.get('dateFrom')?.value < this.reportAccountForm.get('dateTo')?.value ){
        if(this.reportAccountForm.get('posted')?.value != true && this.reportAccountForm.get('unposted')?.value != true ){
          // At least one field must be selected
          this.ToasterService.showError(
            this.languageService.transalte('reportTrial.Error'),
                this.languageService.transalte('reportTrial.selectfaild')
            )
        }
        else{
          this.journalEntryService.getAccountingReports(this.reportAccountForm.value);
          this.journalEntryService.accountReport.subscribe(((res:any)=>{
             this.tableData=res
            
          }))
        }
      }else{
        this.ToasterService.showError(
          this.languageService.transalte('reportTrial.Error'),
              this.languageService.transalte(' date From is not before the end of dateTo.')
          )
      }
    
    }
  }
  initializeDates() {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth()+1 );
    this.reportAccountForm.patchValue({
      dateFrom: today.toISOString().split('T')[0],
      dateTo: endOfMonth.toISOString().split('T')[0],
      
    });
  }

 
}
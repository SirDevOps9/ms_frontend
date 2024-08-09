import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { customValidators } from 'shared-lib';
import { CustomerOpeningBalanceNoChildrenComponent } from '../../../components/customer-opening-Balance/customer-opening-balance-no-children/customer-opening-balance-no-children.component';
import { CustomerOpeningBalanceDistributeComponent } from '../../../components/customer-opening-balance-distribute/customer-opening-balance-distribute.component';
import { TranslationService } from 'projects/adminportal/src/app/modules/i18n';
import { SalesService } from '../../../sales.service';
import { CategoryDropdownDto } from '../../../models';

@Component({
  selector: 'app-add-customer-opeening-balance',
  templateUrl: './add-customer-opeening-balance.component.html',
  styleUrl: './add-customer-opeening-balance.component.scss'
})
export class AddCustomerOpeeningBalanceComponent implements OnInit {
  formGroup: FormGroup
  customerForm: FormArray
  openingJournalList: CategoryDropdownDto[];
  LinesDropDown: any;
  CustomerDropDownByAccountId: any
  amount: string;
  balanceTypeSelect: string;
  debitOrCredit: string;

  filteredAccounts: AccountDto[] = [];
  balanceType: any = [{ label: "Debit", value: "Debit" }, { label: "Credit", value: "Credit" }]
  openingBalanceJournalEntryLineId: number
  amountNature: string
  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private translationService: TranslationService,
    private SalesService: SalesService
  ) { }
  ngOnInit(): void {
    this.getCustomerOpeningBalance()
    // Initialize formGroup
    this.formGroup = this.fb.group({
      open: new FormControl('', customValidators.required),
      open2: new FormControl('', customValidators.required),
      name1: '',
      name2: '',
    });

    // Initialize customerForm as FormArray
    this.customerForm = this.fb.array([this.createBankFormGroup()]);
    this.openingBalanceJournalEntryDropdown()
    this.formGroup = this.fb.group({
      open: new FormControl('', customValidators.required),
      open2: new FormControl('', customValidators.required),
      name1: '',
      name2: '',
    })
    this.customerForm = this.fb.array([this.createBankFormGroup()]);

    this.createBankFormGroup()
  }



  public get items(): FormArray {
    return this.customerForm as FormArray;
  }

  addLine() {
    this.items.push(this.createBankFormGroup())
    this.customerForm.updateValueAndValidity();
  }

  onDelete( id:number ,index: number): void {


    this.SalesService.deleteCustomerOpeningBalance(id)
    this.SalesService.customerDeletedObser.subscribe((res:boolean)=>{
      if(res!=false){
        this.customerForm.removeAt(index);

      }
    })
  }

  createBankFormGroup(): FormGroup {
    return this.fb.group({
      id: 0,
      customerId: new FormControl('', customValidators.required),
      accountName: '',
      balance: null,
      balanceType: new FormControl('', customValidators.required),
      displayName: null,
      dueDates: []
    });
  }


 
  accountSelected(event: any, index: number) {
    const bankLine = this.items.at(index); 

    if (bankLine) {
      var accountData: any = this.CustomerDropDownByAccountId.find((c: any) => c.id == event);

      if (accountData) {
        bankLine.get('accountName')?.setValue(accountData?.name);
        bankLine.get('accountCode')?.setValue(accountData?.accountCode);
        bankLine.get('displayName')?.setValue(`${accountData.code}`);
      }
    } else {
      console.error(`No FormGroup found at index ${index}`);
    }
  }

  openDialog(index: number) {
    const ref = this.dialog.open(CustomerOpeningBalanceNoChildrenComponent, {
      width: '60%',
      height: '600px'

    });
    ref.onClose.subscribe((r) => {
      if (r) {
        this.customerForm.at(index)?.get('accountName')?.setValue(r.name);
        this.customerForm.at(index)?.get('customerId')?.setValue(r.accountCode);

      }
    });


  }

  openDistribute(data: any, account: number, index: number, customerGroup: FormGroup) {
    let accountData = this.filteredAccounts.find((elem) => elem.id === account);

    if (data.balanceType != "Debit") {
      return null;
    } else {
      const ref = this.dialog.open(CustomerOpeningBalanceDistributeComponent, {
        header: 'Due Date Distribution',
        width: '60%',
        height: '650px',
        data: data,
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          data.dueDates = res;
        }
      });

    }

  }
  openingBalanceJournalEntryDropdown() {
    this.SalesService.openingBalanceJournalEntryDropdown();
    this.SalesService.openingBalanceJournalEntryDropdownDataObservable.subscribe((res) => {
      this.openingJournalList = res;

    });
  }
  onopeningJournalChange(event: any) {
    this.getLinesDropDown(event)

  }
  getLinesDropDown(id: number) {
    this.SalesService.getLinesDropDown(id);
    this.SalesService.LinesDropDownDataObservable.subscribe((res: any) => {
      this.LinesDropDown = res;
    });
  }
  onLinesChange(event: any) {
    this.LinesDropDown.forEach((element: any) => {
      if (element.id == event) {
        this.formGroup.patchValue({
          name1: element.amount,
          name2: element.amountNature
        })
        this.getCustomerDropDownByAccountId(element.accountId)
        this.openingBalanceJournalEntryLineId = element.id
        this.amountNature = element.amountNature
      }
    });

  }
  getCustomerDropDownByAccountId(id: number) {
    this.SalesService.getCustomerDropDownByAccountId(id);
    this.SalesService.CustomerDropDownByAccountIdObservable.subscribe((res) => {
      this.CustomerDropDownByAccountId = res;

    });
  }
  balanceTypeSelected(event: any) {
    this.balanceTypeSelect = event
  }
  onSubmit() {
    this.customerForm.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
    const body = {
      openingBalanceJournalEntryLineId: this.openingBalanceJournalEntryLineId,
      amountNature: this.amountNature,
      customerOpeningBalanceDetails: this.items.value
    }
    this.SalesService.AddCustomerOpeningBalance(body)
    
  
  }

  // getCustomerOpeningBalance() {
  //   this.SalesService.getCustomerOpeningBalance();
  //   this.SalesService.CustomerOpeningBalancelistObservable.subscribe((res: any) => {
  //     // Initialize or clear the customerForm array
  //     if (!this.customerForm) {
  //       this.customerForm = this.fb.array([]);
  //     } else {
  //       this.customerForm.clear();
  //     }
  
  //     if (res) {
  //       // Patch main form values
  //       this.formGroup.patchValue({
  //         open: res.openingBalanceJournalEntryId || '',
  //         open2: res.openingBalanceJournalEntryLineId || '',
  //         name1: res.amount || '',
  //         name2: res.amountNature || ''
  //       });
  
  //       // Get dropdown options for lines
  //       this.getLinesDropDown(res.openingBalanceJournalEntryId);
  
  //       setTimeout(() => {
  //         if (this.LinesDropDown.length !== 0) {
  //           this.LinesDropDown.forEach((element: any) => {
  //             if (element.id === res.openingBalanceJournalEntryLineId) {
  //               this.getCustomerDropDownByAccountId(element.accountId);
  //               this.openingBalanceJournalEntryLineId = element.id;
  //               this.amountNature = element.amountNature;
  //             }
  //           });
  //         }
  //       }, 500);
  
  //       // Check if customerOpeningDetails is an array and process each item
  //       if (res.customerOpeningDetails && Array.isArray(res.customerOpeningDetails)) {
  //         res.customerOpeningDetails.forEach((detail: any, index: number) => {
  //           const formGroup = this.createBankFormGroup();
  
  //           if (detail) {
  //             formGroup.patchValue({
  //               id: detail.id,
  //               customerId: detail.customerId || '',
  //               accountName: detail.customerName || '',
  //               balance: detail.balance || null,
  //               balanceType: detail.balanceType || '',
  //               displayName: detail.displayName || '',
  //               dueDates: detail.balanceDueDates || []
  //             });
  //           }
  
  //           // Push the form group to the customerForm array
  //           this.customerForm.push(formGroup);
  
  //           // Call accountSelected to handle any additional logic for the selected customerId
  //           this.accountSelected(detail.customerId, index);
  //         });
  //       }
  //     }
  //   });
  // }
  getCustomerOpeningBalance() {
    this.SalesService.getCustomerOpeningBalance();
    this.SalesService.CustomerOpeningBalancelistObservable.subscribe((res: any) => {
      // Initialize or clear the customerForm array
      if (!this.customerForm) {
        this.customerForm = this.fb.array([]);
      } else {
        this.customerForm.clear();
      }
  
      if (res) {
        // Patch main form values
        this.formGroup.patchValue({
          open: res.openingBalanceJournalEntryId || '',
          open2: res.openingBalanceJournalEntryLineId || '',
          name1: res.amount || '',
          name2: res.amountNature || ''
        });
  
        // Get dropdown options for lines
        this.getLinesDropDown(res.openingBalanceJournalEntryId);
  
        // Wait for LinesDropDown to be populated
        this.SalesService.LinesDropDownDataObservable.subscribe(() => {
          if (this.LinesDropDown.length !== 0) {
            this.LinesDropDown.forEach((element: any) => {
              if (element.id === res.openingBalanceJournalEntryLineId) {
                this.getCustomerDropDownByAccountId(element.accountId);
                this.openingBalanceJournalEntryLineId = element.id;
                this.amountNature = element.amountNature;
              }
            });
          }
  
          // Populate customerForm with customerOpeningDetails
          if (res.customerOpeningDetails && Array.isArray(res.customerOpeningDetails)) {
            res.customerOpeningDetails.forEach((detail: any, index: number) => {
              const formGroup = this.createBankFormGroup();
  
              if (detail) {
                formGroup.patchValue({
                  id: detail.id,
                  customerId: detail.customerId || '',
                  accountName: detail.customerName || '',
                  balance: detail.balance || null,
                  balanceType: detail.balanceType || '',
                  displayName: detail.displayName || '',
                  dueDates: detail.balanceDueDates || []
                });
              }
  
              this.customerForm.push(formGroup);
  
              this.accountSelected(detail.customerId, index);
            });
          }
        });
      }
    });
  }
  

}

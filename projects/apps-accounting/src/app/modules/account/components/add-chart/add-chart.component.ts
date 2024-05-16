import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormsService, PageInfo, RouterService, customValidators } from 'shared-lib';
import { AccountService } from '../../account.service';
import { AddAccountDto } from '../../models/addAccountDto';
import { CurrencyService } from '../../../general/currency.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { AccountDto } from '../../models/accountDto';
import { AccountSectionDropDownDto } from '../../models/accountSectionDropDownDto';
import { AccountTypeDropDownDto } from '../../models/accountTypeDropDownDto';

@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrl: './add-chart.component.scss'
})
export class AddChartComponent {
  formGroup: FormGroup;
  filteredAccounts: AccountDto[] = [];
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  accountSections : AccountSectionDropDownDto[];
  accountTypes : AccountTypeDropDownDto[];
  constructor(
               private formBuilder: FormBuilder,
               private accountService: AccountService,
               private routerService: RouterService,
               private currencyService: CurrencyService,
               private formsService: FormsService)
               {
                  this.formGroup = formBuilder.group({
                      nameAr: ['', customValidators.length(0,255)],
                      nameEn: ['', customValidators.length(0,255)],
                      levelId: [''],
                      accountCode: ['', customValidators.required],
                      parentId: [''],
                      parentAccountCode: [''],
                      natureId: ['',customValidators.required],
                      hasNoChild: [''],
                      accountTypeId: ['',customValidators.required],
                      accountSectionId: ['',customValidators.required],
                      currencyId: [''],
                      tags: formBuilder.array([]),
                      periodicActive : [''],
                      periodicActiveFrom : [''],
                      periodicActiveTo : ['']
                    });
               }
  ngOnInit() {
    this.accountService.getAllChartOfAccountPaginated('', new PageInfo())
      .subscribe(r => this.filteredAccounts = r.result);

    this.currencyService.getCurrencies('')
      .subscribe(r => this.currencies = r);

      this.accountService.getAccountSections().subscribe(res => this.accountSections = res);
    }
    getAccountTypes(sectionId:number){
      this.accountService.getAccountTypes(sectionId).subscribe(res => this.accountSections == res);
    }

    onSubmit() {
      if (!this.formsService.validForm(this.formGroup, true)) return;

      let obj: AddAccountDto = this.formGroup.value;
      
      this.accountService.addAccount(obj)
                  .subscribe(r => r == true ?
                          this.routerService.navigateTo('ChartOfAccounts') : false);
    }
}
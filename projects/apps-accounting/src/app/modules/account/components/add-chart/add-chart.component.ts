import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RouterService, customValidators } from 'shared-lib';
import { AccountService } from '../../account.service';
import { AddAccountDto } from '../../models/addAccountDto';

@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrl: './add-chart.component.scss'
})
export class AddChartComponent {
  formGroup: FormGroup;
  constructor(
               private formBuilder: FormBuilder,
               private accountService: AccountService,
               private routerService: RouterService,)
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
    }

    addAccount(formValue: FormGroup) {
      let obj: AddAccountDto = formValue.value;
      this.accountService.addAccount(obj)
                  .subscribe(r => r == true ?
                          this.routerService.navigateTo('ChartOfAccounts') : false);
    }
}
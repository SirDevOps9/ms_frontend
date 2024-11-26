import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SharedFinanceEnums } from 'projects/apps-finance/src/app/modules/finance/models';
import { FormsService, customValidators } from 'shared-lib';

@Component({
  selector: 'app-change-sales-phone-number',
  templateUrl: './change-sales-phone-number.component.html',
  styleUrl: './change-sales-phone-number.component.scss',
})
export class ChangeSalesPhoneNumberComponent implements OnInit {
  configData: any = {};
  formGroup: FormGroup;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    public sharedFinanceEnums: SharedFinanceEnums,
    private formService: FormsService
  ) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      phoneNumber: [],
    });
  }

  onCancel() {
    this.ref.close();
  }
  onSubmit() {}
}

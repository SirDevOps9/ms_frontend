import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from '../../account.service';
import { customValidators } from 'shared-lib';
import { TaxGroupDto } from '../../models';

@Component({
  selector: 'app-tax-group-edit',
  templateUrl: './tax-group-edit.component.html',
  styleUrls: ['./tax-group-edit.component.scss']
})
export class TaxGroupEditComponent implements OnInit {
  taxGroupForm: FormGroup;
  get Id(): string {
    return this.config?.data?.id;
  }

  constructor(
    private accountService: AccountService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
  
  ) {}

  ngOnInit() {
    this.initializeTagForm();
  }

  initializeTagForm() {
    this.taxGroupForm = this.fb.group({
      code: new FormControl('', customValidators.required),
      name: new FormControl('', customValidators.required)
        });
  }

  save() {
    if(!this.taxGroupForm.valid) return;
    const taxGroupDto :TaxGroupDto=this.taxGroupForm.value;
    this.accountService.editTaxGroup(taxGroupDto,this.ref);
  }

  close() {
    this.ref.close();
  }

}

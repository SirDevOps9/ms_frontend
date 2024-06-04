import { Component } from '@angular/core';
import { AccountService } from '../../account.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageInfoResult, PageInfo, customValidators, FormsService, RouterService, LookupsService } from 'shared-lib';
import { AccountDto, TaxGroupDropDown, AddTax } from '../../models';

@Component({
  selector: 'app-tax-definition-edit',
  templateUrl: './tax-definition-edit.component.html',
  styleUrl: './tax-definition-edit.component.scss'
})
export class TaxDefinitionEditComponent {
  addForm: FormGroup;
  accounts: AccountDto[];
  taxGroupList:TaxGroupDropDown[];
  paging: PageInfoResult;
  taxGroupId:string;
  pageInfo = new PageInfo();

  ngOnInit() {
    this.initializeForm();
    this.getAccounts('');

    this.accountService.getAllTaxGroups();

    this.accountService.taxGroupsDropDown.subscribe((res) => {
      this.taxGroupList = res;
    });

    this.addForm.controls['taxGroupId'].valueChanges.subscribe((value) => {
      this.taxGroupId = value;
    });
  }

  private initializeForm() {
    this.addForm = this.formBuilder.group({
      name: new FormControl('', [customValidators.required]),
      code: new FormControl('', [customValidators.required]),
      ratio: new FormControl('', [customValidators.required]),
      accountId: new FormControl(),
      taxGroupId: new FormControl(''),
    });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.addForm, true)) return;
    const request: AddTax = this.addForm.value;
    this.accountService.addTax(request, this.ref);
  }

  getAccounts(searchTerm: string) {
    this.accountService.getAccountsHasNoChildren(searchTerm, this.pageInfo).subscribe((r) => {

      this.accounts = r.result;
      this.paging = r.pageInfoResult;
    });
  }

  getTaxGroups() {
    this.accountService.getAllTaxGroups();
  }

  save() {
    this.ref.close();
  }

  close() {
    this.ref.close();
  }

  constructor(
    private accountService: AccountService,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private routerService: RouterService,
  ) {}
}

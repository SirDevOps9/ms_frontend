import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import {
  AccountDto,
  AddTax,
  GetLevelsDto,
  TaxGroupDropDown,
  listAddLevelsDto,
} from 'projects/apps-accounting/src/app/modules/account/models';
import { FormsService, LookupsService, PageInfo, PageInfoResult, RouterService, customValidators } from 'shared-lib';

@Component({
  selector: 'app-tax-definition-add',
  templateUrl: './tax-definition-add.component.html',
  styleUrl: './tax-definition-add.component.scss',
})
export class TaxDefinitionAddComponent {
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
      accountId: new FormControl('', [customValidators.required]),
      taxGroupId: new FormControl('', [customValidators.required]),
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
    public lookupsService: LookupsService
  ) {}
}
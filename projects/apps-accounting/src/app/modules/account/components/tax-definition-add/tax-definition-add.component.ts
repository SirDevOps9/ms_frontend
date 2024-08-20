import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import {
  AccountDto,
  AccountsChildrenDropDown,
  AddTax,
  GetLevelsDto,
  TaxGroupDropDown,
  listAddLevelsDto,
} from 'projects/apps-accounting/src/app/modules/account/models';
import {
  FormsService,
  LanguageService,
  LookupsService,
  PageInfo,
  PageInfoResult,
  RouterService,
  customValidators,
} from 'shared-lib';

@Component({
  selector: 'app-tax-definition-add',
  templateUrl: './tax-definition-add.component.html',
  styleUrl: './tax-definition-add.component.scss',
})
export class TaxDefinitionAddComponent {
  addForm: FormGroup;
  accounts: AccountsChildrenDropDown[];
  taxGroupList: TaxGroupDropDown[];
  paging: PageInfoResult;
  taxGroupId: string;
  pageInfo = new PageInfo();

  ngOnInit() {
    this.initializeForm();
    this.getAccounts('');

    this.accountService.getAllTaxGroups();

    this.accountService.taxGroupsDropDown.subscribe((res) => {
      this.taxGroupList = res;
    });

    this.addForm.controls['taxGroupId'].valueChanges.subscribe((value) => {
      this.taxGroupId = this.taxGroupList.find((x) => x.id == value)?.code!;
    });
  }

  private initializeForm() {
    this.addForm = this.formBuilder.group({
      name: new FormControl('', [customValidators.required]),
      code: new FormControl('', [customValidators.required]),
      ratio: new FormControl('', [customValidators.required]),
      accountId: new FormControl('', [customValidators.required]),
      taxGroupId: new FormControl('', [customValidators.required]),


      journalDate: new FormControl('', [customValidators.required]),
      description: new FormControl('', [customValidators.required]),
      paymentHubId: new FormControl('', [customValidators.required]),
      paymentHubDetails: new FormControl('', [customValidators.required]),
      bankAccountId: new FormControl('', [customValidators.required]),
      currency: new FormControl('', [customValidators.required]),
      rate: new FormControl('', [customValidators.required]),
      sourceDocument: new FormControl('', [customValidators.required]),
      createdJournal: new FormControl('', [customValidators.required]),



    });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.addForm)) return;
    const request: AddTax = this.addForm.value;
    this.accountService.addTax(request, this.ref);
  }

  getAccounts(searchTerm: string) {
    this.accountService.getAccountsChildrenDropDown().subscribe((r) => {
      this.accounts = r;
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

  /// 
  paymentHubs: { id: number, name: string }[] = [
    { id: 1, name: 'Hub 1' },
    { id: 2, name: 'Hub 2' },
  ];

  bankAccounts: { id: number, name: string }[] = [
    { id: 1, name: 'Bank Account 1' },
    { id: 2, name: 'Bank Account 2' },
  ];

  constructor(
    private accountService: AccountService,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private title: Title,
    private langService: LanguageService,
    private routerService: RouterService,
    public lookupsService: LookupsService
  ) {
    this.title.setTitle(this.langService.transalte('Tax.AddTax'));
  }
}

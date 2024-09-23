import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import {
  FormsService,
  LanguageService,
  LookupsService,
  PageInfo,
  PageInfoResult,
  RouterService,
  customValidators,
} from 'shared-lib';
import { AccountsChildrenDropDown } from '../../models/accounts-children-dropdown-dto';
import { TaxGroupDropDown } from '../../models/tax-group-drop-down';
import { GeneralSettingService } from '../../general-setting.service';
import { AddTax } from '../../models/add-tax';
import { NoChildrenAccountsComponent } from '../noChildrenAccounts/nochildaccounts.component';

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

    this.generalSettingService.getAllTaxGroups();

    this.generalSettingService.taxGroupsDropDown.subscribe((res) => {
      this.taxGroupList = res;
    });

    this.addForm.controls['taxGroupId'].valueChanges.subscribe((value) => {
      this.taxGroupId = this.taxGroupList.find((x) => x.id == value)?.code!;
    });
  }

  private initializeForm() {
    this.addForm = this.formBuilder.group({
      name: new FormControl('', [customValidators.required]),
      code: new FormControl('', [customValidators.required,customValidators.length(1,5)]),
      ratio: new FormControl('', [customValidators.required]),
      accountId: new FormControl('', [customValidators.required]),
      taxGroupId: new FormControl('', [customValidators.required]),
    });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.addForm)) return;
    const request: AddTax = this.addForm.value;
    this.generalSettingService.addTax(request, this.ref);
  }

  getAccounts(searchTerm: string) {
    this.generalSettingService.getAccountsChildrenDropDown().subscribe((r) => {
      this.accounts = r;
    });
  }

  getTaxGroups() {
    this.generalSettingService.getAllTaxGroups();
  }

  save() {
    this.ref.close();
  }

  close() {
    this.ref.close();
  }
  openDialog() {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((r) => {
      if (r) {
        this.addForm.get('accountId')?.setValue(r.id);
      }
    });
  }
  constructor(
    private generalSettingService: GeneralSettingService,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private title: Title,
    private langService: LanguageService,
    private routerService: RouterService,
    public lookupsService: LookupsService,
    private dialog: DialogService,

  ) {
    this.title.setTitle(this.langService.transalte('Tax.AddTax'));
  }
}

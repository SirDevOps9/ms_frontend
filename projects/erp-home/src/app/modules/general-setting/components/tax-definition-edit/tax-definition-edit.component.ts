import { Component, effect } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageInfoResult, PageInfo, customValidators, FormsService, RouterService, LookupsService, LanguageService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { AccountDto } from '../../models';
import { TaxGroupDropDown } from '../../models/tax-group-drop-down';
import { GeneralSettingService } from '../../general-setting.service';
import { EditTax } from '../../models/edit-tax';
import { NoChildrenAccountsComponent } from '../noChildrenAccounts/nochildaccounts.component';

@Component({
  selector: 'app-tax-definition-edit',
  templateUrl: './tax-definition-edit.component.html',
  styleUrl: './tax-definition-edit.component.scss'
})
export class TaxDefinitionEditComponent {
  editForm: FormGroup;
  accounts: AccountDto[];
  taxGroupList:TaxGroupDropDown[];
  paging: PageInfoResult;
  taxGroupId:string;
  selectedAccount?:number;
  selectedTaxGroup? : number
  pageInfo = new PageInfo();

  ngOnInit() {
    this.initializeForm();
    this.getAccounts('');

    this.generalSettingService.getAllTaxGroups();

    this.generalSettingService.taxGroupsDropDown.subscribe((res) => {
      this.taxGroupList = res;
    });

    this.editForm.controls['taxGroupId'].valueChanges.subscribe((value) => {
      this.taxGroupId = value;
    });

    this.generalSettingService.getTaxById(this.config.data.id)

    this.generalSettingService.currentTaxDataSource.subscribe(res=>{
      if(res) {
        this.editForm.patchValue({...res})
        this.selectedTaxGroup = res.taxGroupId;
        this.selectedAccount = res.accountId;
      }
    })

 

  }


  private initializeForm() {
    this.editForm = this.formBuilder.group({
      id:null,
      name: new FormControl('', [customValidators.required]),
      code: new FormControl('', [customValidators.required ]),
      ratio: new FormControl('', [customValidators.required]),
      accountId: new FormControl('', [customValidators.required]),
      taxGroupId: new FormControl('', [customValidators.required]),
    });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.editForm, true)) return;
    const request: EditTax = this.editForm.getRawValue();
    this.generalSettingService.editTax(request, this.ref);
  }

  getAccounts(searchTerm: string) {
    this.generalSettingService.getAccountsHasNoChildren(searchTerm, this.pageInfo).subscribe((r) => {

      this.accounts = r.result;
      this.paging = r.pageInfoResult;
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
        this.editForm.get('accountId')?.setValue(r.id);

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
    private routerService: RouterService,
    private title: Title,
    private langService: LanguageService,
    public lookupsService: LookupsService,
    private dialog: DialogService,

  ) {
    this.title.setTitle(this.langService.transalte('Tax.EditTax'));

  }
}

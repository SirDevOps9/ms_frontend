import { Component, effect } from '@angular/core';
import { AccountService } from '../../account.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageInfoResult, PageInfo, customValidators, FormsService, RouterService, LookupsService, LanguageService } from 'shared-lib';
import { AccountDto, TaxGroupDropDown, AddTax, EditTax } from '../../models';
import { Title } from '@angular/platform-browser';

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

    this.accountService.getAllTaxGroups();

    this.accountService.taxGroupsDropDown.subscribe((res) => {
      this.taxGroupList = res;

      console.log(res)
    });

    this.editForm.controls['taxGroupId'].valueChanges.subscribe((value) => {
      this.taxGroupId = value;
    });

    this.accountService.getTaxById(this.config.data.id)

    this.accountService.currentTaxDataSource.subscribe(res=>{
      console.log(res)
      if(res) {
        this.editForm.patchValue({...res})
        this.selectedTaxGroup = res.taxGroupId;
        this.selectedAccount = res.accountId;

        console.log("selected value",res );
      }
    })

 

  }


  private initializeForm() {
    this.editForm = this.formBuilder.group({
      id:null,
      name: new FormControl('', [customValidators.required]),
      code: new FormControl('', [customValidators.required]),
      ratio: new FormControl('', [customValidators.required]),
      accountId: new FormControl('', [customValidators.required]),
      taxGroupId: new FormControl('', [customValidators.required]),
    });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.editForm, true)) return;
    const request: EditTax = this.editForm.getRawValue();
    this.accountService.editTax(request, this.ref);
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
    private title: Title,
    private langService: LanguageService,
    public lookupsService: LookupsService
  ) {
    this.title.setTitle(this.langService.transalte('Tax.EditTax'));

  }
}

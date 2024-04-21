import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { CompanyService } from '../../company.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AddCompanyPopupDto } from '../../models';
@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.scss',
})
export class NewCompanyComponent {
  addCompanyForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  companyId: string;
  holdingCompanies: lookupDto[] = []; 

  get subdomainId(): number {
    return this.config.data.Id;
  }

  ngOnInit() {
    this.getHoldingCompanies(); 
    this.initializeForm();
    this.loadLookups();
    this.Subscribe();

  }

  onSubmit() {
    if (!this.formsService.validForm(this.addCompanyForm, true)) return;
    const request: AddCompanyPopupDto = this.addCompanyForm.value;
    request.subdomainId = this.subdomainId;
    this.companyService.addCompanyPopup(request, this.ref).subscribe((res) => {
      this.companyId = res.id;
    });
  }
  private initializeForm() {
    this.addCompanyForm = this.formBuilder.group({
      name: new FormControl('', [
        customValidators.required,
        customValidators.length(5, 100),
      ]),
      branchName: new FormControl('', [customValidators.required]),
      companyType: new FormControl('', [customValidators.required]),
      parentId: new FormControl(),
      companyLogo: new FormControl(''),
    });
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.CompanyHolding,
      LookupEnum.CompanyType,
    ]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }


  getHoldingCompanies() {
    this.companyService.getHoldingCompanies(this.subdomainId).subscribe(res => {
      this.holdingCompanies = res; 
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSaveAndEdit() {
    if (!this.formsService.validForm(this.addCompanyForm, true)) return;
    const request: AddCompanyPopupDto = this.addCompanyForm.value;
    request.subdomainId = this.subdomainId;
    this.companyService.addCompanyPopup(request, this.ref).subscribe((res) => {
      this.companyId = res.id;
      this.routerService.navigateTo('company/edit/' + this.companyId);
    });
  }

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private routerService: RouterService,
    private companyService: CompanyService,
    public sharedLibEnums: SharedLibraryEnums,
    public lookupsService: LookupsService
  ) {}
}

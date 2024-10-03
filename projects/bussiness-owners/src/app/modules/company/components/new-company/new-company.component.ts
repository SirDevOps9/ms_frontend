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
import { CreateCompany, CompanyTypes } from '../../models';
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
  showHoldingCompanies: boolean = false;
  isFirstCompany: boolean = false;
  selectedCompanyType='';
  selectedCountryCode: string | null;
  selectedCurrency?: string ;


  get subdomainId(): string {
    return this.config.data.Id;
  }

  ngOnInit() {
    this.getHoldingCompanies();
    this.initializeForm();
    this.loadLookups();
    this.Subscribe();
    this.checkFirstCompany();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.addCompanyForm, true)) return;
    const request: CreateCompany = this.addCompanyForm.value;
    request.subdomainId = this.subdomainId;
    this.companyService.addCompany(request, this.ref).subscribe((res) => {
      this.companyId = res.data.id;
    });
  }
  private initializeForm() {
    this.addCompanyForm = this.formBuilder.group({
      name: new FormControl('', [customValidators.required]),
      branchName: new FormControl('', [customValidators.required]),
      companyType: new FormControl('', [customValidators.required]),
      parentId: new FormControl(),
      companyLogo: new FormControl(''),
      countryCode: new FormControl('', [customValidators.required]),
      currencyId: new FormControl('', [customValidators.required]),

    });
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.CompanyHolding,
      LookupEnum.CompanyType,
      LookupEnum.Country,
      LookupEnum.Currency

    ]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  checkFirstCompany() {
    this.companyService.checkIfFirstCompany().subscribe(isFirst => {
      if (isFirst) {
        this.addCompanyForm.controls['companyType'].setValue(CompanyTypes.Holding);
        this.isFirstCompany = true;
        this.selectedCompanyType = CompanyTypes.Holding.toString();
      }
    });
  }

  getHoldingCompanies() {
    this.companyService
      .getAllHoldingCompanies(this.subdomainId)
      .subscribe((res) => {
        this.holdingCompanies = res;
      });
  }

  onCancel() {
    this.ref.close();
  }

  onSaveAndEdit() {
    if (!this.formsService.validForm(this.addCompanyForm, true)) return;
    const request: CreateCompany = this.addCompanyForm.value;
    request.subdomainId = this.subdomainId;
    this.companyService.addCompany(request, this.ref).subscribe((res) => {
      this.companyId = res.data.id;
      this.routerService.navigateTo('company/edit/' + this.companyId);
    });
  }

  isSubsidairy(event: any) {
    const companyType = event;
    if (companyType == CompanyTypes.Subsidiary) {
      this.showHoldingCompanies = true;
    } else {
      this.showHoldingCompanies = false;
    }
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

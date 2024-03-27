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
import { AddCompanyPopupDto } from '../../models/addcompanypopupdto';
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

  companyTypes = [
    { id: 1, name: 'Holding' },
    { id: 2, name: 'Subsidiary' },
  ];
  ngOnInit() {
    this.initializeForm();
    this.loadLookups();
    this.Subscribe();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.addCompanyForm, true)) return;
    const request: AddCompanyPopupDto = this.addCompanyForm.value;
    request.companyLogo = 'logo';
    request.subdomainId = 2;
    //request.companyType=1;
    this.companyService.addCompanyPopup(request, this.ref).subscribe((res) => {
      this.companyId = res.response.id;
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
      parentCompany: new FormControl(),
      //companyLogo: new FormControl('', [customValidators.required]),
    });
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.CompanyType,
      LookupEnum.Company,
    ]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  onCancel() {
    this.ref.close();
  }

  get subdomainId(): string {
    return this.routerService.currentId;
  }

  onSaveAndEdit() {
    if (!this.formsService.validForm(this.addCompanyForm, true)) return;
    const request: AddCompanyPopupDto = this.addCompanyForm.value;
    request.companyLogo = 'logo';
    request.subdomainId = 2;

    this.companyService.addCompanyPopup(request, this.ref).subscribe((res) => {
      this.companyId = res.response.id;
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

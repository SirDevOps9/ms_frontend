import { Component, OnInit } from '@angular/core';
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
import { CompanyProxy } from '../../company.proxy';
import { AddCompanyPopupDto } from '../../models/addcompanypopup';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-company-popup',
  templateUrl: './add-company-popup.component.html',
  styleUrls: ['./add-company-popup.component.css'],
})
export class AddCompanyPopupComponent implements OnInit {
  companyForm: FormGroup;
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;

  get currentSubdomainId(): string {
    return this.config.data.Id;
  }

  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => {(this.lookups = l)
      console.log("CompanyTypeLookUp",l)
    });
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.CompanyType,
      LookupEnum.Company,
    ]);
  }
  ngOnInit() {
    this.loadLookups();
    this.initializeCompanyForm();
    this.Subscribe();
  }

  onSubmit() {
    if (this.formsService.validForm(this.companyForm, true)) return;
    const request: AddCompanyPopupDto = this.companyForm.value;
     request.subdomainId = 2;
     //request.companyType =1;
    this.companyService.addCompanyPopup(request, this.ref);
  }

  private initializeCompanyForm() {
    this.companyForm = this.formBuilder.group({
      name: new FormControl('', [
        customValidators.required,
        customValidators.length(5, 100),
      ]),
      branchName: new FormControl('', [customValidators.required]),
      companyType: new FormControl('', [customValidators.required]),
      parentCompany: new FormControl('', [customValidators.required]),
      companyLogo: new FormControl('', [customValidators.required]),
    });
  }

  onSaveAndEdit() {}

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private routerService: RouterService,
    private companyService: CompanyService,
    private companyProxy: CompanyProxy,
    public sharedLibEnums: SharedLibraryEnums,
    public lookupsService: LookupsService
  ) {}
}

import { Component, Input, OnInit } from '@angular/core';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CompanyService } from '../../company.service';
import { CompanyContactDto } from '../../models/companycontactdto';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  providers: [RouterService],
  styleUrl: './company-contact.component.scss',
})
export class CompanyContactComponent implements OnInit {
  companyContactForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
   editMode: boolean = false;
  //@Input() companyId: string;
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  selectedMobileCode: string;

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
    this.loadLookups();
    this.Subscribe();
  }

  submitForm() {
    console.log(this.companyContactForm);
  }
  onSubmit() {
    if (!this.formsService.validForm(this.companyContactForm, true)) return;
    const request: CompanyContactDto = this.companyContactForm.value;
    request.id = this.companyId;
    this.companyService.saveCompanyContact(request);
  }
  initializeForm() {
    this.companyContactForm = this.fb.group({
      mobileNumberCode: new FormControl('', [customValidators.required]),
      mobileNumber: new FormControl('', [customValidators.required]),
      companyEmail: new FormControl('', [customValidators.required]),
      companyAddress: new FormControl(),
      contactPersonal: new FormControl('', [customValidators.required]),
      contactPersonalPosition: new FormControl(),
      contactPersonalEmail: new FormControl('', [customValidators.required]),
    });
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Country,
      LookupEnum.MobileCode,
    ]);
  }

  initializeFormData() {
    this.companyService
      .getCompanyContactById(this.companyId)
      .subscribe((res) => {
        //this.branchCode=res.code
        console.log('Calling get by Id', res);

        this.companyContactForm.patchValue({
          ...res,
        });

        this.selectedMobileCode = res.mobileNumberCode!;
      });
  }
  get companyId(): string {
    return this.routerService.currentId;
    //return '1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3';
  }
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private companyService: CompanyService,
    private formsService: FormsService,
    private routerService: RouterService,
    public sharedLibEnums: SharedLibraryEnums
  ) {}
}

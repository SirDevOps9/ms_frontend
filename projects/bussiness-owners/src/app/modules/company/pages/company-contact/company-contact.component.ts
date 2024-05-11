import { Component, OnInit } from '@angular/core';
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
import { CompanyContactDto } from '../../models';

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
    console.log(this.editMode);
    
    if (this.editMode) {
      if (!this.formsService.validForm(this.companyContactForm, true)) return;
      const request: CompanyContactDto = this.companyContactForm.value;
      request.id = this.companyId;
      this.companyService.saveCompanyContact(request);
      console.log('request', request);
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }


  initializeForm() {
    this.companyContactForm = this.fb.group({
      mobileNumberCode: new FormControl('', [customValidators.required]),
      mobileNumber: new FormControl('', [customValidators.required,customValidators.hasSpaces]),
      companyEmail: new FormControl('', [customValidators.required,customValidators.email]),
      companyAddress: new FormControl(),
      contactPersonal: new FormControl('', [customValidators.required]),
      contactPersonalPosition: new FormControl(),
      contactPersonalEmail: new FormControl('', [customValidators.required,customValidators.email]),
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
    console.log('Cadgadgdg', this.companyId);

    this.companyService
      .getCompanyContactById(this.companyId)
      .subscribe((res) => {
        console.log('Calling get by Id', res);

        this.companyContactForm.patchValue({
          ...res,
        });
        if(res)
        this.selectedMobileCode = res.mobileNumberCode!;
      });
  }
  get companyId(): string {
    return this.routerService.currentParetId;
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

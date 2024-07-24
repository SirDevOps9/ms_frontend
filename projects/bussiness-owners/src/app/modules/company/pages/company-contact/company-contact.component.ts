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
  selectedPersonalMobileCode: string;

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
    this.loadLookups();
    this.Subscribe();
  }

  onSubmit() {
    if (this.editMode) {
      if (!this.formsService.validForm(this.companyContactForm, false)) return;
      const request: CompanyContactDto = this.companyContactForm.value;
      this.companyService.companyName.next(this.companyContactForm.value.companyName);
      request.id = this.companyId;
      this.companyService.saveCompanyContact(request);
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  initializeForm() {
    this.companyContactForm = this.fb.group({
      companyName: new FormControl(null),
      companyLogo: new FormControl(null),
      mobileNumberCode: new FormControl(null),
      mobileNumber: new FormControl(null, [
        customValidators.hasSpaces,
        customValidators.noSpecialChars,
        customValidators.noAlphabeticCharacter,
      ]),
      companyEmail: new FormControl(null, [customValidators.email]),
      companyAddress: new FormControl(),
      contactPersonal: new FormControl(null, [
        customValidators.hasSpaces,
        customValidators.noSpecialChars,
        customValidators.noAlphabeticCharacter,

      ]),
      contactPersonalPosition: new FormControl(),
      contactPersonalEmail: new FormControl(null, [customValidators.email]),
      contactPersonalMobileNumberCode: new FormControl(null),
      contactPersonalMobileNumber: new FormControl(null, [
        customValidators.hasSpaces,
        customValidators.noSpecialChars,
        customValidators.noAlphabeticCharacter,

      ]),
    });
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.Country, LookupEnum.MobileCode]);
  }

  initializeFormData() {
    this.companyService.getCompanyContactById(this.companyId).subscribe((res) => {
      this.companyContactForm.patchValue({
        ...res,
      });
      if (res) {
        this.selectedMobileCode = res.mobileNumberCode!;
        this.selectedPersonalMobileCode = res.contactPersonalMobileNumberCode!;
      }
    });
  }
  get companyId(): string {
    return this.routerService.currentParetId;
  }

  onDiscard(editMode: boolean) {
    if (editMode) this.initializeFormData();
    this.editMode = false;
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

import { Component, OnInit } from '@angular/core';
import {
  FormsService,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  customValidators,
} from 'shared-lib';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CompanyService } from '../../company.service';
import { CompanyLegalDto } from '../../models';

@Component({
  selector: 'app-company-legal',
  templateUrl: './company-legal.component.html',
  providers: [RouterService],
  styleUrl: './company-legal.component.scss',
})
export class CompanyLegalComponent implements OnInit {
  companyLegalForm: FormGroup;
  editMode: boolean = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
  }

  onSubmit() {
    if (this.editMode) {
      if (!this.formsService.validForm(this.companyLegalForm, false)) return;
      const request: CompanyLegalDto = this.companyLegalForm.value;
      request.id = this.companyId;
      this.companyService.saveCompanyLegal(request);
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  initializeForm() {
    this.companyLegalForm = this.fb.group({
      companyName: new FormControl('', [customValidators.required]),
      companyEmail: new FormControl(null, [customValidators.required, customValidators.email]),
      organizationUnit: new FormControl('', [customValidators.required]),
      organization: new FormControl('', [customValidators.required]),
      taxId: new FormControl('', [customValidators.required]),
      commercialId: new FormControl('', [customValidators.required]),
      registeredAddress: new FormControl('', [customValidators.required]),
      businessCategory: new FormControl('', [customValidators.required]),
      streetName: new FormControl('', [customValidators.required]),
      citySubDivisionName: new FormControl('', [customValidators.required]),
      cityName: new FormControl('', [customValidators.required]),
      postalZone: new FormControl('', [customValidators.required]),
      countrySubEntity: new FormControl('', [customValidators.required]),
      buildingNumber: new FormControl('', [customValidators.required]),
      additionalStreetName: new FormControl('', [customValidators.required]),
      registrationName: new FormControl('', [customValidators.required]),
    });
  }

  initializeFormData() {
    this.companyService.getCompanyLegalById(this.companyId).subscribe((res) => {
      this.companyLegalForm.patchValue({
        ...res,
      });
    });
  }

  onDiscard(editMode: boolean) {
    if (editMode) this.initializeFormData();
    this.editMode = false;
  }
  get companyId(): string {
    return this.routerService.currentParetId;
  }
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private formsService: FormsService,
    private companyService: CompanyService,
    private routerService: RouterService,
    public sharedLibEnums: SharedLibraryEnums
  ) {}
}

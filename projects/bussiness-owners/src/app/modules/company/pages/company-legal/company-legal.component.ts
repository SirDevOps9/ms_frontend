import { Component, OnInit } from '@angular/core';
import {
  FormsService,
  LookupsService,
  RouterService,
  SharedLibraryEnums,

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
    console.log(this.editMode);

    if (this.editMode) {
      if (!this.formsService.validForm(this.companyLegalForm, true)) return;
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
      companyName: new FormControl(),
      companyEmail: new FormControl(),
      organizationUnit: new FormControl(),
      organization: new FormControl(),
      taxId: new FormControl(),
      commercialId: new FormControl(),
      registeredAddress: new FormControl(),
      businessCategory: new FormControl(),
      streetName: new FormControl(),
      citySubDivisionName: new FormControl(),
      cityName: new FormControl(),
      postalZone: new FormControl(),
      countrySubEntity: new FormControl(),
      buildingNumber: new FormControl(),
      additionalStreetName: new FormControl(),
      registrationName: new FormControl(),
    });
  }

  initializeFormData() {
    this.companyService.getCompanyLegalById(this.companyId).subscribe((res) => {
      console.log('Calling get by Id', res);
      this.companyLegalForm.patchValue({
        ...res,
      });
    });
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

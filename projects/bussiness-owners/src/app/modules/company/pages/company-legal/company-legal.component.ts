import { Component, Input, OnInit } from '@angular/core';
import {
  FormsService,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CompanyService } from '../../company.service';
import { CompanyLegalDto } from '../../models/companylegaldto';

@Component({
  selector: 'app-company-legal',
  templateUrl: './company-legal.component.html',
  providers: [RouterService],
  styleUrl: './company-legal.component.scss',
})
export class CompanyLegalComponent implements OnInit {
  companyLegalForm: FormGroup;
  @Input() editMode: boolean = false;
  @Input() companyId: string;


  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.companyLegalForm, true)) return;
    const request: CompanyLegalDto = this.companyLegalForm.value;
    request.id = '1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3';
    this.companyService.saveCompanyLegal(request);
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
      //this.branchCode=res.code
      console.log('Calling get by Id', res);

      this.companyLegalForm.patchValue({
        ...res,
      });
    });
  }
  // get companyId(): string {
  //   //return this.routerService.currentId;
  //   return '1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3';
  // }
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private formsService: FormsService,
    private companyService: CompanyService,
    public sharedLibEnums: SharedLibraryEnums
  ) {}
}

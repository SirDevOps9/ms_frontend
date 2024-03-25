import { Component, Input, OnInit } from '@angular/core';
import { FormsService, LookupEnum, LookupsService, RouterService, SharedLibraryEnums, customValidators, lookupDto } from 'shared-lib';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CompanyService } from '../../company.service';
import { CompanyProxy } from '../../company.proxy';
import { CompanyLegalDto } from '../../models/companylegaldto';

@Component({
  selector: 'app-company-legal',
  templateUrl: './company-legal.component.html',
  providers: [RouterService],
  styleUrl: './company-legal.component.scss'
})
export class CompanyLegalComponent implements OnInit {
  companyLegalForm: FormGroup;
  @Input() editMode: boolean = false;

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
  }

  onSubmit() {
    //if (this.formsService.validForm(this.companyLegalForm, true)) return;
    const request: CompanyLegalDto = this.companyLegalForm.value;
    request.id= "1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3";
    this.companyService.saveCompanyLegal(request);
  }  
  initializeForm(){
    this.companyLegalForm= this.fb.group({
      companyName:[],
      companyEmail:[],
      organizationUnit:[],
      organization:[],
      taxId:[],
      commercialId:[],
      registeredAddress:[],
      businessCategory:[],
      streetName:[],
      citySubDivisionName:[],
      cityName:[],
      postalZone:[],
      countrySubEntity:[],
      buildingNumber:[],
      additionalStreetName:[],
      registrationName:[],
    })
  }

  initializeFormData() {
    this.companyService
      .getCompanyLegalById(this.companyId)
      .subscribe((res) => {
        //this.branchCode=res.code
        console.log("Calling get by Id", res)

        this.companyLegalForm.patchValue({
          ...res,
        });
      });
  }
  get companyId(): string {
    //return this.routerService.currentId;
    return '1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3';
  }
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private routerService: RouterService,
    private companyService: CompanyService,
    private companyProxy: CompanyProxy,
    public sharedLibEnums: SharedLibraryEnums,
  ){}
}

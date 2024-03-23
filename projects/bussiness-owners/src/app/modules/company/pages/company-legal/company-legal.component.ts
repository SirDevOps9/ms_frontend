import { Component, OnInit } from '@angular/core';
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
  ngOnInit() {
    this.initializeForm();
  }
  submitForm(){
    console.log(this.companyLegalForm);
    
  }

  onSubmit() {
    //if (this.formsService.validForm(this.companyLegalForm, true)) return;
    const request: CompanyLegalDto = this.companyLegalForm.value;
    request.companyId= "17c13914-04a6-44a3-e20b-08dc4a688464";
    this.companyService.saveCompanyLegal(request);
  }  
  initializeForm(){
    this.companyLegalForm= this.fb.group({
      companyName:["",],
      companyEmail:["",],
      organizationUnit:["",],
      organization:["",],
      taxId:["",],
      commercialId:["",],
      registeredAddress:["",],
      businessCategory:["",],
      streetName:["",],
      CountrcitySubDivisionNamey:["",],
      cityName:["",],
      postalZone:["",],
      countrySubEntity:["",],
      buildingNumber:["",],
      additionalStreetName:["",],
      registrationName:["",],
    })
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

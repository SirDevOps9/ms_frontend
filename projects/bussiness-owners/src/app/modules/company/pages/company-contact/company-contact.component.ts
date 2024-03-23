import { Component, OnInit } from '@angular/core';
import { FormsService, LookupEnum, LookupsService, RouterService, SharedLibraryEnums, customValidators, lookupDto } from 'shared-lib';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { CompanyService } from '../../company.service';
import { CompanyProxy } from '../../company.proxy';
import { CompanyContactDto } from '../../models/companycontactdto';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  providers: [RouterService],
  styleUrl: './company-contact.component.scss'
})
export class CompanyContactComponent implements OnInit {
  companyContactForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  ngOnInit() {
    this.initializeForm();
    this.loadLookups();
    this.Subscribe();
  }
  submitForm(){
    console.log(this.companyContactForm);
    
  }
  onSubmit() {
    //if (this.formsService.validForm(this.companyContactForm, true)) return;
    const request: CompanyContactDto = this.companyContactForm.value;
    request.companyId= "17c13914-04a6-44a3-e20b-08dc4a688464";
    this.companyService.saveCompanyContact(request);
  }
  initializeForm(){
    this.companyContactForm= this.fb.group({
      mobileNumberCode:["",],
      mobileNumber:["",],
      companyEmail:["",],
      companyAddress:["",],
      contactPersonal:["",],
      contactPersonalPosition:["",],
      contactPersonalEmail:["",],
    })
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Currency,
      LookupEnum.Industry,
      LookupEnum.Country,
      LookupEnum.MobileCode,
    ]);
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

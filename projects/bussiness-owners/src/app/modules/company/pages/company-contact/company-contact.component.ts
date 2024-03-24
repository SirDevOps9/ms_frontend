import { Component, OnInit } from '@angular/core';
import { LookupEnum, LookupsService, RouterService, customValidators, lookupDto } from 'shared-lib';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

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
  initializeForm(){
    this.companyContactForm= this.fb.group({
      Country:["",customValidators.required],
      mobileNumberCode:["",customValidators.required],
      mobileNumber:["",customValidators.required],
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

  ){}
}

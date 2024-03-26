import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { LookupEnum, LookupsService, RouterService, customValidators, lookupDto } from 'shared-lib';

@Component({
  selector: 'app-company-addres',
  templateUrl: './company-addres.component.html',
  providers: [RouterService],

  styleUrl: './company-addres.component.scss'
})
export class CompanyAddresComponent implements OnInit {
  companyAddresForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };

  ngOnInit() {
    this.loadLookups();
    this.initializeForm();
    this.Subscribe();
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  initializeForm(){
    this.companyAddresForm= this.fb.group({
      Country:["",customValidators.required],
      City:["",customValidators.required ],
      Region:["", customValidators.required],
      Address:["", customValidators.required],
      longitude:["",customValidators.required],
      latitude:["",customValidators.required],
    })
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Currency,
      LookupEnum.Industry,
      LookupEnum.Country,
      LookupEnum.MobileCode,
    ]);
  }
  submitForm(){
    console.log(this.companyAddresForm);
    
  }
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,

  ){}
}

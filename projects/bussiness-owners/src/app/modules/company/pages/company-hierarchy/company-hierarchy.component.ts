import { Component, OnInit } from '@angular/core';
import { LookupEnum, LookupsService, RouterService, customValidators, lookupDto } from 'shared-lib';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-company-hierarchy',
  templateUrl: './company-hierarchy.component.html',
  styleUrl: './company-hierarchy.component.scss'
})
export class CompanyHierarchyComponent {
  companyHierarchyForm: FormGroup;
  ngOnInit() {
    this.initializeForm();
  }
  submitForm(){
    console.log(this.companyHierarchyForm);
    
  }
  initializeForm(){
    this.companyHierarchyForm= this.fb.group({
      Country:["",customValidators.required],
    })
  }
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,

  ){}
}

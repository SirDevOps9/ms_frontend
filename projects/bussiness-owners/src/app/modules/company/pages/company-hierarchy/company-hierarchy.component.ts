import { Component, OnInit } from '@angular/core';
import { FormsService, LookupEnum, LookupsService, RouterService, SharedLibraryEnums, customValidators, lookupDto } from 'shared-lib';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CompanyService } from '../../company.service';
import { CompanyProxy } from '../../company.proxy';

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
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private routerService: RouterService,
    private companyService: CompanyService,
    private companyProxy: CompanyProxy,
    public sharedLibEnums: SharedLibraryEnums,
  ){}
}

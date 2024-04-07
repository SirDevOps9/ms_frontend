import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { LookupEnum, LookupsService, RouterService, customValidators, lookupDto } from 'shared-lib';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.scss'
})
export class NewCompanyComponent {
  addCompanyForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  ngOnInit() {
    this.initializeForm();
    this.loadLookups();
    this.Subscribe();
  }
  initializeForm(){
    this.addCompanyForm = this.fb.group({
      Country:["",customValidators.required],
      mobileNumberCode:["",customValidators.required],
      mobileNumber:["",customValidators.required],
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
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  submitForm(){
    console.log(this.addCompanyForm);
    
  }
  onCancel() {
    this.ref.close();
  }
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private ref: DynamicDialogRef,
  ){}
}

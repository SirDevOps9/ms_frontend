import { Component, OnInit } from '@angular/core';
import { LookupEnum, LookupsService, RouterService, customValidators, lookupDto } from 'shared-lib';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

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
  initializeForm(){
    this.companyLegalForm= this.fb.group({
      Country:["",customValidators.required],
    })
  }
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,

  ){}
}

import { Component, OnInit } from '@angular/core';
import { LogService, RouterService ,  LookupsService,
  LookupEnum,
  lookupDto } from 'shared-lib';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { CompanyProxy } from '../../company.proxy';
import {  ResponseCompanyDto } from '../../models';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
  providers: [RouterService],
})
export class EditCompanyComponent implements OnInit {
  companyForm: FormGroup;

  planId: number;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  constructor(
    private formBuilder: FormBuilder,
    private routerSerivce: RouterService,
    private companyProxy: CompanyProxy,
    private logService: LogService,
    public lookupsService: LookupsService
  ) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      countryCode: ['', Validators.required],
      industryId: ['', Validators.required],
      currencyId: ['', Validators.required],
      website: [
        '',
        Validators.required,
        // Validators.pattern("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$"),
      ],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      mobileNumber: ['', Validators.required],
      mobileNumberCode: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
    });
  }

  id: number;
  company: ResponseCompanyDto | null = null;
  ngOnInit() {
    this.id = this.routerSerivce.currentId;
    this.logService.log(this.id, 'get by id response');
    this.loadLookups()
    this.Subscribe()
    this.companyProxy.getById(this.id).subscribe((res) => {
      this.company = res.response;
      this.companyForm.setValue({
        name: this.company.name,
        countryCode: this.company.countryCode,
        industryId: this.company.industryId,
        currencyId: this.company.currencyId,
        website: this.company.website,
        address: this.company.address,
        mobileNumberCode: this.company.mobileNumberCode,
        mobileNumber: this.company.mobileNumber,
        companyEmail: this.company.companyEmail,
      });

      this.logService.log(this.company, 'get by id response');
    });
  }
  hasError(field: string, errorType: string): boolean {
    const control = this.companyForm.get(field);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }
  onSubmit() {
    console.log(this.companyForm);
  }
 
  
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Country,
      LookupEnum.Currency,
      LookupEnum.Industry,
      LookupEnum.MobileCode,
      
    ]);
    
  }
}

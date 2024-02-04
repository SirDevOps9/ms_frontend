import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.httpservice';
import { CompanyListResponse } from '../../models/company/companylist.response';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
  companyForm: FormGroup;
  companies: CompanyListResponse[];

  constructor(private formBuilder: FormBuilder ,
     private companyService : CompanyService
     ) {
      this.companyForm = this.formBuilder.group({
        subdomain: ['', Validators.required],
        companyName: ['', Validators.required],
        industry: ['', Validators.required],
        currency: ['', Validators.required],
        website: ['', Validators.required],
        address: ['', [Validators.required, Validators.maxLength(100)]], 
        mobile: ['', Validators.required],
        companyEmail: ['', [Validators.required, Validators.email]]
      });
      
  }

  ngOnInit() {
    this.companyService.getAll().subscribe({
      next: (res) => {
        this.companies = res;
        console.log( this.companies)
      },
    });
  }
  onSubmit() {
    if (this.companyForm.valid) {
      this.addCompanyInfo();
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  addCompanyInfo() {
    if (this.companyForm.valid) {
      const companyInfo = this.companyForm.value;   
      console.log('Company Information:', companyInfo);
    }
  }
  hasError(field: string, errorType: string): boolean {
    const control = this.companyForm.get(field);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }  
}



  // ,
  // "Company":{
  //   "accountInformation": {
  //     "step": "Step 01 - Company Main Info",
  //     "companyMainInfo": {
  //       "domain": "domain",
  //       "companyName": "companyName",
  //       "industry": "industry",
  //       "currency": "currency",
  //       "website": "website",
  //       "address": "address",
  //       "mobileNumber": "mobileNumber",
  //       "companyEmail": "mobileNumber"
  //     },
  //     "companyList": [
  //       {
  //         "companyName": "companyName",
  //         "industry": "industry",
  //         "website": "website",
  //         "address": "address"
  //       }
  //     ]
  //   }
  // }
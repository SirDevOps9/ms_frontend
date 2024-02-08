import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../../../../../../shared-lib/src/lib/services/language.service';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder ,
     public languageService: LanguageService
  ) {
    this.languageService.setLang();
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

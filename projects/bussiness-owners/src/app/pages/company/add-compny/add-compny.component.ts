import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService, LoaderService, LogService, ToasterService } from 'shared-lib';
import { CompanyService } from '../../../services/company.httpservice';
import { DropdownItemDto } from '../../../models/company/dropdown';
import { AddCompanyDto } from '../../../models/company/addcompany';
import { MobileCodeDropdownDto } from '../../../models/company/mobilecodedropdown';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-add-compny',
  templateUrl: './add-compny.component.html',
  styleUrls: ['./add-compny.component.css'],
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  currencyDropDown: DropdownItemDto[];
  industryDropDown: DropdownItemDto[];
  mobileCodeDropDown: MobileCodeDropdownDto[];
  subdoaminDropDown: DropdownItemDto[];


  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private logService: LogService,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    private languageService: LanguageService
  ) {
    this.companyForm = this.formBuilder.group({
      subdomain: ['', Validators.required],
      companyName: ['', Validators.required],
      industry: ['', Validators.required],
      currency: ['', Validators.required],
      website: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      mobile: ['', Validators.required],
      MobileNumberCode: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.getDropDowns();
  }
  

  onSubmit() {
    if (this.companyForm.valid) 
   {
    this.addCompany();
   }

  }

  addCompanyInfo() {
    const companyInfo = this.companyForm.value;
    this.logService.log('Company Information:', companyInfo);
  }

  getDropDowns(){

  combineLatest([
    this.companyService.getDropDown(),
    this.companyService.getMobileCodeDropDown(),
    this.companyService.getSubdomainDropDown()
  ]).subscribe({
    next: ([resDropdown, resMobileCode, resSubdomain]) => {
      this.currencyDropDown = resDropdown.response.currencyDropdown;
      this.logService.log(this.currencyDropDown, 'currency Information:');

      this.industryDropDown = resDropdown.response.industryDropdown;
      this.logService.log(this.industryDropDown, 'industry Information:');

      this.mobileCodeDropDown = resMobileCode.response;
      this.logService.log(this.mobileCodeDropDown, 'mobileCodeDropdownDto Information:');

      this.subdoaminDropDown = resSubdomain.response;
      this.logService.log(this.subdoaminDropDown, 'SubDomainDropdownDto Information:');
    },
  });
  }




  addCompany() {
    this.loaderService.show();
    const controls = this.companyForm.controls;
    const request: AddCompanyDto = {
      name: controls['companyName']?.value,
      subdomainId: controls['subdomain']?.value ,
      website: controls['website']?.value ,
      address: controls['address']?.value ,
      mobileNumberCode: controls['MobileNumberCode']?.value ,
      mobileNumber: controls['mobile']?.value ,
      companyEmail: controls['companyEmail']?.value ,
      industryId: controls['industry']?.value ,
      currencyId: controls['currency']?.value ,
    };

    this.logService.log(request, 'Checking the sending request:');

  
    this.companyService.addCompany(request).subscribe({
      next: (response) => {

        this.logService.log(response, 'Company added successfully:');
        this.toasterService.showSuccess(
          'Success',
          this.languageService.transalte('Company.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();

      },
      error: () =>{
        this.loaderService.hide();

      }
    });
  }


  hasError(field: string, errorType: string): boolean {
    const control = this.companyForm.get(field);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }
}

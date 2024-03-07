import { Component, OnInit } from '@angular/core';
import { LogService, RouterService } from 'shared-lib';
import { CompanyService } from '../../../../services/company.httpservice';
import { ResponseCompanyDto } from '../../../../models/company/responsecompanydto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownItemDto } from '../../../../models/company/dropdown';
import { MobileCodeDropdownDto } from '../../../../models/company/mobilecodedropdown';
import { CountryDropDown } from '../../../../models/company/countrydropdown';
import { combineLatest } from 'rxjs';
import { CompanyProxy } from '../../company.proxy';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss'],
  providers: [RouterService],
})
export class EditCompanyComponent implements OnInit {
  companyForm: FormGroup;
  currencyDropDown: DropdownItemDto[];
  industryDropDown: DropdownItemDto[];
  subdoaminDropDown: DropdownItemDto[];
  CountryDropDown: CountryDropDown[];
  mobileCodeDropDown: MobileCodeDropdownDto[];
  planId: number;
  constructor(
    private formBuilder: FormBuilder,
    private routerSerivce: RouterService,
    private companyProxy: CompanyProxy,
    private companyService: CompanyService,
    private logService: LogService
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
    this.getDropDowns();
    this.id = this.routerSerivce.currentId;
    this.logService.log(this.id, 'get by id response');

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
  getDropDowns() {
    combineLatest([
      this.companyService.getDropDown(),
      this.companyService.getMobileCodeDropDown(),
      this.companyService.getCountryDropDown(),
    ]).subscribe({
      next: ([resDropdown, resMobileCode, resCountry]) => {
        this.currencyDropDown = resDropdown.response.currencyDropdown;
        this.industryDropDown = resDropdown.response.industryDropdown;
        this.mobileCodeDropDown = resMobileCode.response;
        this.CountryDropDown = resCountry.response;
      },
    });
  }
}

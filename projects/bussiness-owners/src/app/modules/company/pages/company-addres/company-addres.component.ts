import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  LookupEnum,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  lookupDto,
} from 'shared-lib';
import { CompanyService } from '../../company.service';
import { CompanyAddressDto } from '../../models/companyaddressdto';
@Component({
  selector: 'app-company-addres',
  templateUrl: './company-addres.component.html',
  providers: [RouterService],
  styleUrl: './company-addres.component.scss',
})
export class CompanyAddresComponent implements OnInit {
  companyAddresForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  selectedCountryCode: string;
  @Input() editMode: boolean = false;
  @Input() companyId: string;


  ngOnInit() {
    this.loadLookups();
    this.initializeForm();
    this.initializeFormData();
    this.Subscribe();
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  initializeForm() {
    this.companyAddresForm = this.fb.group({
      countryCode: new FormControl(),
      city: new FormControl(),
      region: new FormControl(),
      address: new FormControl(),
      radius: new FormControl(),
      longitude: new FormControl(),
      latitude: new FormControl(),
    });
  }
  initializeFormData() {
    this.companyService.getCompanyAddressId(this.companyId).subscribe((res) => {
      //this.branchCode=res.code
      console.log('Calling Get Company AddressId', res);
      this.companyAddresForm.patchValue({
        ...res,
      });
      this.selectedCountryCode = res.countryCode!;
    });
  }
  onSubmit() {
    //if (this.formsService.validForm(this.companyAddresForm, true)) return;
    const request: CompanyAddressDto = this.companyAddresForm.value;
    request.id = '17c13914-04a6-44a3-e20b-08dc4a688464';
    this.companyService.saveCompanyAddress(request);
    console.log('request', request);
  }

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.Country]);
  }
  // get companyId(): string {
  //   //return this.routerService.currentId;
  //   return '1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3';
  // }

  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private companyService: CompanyService,
    public sharedLibEnums: SharedLibraryEnums
  ) {}
}

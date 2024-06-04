import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  lookupDto,
} from 'shared-lib';
import { CompanyService } from '../../company.service';
import { CompanyAddressDto } from '../../models';
import { SelectIconDto } from 'libs/shared-lib/src/lib/models/selectIcon';
@Component({
  selector: 'app-company-addres',
  templateUrl: './company-addres.component.html',
  styleUrl: './company-addres.component.scss',
  providers: [RouterService],
})
export class CompanyAddresComponent implements OnInit {
  companyAddresForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
 // CountryList: { [key: string]: SelectIconDto[] };
  selectedCountryCode: string | null;
  editMode: boolean = false;

  ngOnInit() {
    this.loadLookups();
    this.initializeForm();
    this.initializeFormData();
    this.Subscribe();
  }
  // private mapLookupsToCountryList(lookups: { [key: string]: lookupDto[] }): { [key: string]: SelectIconDto[] } {
  //   const countryList: { [key: string]: SelectIconDto[] } = {};

  //   // Iterate over each key-value pair in the lookups object
  //   for (const key in lookups) {
  //     if (lookups.hasOwnProperty(key)) {
  //       // Map the array of lookupDto to an array of SelectIconDto
  //       countryList[key] = lookups[key].map((lookup) => ({
  //         id: lookup.id,
  //         name: lookup.name,
  //         icon: "assets/images/flags/" +lookup.id.toString().toLowerCase()+".png", // Ensure icon is a string
  //         // Map other properties if necessary
  //       }));
  //     }
  //   }

  //   return countryList;
  // }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => this.lookups = l);
  }
  initializeForm() {
    this.companyAddresForm = this.fb.group({
      countryCode: new FormControl(),
      city: new FormControl(),
      region: new FormControl(),
      address: new FormControl(),
      longitude: new FormControl(),
      latitude: new FormControl(),
    });
  }
  initializeFormData() {
    this.companyService.getCompanyAddressId(this.companyId).subscribe((res) => {
      console.log('Calling Get Company AddressId', res);
      this.companyAddresForm.patchValue({
        ...res,
      });
      if (res) this.selectedCountryCode = res.countryCode;
    });
  }

  onSubmit() {
    console.log(this.editMode);

    if (this.editMode) {
      if (!this.formsService.validForm(this.companyAddresForm, true)) return;
      const request: CompanyAddressDto = this.companyAddresForm.value;
      request.id = this.companyId;
      this.companyService.saveCompanyAddress(request);
      console.log('request', request);
      this.editMode = false;
    } else {
      // Enable edit mode
      this.editMode = true;
    }
  }

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.Country]);
  }
  get companyId(): string {
    return this.routerService.currentParetId;
  }

  onDiscard(editMode: boolean) {
    if (editMode)
      this.initializeFormData();
    this.editMode = false;
  }

  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private companyService: CompanyService,
    private routerService: RouterService,
    private formsService: FormsService,
    public sharedLibEnums: SharedLibraryEnums,
  ) { }
}

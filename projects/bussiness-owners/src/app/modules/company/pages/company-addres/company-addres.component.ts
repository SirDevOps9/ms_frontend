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
  selectedCountryCode: string | null;
  selectedCurrency?: string ;
  editMode: boolean = false;

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
      currencyId: new FormControl(),
      region: new FormControl(),
      address: new FormControl(),
      longitude: new FormControl(),
      latitude: new FormControl(),
    });
  }
  initializeFormData() {
    this.companyService.getCompanyAddressId(this.companyId).subscribe((res) => {
      this.companyAddresForm.patchValue({
        ...res,
      });
      if (res) {
        this.selectedCountryCode = res.countryCode;
        this.selectedCurrency = res.currencyId?.toString();
      }
    });
  }

  onSubmit() {
    if (this.editMode) {
      if (!this.formsService.validForm(this.companyAddresForm, true)) return;
      const request: CompanyAddressDto = this.companyAddresForm.value;
      request.id = this.companyId;
      this.companyService.saveCompanyAddress(request);
      this.editMode = false;
    } else {
      // Enable edit mode
      this.editMode = true;
    }
  }

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.Country, LookupEnum.Currency]);
  }
  get companyId(): string {
    return this.routerService.currentParetId;
  }

  onDiscard(editMode: boolean) {
    if (editMode) this.initializeFormData();
    this.editMode = false;
  }

  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private companyService: CompanyService,
    private routerService: RouterService,
    private formsService: FormsService,
    public sharedLibEnums: SharedLibraryEnums
  ) {}
}

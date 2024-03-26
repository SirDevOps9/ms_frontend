import { Component, Input, OnInit } from '@angular/core';
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
import { CompanyAddressDto } from '../../models/companyaddressdto';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs';
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
  selectedCountryCode: string;
  editMode: boolean = false;
  //@Input() companyId: string;
  // toggleEditMode() {
  //   this.editMode = !this.editMode;
  // }


  ngOnInit() {
    this.loadLookups();
    this.initializeForm();
    this.initializeFormData();
    this.Subscribe();
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    //   map(() => this.activatedRoute),
    //   map(route => {
    //     while (route.firstChild) {
    //      route = route.firstChild;
    //     }
    //     return route;
    //    }),
    //    map(route => route.url)
    //   )
    //  .subscribe(res=>)
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
  // onSubmit() {
  //   if (!this.formsService.validForm(this.companyAddresForm, true)) return;
  //   const request: CompanyAddressDto = this.companyAddresForm.value;
  //   request.id = this.companyId;
  //   this.companyService.saveCompanyAddress(request);
  //   console.log('request', request);
  // }

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
    console.log("from Address",
    this.routerService.getCurrentUrl());
    return this.routerService.currentId;
    //return '1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3';
  }

  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private companyService: CompanyService,
    private routerService: RouterService,
    private formsService: FormsService,
    public sharedLibEnums: SharedLibraryEnums,
    private router: Router
  ) {}
}

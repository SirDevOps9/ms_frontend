import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  lookupDto,
} from 'shared-lib';
import { CompanyService } from '../../company.service';
import { CompanyProxy } from '../../company.proxy';
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

  @Input() editMode: boolean = false;


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
      countryCode: [],
      city: [],
      region: [],
      address: [],
      radius:[],
      longitude: [],
      latitude: []
    });
  }
  initializeFormData() {
    this.companyService.getCompanyAddressId(this.companyId).subscribe(
      (res) => {
        //this.branchCode=res.code
        console.log("Calling get by Id", res)
        this.companyAddresForm.patchValue({
          ...res,
        });
      }
    );
  }
  onSubmit() {
    //if (this.formsService.validForm(this.companyAddresForm, true)) return;
    const request: CompanyAddressDto = this.companyAddresForm.value;
    request.id= "17c13914-04a6-44a3-e20b-08dc4a688464";
    this.companyService.saveCompanyAddress(request);
    console.log("request",request);
    
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Country,
    ]);
  }
  get companyId(): string {
    //return this.routerService.currentId;
    return '1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3';
  }

  
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private routerService: RouterService,
    private companyService: CompanyService,
    private companyProxy: CompanyProxy,
    public sharedLibEnums: SharedLibraryEnums
  ) {}
}

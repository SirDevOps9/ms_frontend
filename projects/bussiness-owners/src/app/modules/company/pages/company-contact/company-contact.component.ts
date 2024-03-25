import { Component, Input, OnInit } from '@angular/core';
import { FormsService, LookupEnum, LookupsService, RouterService, SharedLibraryEnums, customValidators, lookupDto } from 'shared-lib';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { CompanyService } from '../../company.service';
import { CompanyProxy } from '../../company.proxy';
import { CompanyContactDto } from '../../models/companycontactdto';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  providers: [RouterService],
  styleUrl: './company-contact.component.scss'
})
export class CompanyContactComponent implements OnInit {
  companyContactForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  @Input() editMode: boolean = false;

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
    this.loadLookups();
    this.Subscribe();
  }
  submitForm(){
    console.log(this.companyContactForm);
    
  }
  onSubmit() {
    //if (this.formsService.validForm(this.companyContactForm, true)) return;
    const request: CompanyContactDto = this.companyContactForm.value;
    request.id= "1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3";
    this.companyService.saveCompanyContact(request);
  }
  initializeForm(){
    this.companyContactForm= this.fb.group({
      mobileNumberCode:[],
      mobileNumber:[],
      companyEmail:[],
      companyAddress:[],
      contactPersonal:[],
      contactPersonalPosition:[],
      contactPersonalEmail:[],
    })
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Country,
      LookupEnum.MobileCode,
    ]);
  }

  initializeFormData() {
    this.companyService.getCompanyContactById('1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3').subscribe(
      (res) => {
        //this.branchCode=res.code
        console.log("Calling get by Id", res)

        this.companyContactForm.patchValue({
          ...res,
        });
      }
    );
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
    public sharedLibEnums: SharedLibraryEnums,
  ){}
}

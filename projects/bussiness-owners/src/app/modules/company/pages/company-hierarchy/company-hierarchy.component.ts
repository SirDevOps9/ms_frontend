import { Component, Input, OnInit } from '@angular/core';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyService } from '../../company.service';
import { CompanyProxy } from '../../company.proxy';
import { CompanyHierarchyDto } from '../../models/companyhierarchydto';

@Component({
  selector: 'app-company-hierarchy',
  templateUrl: './company-hierarchy.component.html',
  styleUrl: './company-hierarchy.component.scss',
})
export class CompanyHierarchyComponent {
  companyHierarchyForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  companyHierarchy: CompanyHierarchyDto;
  subsidiaryList:any[];
  @Input() editMode: boolean = false;


  companyTypes = [
    { id: 1, name: 'Holding' },
    { id: 2, name: 'Subsidiary' },
  ];
  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
    this.loadLookups();
    this.Subscribe();
  }
  onSubmit() {
    //if (this.formsService.validForm(this.companyContactForm, true)) return;
    const request: CompanyHierarchyDto = this.companyHierarchyForm.value;
    request.id= "1de5b3ba-e028-44ed-a7f7-08dc4cf0a9d3";
    this.companyService.saveCompanyHierarchy(request);

    this.companyService
    .saveCompanyHierarchy(request)
    .subscribe((res) => {
      this.companyHierarchy = res.response;
      this.subsidiaryList = res.response.subsidiary;
    });
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.Company]);
  }
  initializeForm() {
    this.companyHierarchyForm = this.fb.group({
      companyType: ['', customValidators.required],
      subsidiary: ['', customValidators.required],
    });
  }

  initializeFormData() {
    this.companyService
      .getCompanyHierarchyById(this.companyId)
      .subscribe((res) => {
        //this.branchCode=res.code
        console.log("Calling get by Id", res)

        this.companyHierarchyForm.patchValue({
          ...res,
        });
      });
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

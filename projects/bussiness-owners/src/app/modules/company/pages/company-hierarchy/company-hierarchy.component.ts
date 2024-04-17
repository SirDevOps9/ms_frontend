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
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CompanyService } from '../../company.service';
import { CompanyHierarchyDto } from '../../models/companyhierarchydto';
import { SubsidiaryDto } from '../../models/subsidiarydto';
import { UpdateCompanyHierarchyDto } from '../../models';

@Component({
  selector: 'app-company-hierarchy',
  templateUrl: './company-hierarchy.component.html',
  styleUrl: './company-hierarchy.component.scss',
  providers:[RouterService]
})
export class CompanyHierarchyComponent {
  companyHierarchyForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  companyHierarchy: CompanyHierarchyDto;
  subsidiaryList: SubsidiaryDto[];
  companyType: number;
  editMode: boolean = false;
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
    this.loadLookups();
    this.Subscribe();
  }

  onSubmit() {
    console.log(this.editMode);
    
    if (this.editMode) {
      if (!this.formsService.validForm(this.companyHierarchyForm, true)) return;
      const request: UpdateCompanyHierarchyDto = this.companyHierarchyForm.value;
      request.id = this.companyId;
      this.companyService.saveCompanyHierarchy(request);
  
      console.log('request', request);
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.CompanyType,LookupEnum.CompanySubsidiary]);
  }
  initializeForm() {
    this.companyHierarchyForm = this.fb.group({
      companyType: new FormControl('', [customValidators.required]),
      subsidiary: new FormControl('', [customValidators.required]),
    });
  }

  initializeFormData() {
    console.log('Cadgadgdg', this.companyId);

    this.companyService
      .getCompanyHierarchyById(this.companyId)
      .subscribe((res) => {
        console.log('Calling get by Id', res);

        this.companyHierarchyForm.patchValue({
          ...res,
        });
      });
  }
  get companyId(): string {
    return this.routerService.currentParetId;
  }
  constructor(
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private companyService: CompanyService,
    private formsService: FormsService,
    public sharedLibEnums: SharedLibraryEnums,
    private routerService: RouterService,

  ) {}
}

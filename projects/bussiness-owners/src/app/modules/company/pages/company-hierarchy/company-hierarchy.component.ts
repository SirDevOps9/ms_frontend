import { Component, Input, OnInit } from '@angular/core';
import {
  FormsService,
  LookupsService,
  RouterService,
  SharedLibraryEnums,
  customValidators,
} from 'shared-lib';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CompanyService } from '../../company.service';
import { CompanyHierarchyDto } from '../../models/companyhierarchydto';
import { SubsidiaryDto } from '../../models/subsidiarydto';
import { CompanyTypes, } from '../../models';

@Component({
  selector: 'app-company-hierarchy',
  templateUrl: './company-hierarchy.component.html',
  styleUrl: './company-hierarchy.component.scss',
  providers: [RouterService],
})
export class CompanyHierarchyComponent {
  companyHierarchyForm: FormGroup;
  companyHierarchyResponse: CompanyHierarchyDto;
  subsidiaryList: SubsidiaryDto[];
  companyTypeName: string;
  companyTypeLabel: string;
  holdingCompanyName: string;
  companyType:number;

  ngOnInit() {
    this.initializeForm();
    this.initializeFormData();
  }

  initializeForm() {
    this.companyHierarchyForm = this.fb.group({
      companyType: new FormControl('', ),
      subsidiary: new FormControl('', ),
    });
  }

  initializeFormData() {
    this.companyService
      .getCompanyHierarchyById(this.companyId)
      .subscribe((res) => {
        this.companyHierarchyForm.patchValue({
          ...res,
        });
        this.companyType = res.companyType
        this.companyHierarchyResponse = res;
        this.companyTypeName = res.companyTypeName;

        if (res.companyType === CompanyTypes.Holding) {
          this.companyTypeLabel = 'Subsidiary Company';
          this.subsidiaryList = res.subsidiaryCompanies || [];
        } else if (res.companyType === CompanyTypes.Subsidiary) {
          this.companyTypeLabel = 'Parent Company';
          this.holdingCompanyName = res.holdingCompany || '';
        }
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
    private routerService: RouterService
  ) {}
}

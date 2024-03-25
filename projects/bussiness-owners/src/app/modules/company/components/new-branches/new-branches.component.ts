import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { FormsService, LookupEnum, LookupsService, RouterService, SharedLibraryEnums, customValidators, lookupDto } from 'shared-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateBranchDto } from '../../models/createbranchdto';
import { CompanyService } from '../../company.service';
import { CompanyProxy } from '../../company.proxy';

@Component({
  selector: 'app-new-branches',
  templateUrl: './new-branches.component.html',
  styleUrl: './new-branches.component.scss'
})
export class NewBranchesComponent implements OnInit {
  newBrancheForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };

  ngOnInit() {
    this.initializeForm();
    this.loadLookups();
    this.Subscribe();
  }
  initializeForm(){
    this.newBrancheForm= this.fb.group({
      branchName:["",customValidators.required],
      countryCode:[],
      branchRegion:[],
      branchCity:[],
      branchEmail:[],
      branchAddress:[],
      mobileNumberCode:[],
      mobileNumber:[],
    })
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.MobileCode,
    ]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  onSubmit() {
    //if (this.formsService.validForm(this.newBrancheForm, true)) return;
    // Object.keys(this.newBrancheForm.controls).forEach(key => {
    //   const control = this.newBrancheForm.get(key);
    //   if (control && control.value === '') {
    //     control.setValue(null);
    //   }
    // });
    const request: CreateBranchDto = this.newBrancheForm.value;
    request.companyId = "17c13914-04a6-44a3-e20b-08dc4a688464";

    console.log("sending branch", request)
    this.companyService
    .addBranch(request,this.ref)
}
  onCancel() {
    this.ref.close();
  }


  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService,
    private routerService: RouterService,
    private companyService: CompanyService,
    private companyProxy: CompanyProxy,
    public sharedLibEnums: SharedLibraryEnums,
    public lookupsService: LookupsService


  ){}
}

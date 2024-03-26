import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { FormsService, LookupEnum, LookupsService, RouterService, SharedLibraryEnums, customValidators, lookupDto } from 'shared-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompanyService } from '../../company.service';
import { CompanyProxy } from '../../company.proxy';
import { EditBranchDto } from '../../models/editbranchdto';

@Component({
  selector: 'app-edit-branches',
  templateUrl: './edit-branches.component.html',
  styleUrl: './edit-branches.component.scss'
})
export class EditBranchesComponent {
  editBrancheForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  branchCode:string;
  //currentBranchId :string="5c400068-ea72-4f27-b556-08dc4c9167ba";

  ngOnInit() {
    this.initializeForm();
    this.initializeBranchFormData();
    this.loadLookups();
    this.Subscribe();
  }
  initializeForm(){
    this.editBrancheForm= this.fb.group({
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
      LookupEnum.Currency,
      LookupEnum.Industry,
      LookupEnum.Country,
      LookupEnum.MobileCode,
    ]);
  }

  initializeBranchFormData() {
    this.companyService.getBranchById(this.currentBranchId).subscribe(
      (res) => {
        this.branchCode=res.code
        this.editBrancheForm.patchValue({
          ...res,
        });
      }
    );
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }


  onSubmit() {
    //if (this.formsService.validForm(this.editBrancheForm, true)) return;
    const request: EditBranchDto = this.editBrancheForm.value;
    request.id = this.currentBranchId;
    this.companyService
    .editBranch(request,this.ref)
  }
  onCancel() {
    this.ref.close();
  }

  get currentBranchId(): string {
    return this.config.data.Id;
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  SharedLibraryEnums,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateBranch } from '../../models/create-branch';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-new-branches',
  templateUrl: './new-branches.component.html',
  styleUrl: './new-branches.component.scss',
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
  initializeForm() {
    this.newBrancheForm = this.fb.group({
      branchName: new FormControl('', [customValidators.required]),
      countryCode: new FormControl('', [customValidators.required]),
      branchRegion: new FormControl(),
      branchCity: new FormControl(),
      branchEmail: new FormControl(null, [customValidators.email]),
      branchAddress: new FormControl(),
      mobileNumberCode: new FormControl(),
      mobileNumber: new FormControl(null, [
        customValidators.hasSpaces,
        customValidators.noSpecialChars,
        customValidators.noAlphabeticCharacter,
      ]),
    });
  }
  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.MobileCode, LookupEnum.Country]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  onSubmit() {
    if (!this.formsService.validForm(this.newBrancheForm, true)) return;
    const request: CreateBranch = this.newBrancheForm.value;
    request.companyId = this.currentCompanyId;

    console.log('sending branch', request);
    this.companyService.addBranch(request, this.ref);
  }
  onCancel() {
    this.ref.close();
  }

  get currentCompanyId(): string {
    return this.config.data.Id;
  }
  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private companyService: CompanyService,
    public sharedLibEnums: SharedLibraryEnums,
    private formsService: FormsService,
    public lookupsService: LookupsService
  ) {}
}

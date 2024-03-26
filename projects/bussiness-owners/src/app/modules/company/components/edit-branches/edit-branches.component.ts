import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  SharedLibraryEnums,
  customValidators,
  lookupDto,
} from 'shared-lib';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { CompanyService } from '../../company.service';
import { EditBranchDto } from '../../models/editbranchdto';

@Component({
  selector: 'app-edit-branches',
  templateUrl: './edit-branches.component.html',
  styleUrl: './edit-branches.component.scss',
})
export class EditBranchesComponent {
  editBrancheForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  branchCode: string;

  ngOnInit() {
    this.initializeForm();
    this.initializeBranchFormData();
    this.loadLookups();
    this.Subscribe();
  }
  initializeForm() {
    this.editBrancheForm = this.fb.group({
      branchName: new FormControl('', [customValidators.required]),
      countryCode: new FormControl(),
      branchRegion: new FormControl(),
      branchCity: new FormControl(),
      branchEmail: new FormControl(),
      branchAddress: new FormControl(),
      mobileNumberCode: new FormControl(),
      mobileNumber: new FormControl(),
    });
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Country,
      LookupEnum.MobileCode,
    ]);
  }

  initializeBranchFormData() {
    this.companyService.getBranchById(this.currentBranchId).subscribe((res) => {
      this.branchCode = res.code;
      this.editBrancheForm.patchValue({
        ...res,
      });
    });
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  onSubmit() {
    if (!this.formsService.validForm(this.editBrancheForm, true)) return;
    const request: EditBranchDto = this.editBrancheForm.value;
    request.id = this.currentBranchId;
    this.companyService.editBranch(request, this.ref);
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
    private companyService: CompanyService,
    public sharedLibEnums: SharedLibraryEnums,
    private formsService: FormsService,
    public lookupsService: LookupsService
  ) {}
}

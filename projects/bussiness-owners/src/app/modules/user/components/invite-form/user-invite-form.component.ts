import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsService, customValidators, lookupDto } from 'shared-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateInvitedUser } from '../../models';
import { UserService } from '../../user.service';
import { CompanyService } from '../../../company/company.service';
import { BranchDto } from '../../../company/models';
import { SubscriptionService } from '../../../subscription/subscription.service';
import { TenantLicenseDto } from '../../../subscription/models';

@Component({
  selector: 'app-user-invite-form',
  templateUrl: './user-invite-form.component.html',
  styleUrls: ['./user-invite-form.component.scss'],
})
export class UserInviteFormComponent implements OnInit {
  inviteForm: FormGroup;
  Companies: lookupDto[] = [];
  branches: BranchDto[];
  Licenses: TenantLicenseDto[];
  selected: any = [];
  subdomainName: string;

  ngOnInit() {
    this.getSubdomainById();
    this.getCompanies();
    this.getTenantLicense();
    this.initializesubDomainForm();
  }

  initializesubDomainForm() {
    this.inviteForm = this.fb.group({
      email: new FormControl('', [customValidators.required, customValidators.email]),
      companyId: new FormControl('', customValidators.required),
      branchIds: new FormControl('', customValidators.required),
      tenantLicenseId: new FormControl('', customValidators.required),
    });
  }

  onSubmit() {
    if (!this.formService.validForm(this.inviteForm, true)) return;
    const userModel: CreateInvitedUser = this.inviteForm.value;
    userModel.subdomainId = this.subdomainId;
    const licenseLabel = this.Licenses.find(
      (l) => l.id == this.inviteForm.value.tenantLicenseId
    )!.nameEn;
    this.userService.inviteUser(userModel, licenseLabel, this.ref);
  }

  onCancel() {
    this.ref.close();
  }

  getCompanies() {
    this.companyService.getAllCompanies(this.subdomainId).subscribe((res) => {
      this.Companies = res;
    });
  }

  getSubdomainById() {
    this.subscriptionService.getSubdomainById(this.subdomainId).subscribe((res) => {
      this.subdomainName = res.name;
    });
  }

  getTenantLicense() {
    this.subscriptionService.getTenantLicense(this.subdomainId).subscribe((res) => {
      this.Licenses = res;
    });
  }

  onCompanyChange(event: any) {
    const companyId = event;
    if (!companyId) return;
    this.companyService.loadBranches(companyId);
    this.companyService.branches.subscribe((branchList) => {
      this.branches = branchList;
    });

    this.inviteForm.patchValue({ branchIds: [] });
    this.selected = [];
  }

  get subdomainId(): string {
    return this.config.data.Id;
  }

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    private formService: FormsService,
    private ref: DynamicDialogRef,
    private userService: UserService,
    private companyService: CompanyService,
    private subscriptionService: SubscriptionService
  ) {}
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FormsService, customValidators, lookupDto } from 'shared-lib';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InviteUserDto } from '../../models';
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
  Licenses:TenantLicenseDto[]
  subdomainName: string;


  ngOnInit() {
    this.getSubdomainById();
    this.getCompanies();
    this.getTenantLicense();
    this.initializesubDomainForm();
  }

  initializesubDomainForm() {
    this.inviteForm = this.fb.group({
      email: new FormControl('', customValidators.required,),
      companyId: new FormControl('', customValidators.required,),
      branchIds: new FormControl('', customValidators.required,),
      subdomain: new FormControl('', customValidators.required,),
      tenantLicenseId: new FormControl('', customValidators.required,),
    });
  }


  onSubmit() {
    if (!this.formService.validForm(this.inviteForm, true)) return;
    const userModel: InviteUserDto = this.inviteForm.value;
    this.userService.inviteUser(userModel, this.ref);
  }

  onCancel() {
    this.ref.close();
  }

  getCompanies() {
    this.companyService
      .getCompaniesDropDown(this.subdomainId)
      .subscribe((res) => {
        this.Companies = res;
      });
  }

  getSubdomainById() {
    this.subscriptionService
      .getSubdomainById(this.subdomainId)
      .subscribe((res) => {
        this.subdomainName = res.name;
      });
  }

  getTenantLicense() {
    this.subscriptionService
      .getTenantLicense(this.subdomainId)
      .subscribe((res) => {
        this.Licenses = res;
      });
  }



  onCompanyChange(event: any) {
    console.log("Calling onCompanyChange")
    const companyId = event;
    if (!companyId) return;
    this.companyService.loadBranches(companyId);
    this.companyService.branches.subscribe((branchList) => {
      this.branches = branchList;
    });
  }

  get subdomainId(): number {
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

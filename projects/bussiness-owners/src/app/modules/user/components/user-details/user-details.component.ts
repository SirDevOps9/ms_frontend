import { Component, OnInit } from '@angular/core';
import {
  EnvironmentService,
  FormsService,
  LanguageService,
  LookupEnum,
  LookupsService,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditUserModel } from '../../models';
import { UserService } from '../../user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CompanyService } from '../../../company/company.service';
import { SubscriptionService } from '../../../subscription/subscription.service';
import { BranchDto } from '../../../company/models';
import { TenantLicenseDto } from '../../../subscription/models';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  photo: string;
  userName: string;
  userEmail: string;
  userPhoto: string;
  editUserForm: FormGroup;
  companies: lookupDto[] = [];
  branches: BranchDto[] = [];
  subdomains: string[] = [];

  selectedBranches: string[] = [];
  selectedCompany: string | null;

  ngOnInit() {
    this.getCompanies();
    this.initializeUserForm();
    this.initializeUserFormData();
  }

  initializeUserForm() {
    this.editUserForm = this.formBuilder.group({
      companyId: new FormControl('', customValidators.required),
      branchIds: new FormControl( [],customValidators.required),
    });
  }

  initializeUserFormData() {
    this.userService.getUserById(this.currentUserId, this.subdomainId);

    this.userService.userState.subscribe((res) => {
      if (res.userDetails) {
        console.log(res.userDetails ,"uuuuuuuuuuuuuuuu");
        
        this.userName = res.userDetails!.name;
        this.userEmail = res.userDetails!.email;
        this.subdomains = res.userDetails!.subdomains;
        this.userPhoto = res.userDetails!.photo;
        this.selectedCompany = res.userDetails!.companyId.toUpperCase();
        this.selectedBranches =  res.userDetails!.branchIds;
        this.editUserForm.patchValue({
          companyId: res.userDetails!.companyId,
          branchIds: res.userDetails!.branchIds,
        });
        this.companyService.loadBranches(res.userDetails!.companyId);

        this.companyService.branches.subscribe((branchList) => {
          this.branches = branchList;
        });
        console.log('patched data', this.selectedCompany);
        console.log('patched data', this.selectedBranches);
      }
    });
  }

  async onSubmit() {
    console.log(this.editUserForm,"UpdateUserDtoUpdateUserDto");

    if (!this.formService.validForm(this.editUserForm, true)) return;
    const UpdateUserDto: EditUserModel = this.editUserForm.value;
    console.log(UpdateUserDto ,"UpdateUserDtoUpdateUserDto");
    
    this.userService.editUser(UpdateUserDto, this.currentUserId, this.subdomainId, this.ref);
  }
  onCancel() {
    this.ref.close();
  }
  getProfilePic() {
    return this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + this.currentUserId;
  }

  getCompanies() {
    this.companyService.getAllCompanies(this.subdomainId).subscribe((res) => {
      this.companies = res;
      // this.selectedCompany = this.companies.find(c => c.id === this.editUserForm.value.companyId)?.name || '';
    });
  }

  onCompanyChange(event: any) {
    console.log('Calling onCompanyChange');
    const companyId = event;
    if (!companyId) return;
    this.companyService.loadBranches(companyId);

    this.editUserForm.patchValue({ branchIds: [] });
    this.selectedBranches = [];
  }
 

  get currentUserId(): string {
    return this.config.data.Id;
  }

  get subdomainId(): string {
    return this.config.data.subdomainId;
  }

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DynamicDialogRef,
    private ref: DynamicDialogRef,
    private formService: FormsService,
    public languageService: LanguageService,
    private env: EnvironmentService,
    public lookupsService: LookupsService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private subscriptionService: SubscriptionService
  ) {}
}

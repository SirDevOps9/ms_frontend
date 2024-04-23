import { Component, OnInit } from '@angular/core';
import {
  EnvironmentService,
  LanguageService,
  LogService,
  LookupEnum,
  LookupsService,
  ToasterService,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditUserModel } from '../../models';
import { UserService } from '../../user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  editUserForm: FormGroup;
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;

  companies: lookupDto[] = [];
  branches: BranchDto[];
  licenses:TenantLicenseDto[];
  selected : any = [];
  subdomains: string[];

  selectedBranche: string[];
  selectedCompanie: string;
  selectedLicense: string;
  ngOnInit() {
    // this.loadLookups();
    this.initializeUserForm();
    this.initializeUserFormData();
    // this.subscribe();
  }
  // subscribe() {
  //   this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  // }
  // loadLookups() {
  //   this.lookupsService.loadLookups([
  //     LookupEnum.BusinessRole,
  //     LookupEnum.Subscription,
  //   ]);
  // }
  initializeUserForm() {
    this.editUserForm = this.formBuilder.group({
      name: ['', [customValidators.required]],
      email: ['', [customValidators.required, customValidators.email]],
      license: ['', customValidators.required],
      companyId: ['', customValidators.required],
      branchIds: ['', customValidators.required],
      subdomains: ['', customValidators.required],

    });
  }

  initializeUserFormData() {
  this.userService.getUserById(this.currentUserId , this.subdomainId ).subscribe(
    (res) => {
      this.userName = res.name;
      this.userEmail = res.email;
      this.subdomains = res.subdomains;
      this.editUserForm.patchValue({
        id: res.id,
        name: res.name,
        email: res.email,
        license: res.license, 
        companyId: res.companyId, 
        branches: res.branchIds,

      });
      this.companyService.loadBranches( res.companyId);
      this.companyService.branches.subscribe((branchList) => {
        this.branches = branchList;
      });
      // this.selectedLicenses = res.licenses.map(license => license.name);
      // this.selectedCompanies = res.companies.map(company => company.name);
      // this.selectedBranches = res.branches.map(branch => branch.name);
      console.log("patched data",this.editUserForm.value )

    }
  );

  }

  async onSubmit() {
    // const confirmed = await this.toasterService.showConfirm(
    //   'ConfirmButtonTexttochangstatus'
    // );
    // if (confirmed) {
    //   const UpdateUserDto: EditUserModel = this.editUserForm.value;
    //   this.logService.log(UpdateUserDto);
    //   UpdateUserDto.id = this.currentUserId;
    //   this.userService.editUser(UpdateUserDto, this.ref);
    // }
  }
  onCancel() {
    this.ref.close();
  }
  getProfilePic() {
    return (
      this.env.photoBaseUrl +
      '/api/Users/GetProfilePic?userId=' +
      this.currentUserId
    );
  }

  getTenantLicense() {
    this.subscriptionService
      .getTenantLicense(this.subdomainId)
      .subscribe((res) => {
        this.licenses = res;
      });
  }

  getCompanies() {
    this.companyService
      .getCompaniesDropDown(this.subdomainId)
      .subscribe((res) => {
        this.companies = res;
      });
  }

  // getSubdomainById() {
  //   this.subscriptionService
  //     .getSubdomainById(this.subdomainId)
  //     .subscribe((res) => {
  //       this.subdomainName = res.name;
  //     });
  // }


  get currentUserId(): string {
    return this.config.data.Id;
  }

  get subdomainId (): number {
    return this.config.data.subdomainId ;
  }

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DynamicDialogRef,
    private ref: DynamicDialogRef,
    private logService: LogService,
    private toasterService: ToasterService,
    public languageService: LanguageService,
    private env: EnvironmentService,
    public lookupsService: LookupsService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private subscriptionService: SubscriptionService
  ) {}
}

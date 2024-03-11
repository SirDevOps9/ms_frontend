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
  selectedBors: string[];
  selectedSubscriptions: string[];
  ngOnInit() {
    this.loadLookups();
    this.initializeUserForm();
    this.initializeUserFormData();
    this.subscribe();
  }
  subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.BusinessRole,
      LookupEnum.Subscription,
    ]);
  }
  initializeUserForm() {
    this.editUserForm = this.formBuilder.group({
      userName: ['', [customValidators.required]],
      email: ['', [customValidators.required, customValidators.email]],
      subscriptions: ['', customValidators.required],
      bORoles: ['', customValidators.required],
    });
  }
  initializeUserFormData() {
    this.userService.getUserById(this.currentUserId).subscribe({
      next: (res) => {
        this.userName=res.name
        this.userEmail=res.email
        this.editUserForm.patchValue({
          ...res,
          userName: res.name,
          subscriptions: res.subscriptions,
          bORoles: res.boRoles,
        });
        this.selectedBors = res.boRoles.map((b) => b.toString());
        this.selectedSubscriptions = res.subscriptions.map((b) => b.toUpperCase());
      },
      error: (err) => {},
    });
  }

  async onSubmit() {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      const UpdateUserDto: EditUserModel = this.editUserForm.value;
      this.logService.log(UpdateUserDto);
      UpdateUserDto.id = this.currentUserId;
      this.userService.editUser(UpdateUserDto, this.ref);
    }
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

  get currentUserId(): string {
    return this.config.data.Id;
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
    private formBuilder: FormBuilder
  ) {}
}

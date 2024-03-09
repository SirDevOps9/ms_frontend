import { Component, Input, OnInit } from '@angular/core';
import {
  BaseDto,
  EnvironmentService,
  LanguageService,
  LogService,
  LookupEnum,
  LookupsService,
  ToasterService,
  lookupDto,
} from 'shared-lib';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserProxy } from '../../user.proxy';
import { boupdateuser } from '../../models';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userName: string;
  userEmail: string;
  photo: string;
  actions: BaseDto[];
  selectedPlat: number[];
  selectedSubscriptions: string[];
  @Input() formId: string;
  domains: { id: string; name: string }[];
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;

  ngOnInit() {
    this.loadLookups();
    this.initializeUserForm();
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
    this.userService.getUserById(this.currentUserId).subscribe({
      next: (res) => {
        const userData = res;
        this.userName = userData.name;
        this.userEmail = userData.email;
        this.selectedSubscriptions = userData.subscriptions;
        this.selectedPlat = userData.boRoles;
      },
      error: (err) => {},
    });
  }

  async submitForm() {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      const UpdateUserDto: boupdateuser = {
        subscriptions: this.selectedSubscriptions,
        bORoles: this.selectedPlat,
        id: this.currentUserId,
      };
      this.logService.log(UpdateUserDto);
      this.userProxy.updateUser(UpdateUserDto, this.currentUserId).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            'Success',
            this.languageService.transalte('User.BoUserDetails.UserUpdated')
          );
          this.ref.close();
        },
        error: () => {
          this.ref.close();
        },
      });
    }
  }
  cancelEdit() {
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
    private userProxy: UserProxy,
    private logService: LogService,
    private toasterService: ToasterService,
    public languageService: LanguageService,
    private env: EnvironmentService,
    public lookupsService: LookupsService,
    private userService: UserService
  ) {}
}

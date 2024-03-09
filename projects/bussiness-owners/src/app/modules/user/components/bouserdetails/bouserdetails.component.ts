import { Component, Input, OnInit } from '@angular/core';
import {
  BaseDto,
  EnvironmentService,
  LanguageService,
  LogService,
  ToasterService,
} from 'shared-lib';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { UserProxy } from '../../user.proxy';
import { EditUserModel } from '../../models';

@Component({
  selector: 'bouserdetails',
  templateUrl: './bouserdetails.component.html',
  styleUrls: ['./bouserdetails.component.scss'],
})
export class bouserdetails implements OnInit {
  userName: string;
  userEmail: string;
  photo: string;
  actions: BaseDto[];
  selectedPlat: number[];
  selectedSubscriptions: string[];
  @Input() formId: string;
  Id: string;
  domains: { id: string; name: string }[];

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DynamicDialogRef,
    private ref: DynamicDialogRef,
    private userProxy: UserProxy,
    private logService: LogService,
    private toasterService: ToasterService,
    public languageService: LanguageService,
    private env: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.Id = this.config.data.Id;
    this.getformdata();
    forkJoin([
      this.userProxy.getAllSubscriptions(),
      this.userProxy.platformDropDown(),
    ]).subscribe(([subscriptions, platformData]) => {
      this.domains = subscriptions.response.map((x) => ({
        name: x.subdomain,
        id: x.id,
      }));
      this.actions = platformData.response;
    });
  }
  getformdata() {
    this.logService.log(this.Id);
    this.userProxy.getUserById(this.Id).subscribe({
      next: (res) => {
        const userData = res.response;
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
      const UpdateUserDto: EditUserModel = {
        subscriptions: this.selectedSubscriptions,
        bORoles: this.selectedPlat,
        id: this.Id,
      };
      this.logService.log(UpdateUserDto);
      this.userProxy.updateUser(UpdateUserDto, this.Id).subscribe({
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
    return this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + this.Id;
  }
}

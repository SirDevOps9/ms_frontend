import { UserListResponse } from './../../../../models/users/userlist.response';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubscriptionService } from 'projects/bussiness-owners/src/app/services/subscription.httpservice';
import { UserService } from 'projects/bussiness-owners/src/app/services/users.httpsservice';
import { forkJoin } from 'rxjs';
import {
  BaseDto,
  LanguageService,
  LoaderService,
  ToasterService,
  customValidators,
} from 'shared-lib';

@Component({
  selector: 'app-user-invite-form',
  templateUrl: './user-invite-form.component.html',
  styleUrls: ['./user-invite-form.component.scss'],
})
export class UserInviteFormComponent implements OnInit {
  submitted = false;
  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private ref: DynamicDialogRef
  ) {
    this.inviteForm = this.fb.group({
      subDomains: ['', Validators.required],
      plans: ['', Validators.required],
      email: ['', [customValidators.required, customValidators.email]],
      subscriptions: ['', Validators.required],
      bORoles: ['', Validators.required],
    });
  }
  inviteForm: FormGroup;
  domains: { id: string; name: string }[];
  actions: BaseDto[];

  ngOnInit() {
    forkJoin([
      this.subscriptionService.getAll(),
      this.userService.platformDropDown(),
    ]).subscribe(([subscriptions, platformData]) => {
      this.domains = subscriptions.response.map((x) => ({
        name: x.subdomain,
        id: x.id,
      }));
      this.actions = platformData.response;
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.inviteForm.valid) {
      return;
    }
    this.loaderService.show();

    this.userService.inviteUser(this.inviteForm.value).subscribe({
      next: (res) => {
        this.submitted = false;
        this.toasterService.showSuccess(
          this.languageService.transalte('User.Inviteform.Success'),
          this.languageService.transalte('User.Inviteform.InviationSent')
        );
        this.loaderService.hide();

        this.ref.close(res.response);
      },
      error: (err) => {
        this.loaderService.hide();
        this.submitted = false;
      },
    });
  }

  onCancel() {
    this.ref.close();
  }
}

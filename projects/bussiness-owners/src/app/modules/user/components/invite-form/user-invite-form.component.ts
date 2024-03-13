import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { UserService } from '../../user.service';
import { InviteUserDto } from '../../models';

@Component({
  selector: 'app-user-invite-form',
  templateUrl: './user-invite-form.component.html',
  styleUrls: ['./user-invite-form.component.scss'],
})
export class UserInviteFormComponent implements OnInit {
  submitted = false;
  inviteForm: FormGroup;
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;
  ngOnInit() {
    this.loadLookups();
    this.initializeUserForm();
    this.Subscribe();
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  onSubmit() {
    if (!this.formService.validForm(this.inviteForm, true)) return;
    const userModel: InviteUserDto = this.inviteForm.value;
    this.userService.inviteUser(userModel, this.ref);
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.BusinessRole,
      LookupEnum.Subscription,
    ]);
  }
  onCancel() {
    this.ref.close();
  }

  initializeUserForm() {
    this.inviteForm = this.fb.group({
      email: ['', [customValidators.required, customValidators.email]],
      subscriptions: ['', customValidators.required],
      bORoles: ['', customValidators.required],
    });
  }
  
  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    private formService: FormsService,
    private userService: UserService,
    private ref: DynamicDialogRef,
    public lookupsService: LookupsService
  ) {}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LookupEnum, LookupsService, customValidators, lookupDto } from 'shared-lib';

@Component({
  selector: 'app-invited-erp-user',
  templateUrl: './invited-erp-user.component.html',
  styleUrls: ['./invited-erp-user.component.css']
})
export class InvitedErpUserComponent implements OnInit {
  submitted = false;
  inviteForm: FormGroup;
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;
  ngOnInit() {
    this.loadLookups();
    this.initializeUserForm();
    this.Subscribe();
  }
  initializeUserForm() {
    this.inviteForm = this.fb.group({
      email: ['', [customValidators.required, customValidators.email]],
      subscriptions: ['', customValidators.required],
      bORoles: ['', customValidators.required],
    });
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.BusinessRole,
      LookupEnum.Subscription,
    ]);
  }

  onSubmit() {
  //  if (!this.formService.validForm(this.inviteForm, true)) return;
  //  const userModel: InviteUserDto = this.inviteForm.value;
  //  this.userService.inviteUser(userModel, this.ref);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  onCancel() {
    this.ref.close();
  }
  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    public lookupsService: LookupsService,
    private ref: DynamicDialogRef
  ) { }
}

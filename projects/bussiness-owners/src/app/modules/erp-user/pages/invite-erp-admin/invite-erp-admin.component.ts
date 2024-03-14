import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { ERPUserService } from '../../erp-user.service';

@Component({
  selector: 'app-invite-erp-admin',
  templateUrl: './invite-erp-admin.component.html',
  styleUrls: ['./invite-erp-admin.component.css']
})
export class InviteErpAdminComponent implements OnInit {

  inviteForm: FormGroup;

  ngOnInit() {
    this.initializeUserForm();
  }


  initializeUserForm() {
    this.inviteForm = this.fb.group({
      email: ['', [customValidators.required, customValidators.email]],
      setMeAsAdmin: [''],
    });
  }

  onSubmit() {
    if (!this.formService.validForm(this.inviteForm, true)) return;
    const userModel = this.inviteForm.value;
    //this.userService.inviteUser(userModel, this.ref);
  }

  onCancel() {
    this.ref.close();
  }
  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    private formService: FormsService,
    private userService: ERPUserService ,
    private ref: DynamicDialogRef,
  ) {}
}
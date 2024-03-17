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
  emailResults: string[] = [];
  selectedEmail: string

  ngOnInit() {
    this.initializeUserForm();
    this.setupEmailAutocomplete();
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
    userModel.selectedEmail = this.selectedEmail;
    this.userService.inviteUser(userModel, this.ref);
  }

  onCancel() {
    this.ref.close();
  }

  setupEmailAutocomplete() {
    const emailControl = this.inviteForm.get('email');
    emailControl?.valueChanges.subscribe(query => {
      if (!query) {
        this.emailResults = [];
      } else {
        this.userService.getEmailOptions(query).subscribe(options => {
          this.emailResults = options;
        });
      }
    });
  }

  onSelectEmail(email: string) {
    this.inviteForm.get('email')?.setValue(email);
    this.selectedEmail = email; 
    this.emailResults = []; 
  }

  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    private formService: FormsService,
    private userService: ERPUserService ,
    private ref: DynamicDialogRef,
  ) {}
}
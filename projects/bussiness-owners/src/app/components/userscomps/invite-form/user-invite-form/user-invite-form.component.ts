import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'projects/bussiness-owners/src/app/services/users.httpsservice';
import {
  LanguageService,
  LoaderService,
  ToasterService,
  customValidators,
} from 'shared-lib';

@Component({
  selector: 'app-user-invite-form',
  templateUrl: './user-invite-form.component.html',
  styleUrls: ['./user-invite-form.component.css'],
})
export class UserInviteFormComponent implements OnInit {
  @Output() invitedUser = new EventEmitter<any>();
  submitted = false;
  constructor(
    private dialogRef: MatDialogRef<UserInviteFormComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, customValidators.isValidSEmail]],
      subDomains: ['', Validators.required],
      plans: ['', Validators.required],
    });
  }
  inviteForm: FormGroup;

  domains: any[] = [
    { id: 1, name: 'Marketing' },
    { id: 2, name: 'Sales' },
    { id: 3, name: 'Support' },
  ];

  actions: any[] = [
    { id: 1, name: 'Read' },
    { id: 2, name: 'Write' },
    { id: 3, name: 'Manage' },
  ];

  ngOnInit() {
    // Fetch domains and actions dynamically if needed
  }
  onSubmit() {
    this.loaderService.show();
    this.submitted = true;
    if (this.inviteForm.valid) {
      console.log('Form submitted:', this.inviteForm.value);
      this.inviteForm.value.invitationStatus = 1;
      this.userService.inviteUser(this.inviteForm.value).subscribe({
        next: (res) => {
          this.submitted = false;
          this.toasterService.showSuccess(
            this.languageService.transalte('User.Inviteform.Success'),
            this.languageService.transalte('User.Inviteform.InviationSent')
          );
          this.invitedUser.emit(res);
          this.dialogRef.close();
        },
        error: (err) => {
          this.loaderService.hide();
          this.submitted = false;
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

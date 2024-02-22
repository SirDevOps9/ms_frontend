import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  styleUrls: ['./user-invite-form.component.css'],
})
export class UserInviteFormComponent implements OnInit {
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
  domains: BaseDto[];
  actions: BaseDto[];

  ngOnInit() {
    forkJoin([
      this.userService.subDomainDropDown(),
      this.userService.platformDropDown(),
    ]).subscribe(([subDomainData, platformData]) => {
      this.domains = subDomainData.response;
      this.actions = platformData.response;
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.inviteForm.valid) {
      this.loaderService.show();
      this.inviteForm.value.invitationStatus = 1;
      this.userService.inviteUser(this.inviteForm.value).subscribe({
        next: (res) => {
          this.submitted = false;
          this.toasterService.showSuccess(
            this.languageService.transalte('User.Inviteform.Success'),
            this.languageService.transalte('User.Inviteform.InviationSent')
          );
          this.loaderService.hide();
          this.dialogRef.close(res.response);
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

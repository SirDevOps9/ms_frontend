import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  DefaultExceptionModel,
  FormsService,
  LanguageService,
  LoaderService,
  LookupEnum,
  LookupsService,
  ToasterService,
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
    // this.userService.inviteUser(userModel, this.ref);
    this.userService.inviteUserPipe(userModel).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('User.Inviteform.Success'),
          this.languageService.transalte('User.Inviteform.InviationSent')
        );
        this.loaderService.hide();

        this.ref.close(res);
      },
      error: (err: DefaultExceptionModel) => {
        console.log('Invite Error', err);
        for (let index = 0; index < err.validationErrors!.length; index++) {
          this.inviteForm.controls[
            err.validationErrors![index].key.toLowerCase()
          ].setErrors({
            serverError: err.validationErrors![index].errorMessages[0],
          });

          // this.inviteForm.controls[err.validationErrors![index].key].setErrors(
          //   err.validationErrors![index].errorMessages[0]
          // );
        }
        this.loaderService.hide();
      },
    });
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
    public lookupsService: LookupsService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

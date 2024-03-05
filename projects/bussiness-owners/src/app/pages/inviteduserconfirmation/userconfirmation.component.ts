import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import {
  APIResponse,
  ConfirmPasswordValidator,
  LoaderService,
  LogService,
  RouterService,
  ToasterService,
  customValidators,
} from 'shared-lib';
import { InviteduserService } from '../../services/inviteduser.httpservice';
@Component({
  selector: 'app-userconfirmation',
  templateUrl: './userconfirmation.component.html',
  styleUrls: ['./userconfirmation.component.scss'],
  providers: [RouterService],
})
export class UserconfirmationComponent implements OnInit {
  userForm: FormGroup;
  inviteduserId: string;
  email: string;
  validId = false;
  photo: any;
  errorMessage: string;
  constructor(
    private loaderservice: LoaderService,
    private router: RouterService,
    private toasterService: ToasterService,
    private inviteduserService: InviteduserService,
    private formBuilder: FormBuilder,
    private logService: LogService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.GetEmail();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]],
      email: [
        { value: '', disabled: true },
        ,
        [Validators.required, Validators.email],
      ],
      password: ['', [Validators.required ,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      confirmPassword: ['', Validators.required,],
      acceptPolicy: [false, Validators.requiredTrue],
    }
    ,{validators:ConfirmPasswordValidator} as  AbstractControlOptions
    );
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      const fData = new FormData();
      fData.append('photo', this.photo);
    }
  }
  GetEmail() {
    this.inviteduserId = this.router.currentId;
    this.logService.log(this.inviteduserId);
    this.inviteduserService.GetInvitedUserEmail(this.inviteduserId).subscribe({
      next: (res) => {
        this.email = res.response;
        this.validId = true;
        this.userForm.patchValue({
          email: res.response,
        });
      },
      error: (err: APIResponse<string>) => {
        this.errorMessage = err.error?.errorMessage!;
      },
    });
  }

  submitForm() {
    this.loaderservice.show();

    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('photo', this.photo);

      Object.keys(this.userForm.value).forEach((key) => {
        formData.append(key, this.userForm.value[key]);
      });
      formData.append('inviteduserId', this.inviteduserId);
      formData.append('email', this.email);
      this.inviteduserService.ConfirmInvitedUser(formData).subscribe({
        next: (response) => {
          this.loaderservice.hide();
          this.toasterService.showSuccess('Success', 'Success');
          this.router.navigateTo('/login');
        },
        error: () => {
          this.loaderservice.hide();
        },
      });
    }
  }
  hasError(field: string, errorType: string): boolean {
    const control = this.userForm.get(field);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }
}

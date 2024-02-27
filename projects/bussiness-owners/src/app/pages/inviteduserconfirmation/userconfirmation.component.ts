import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService, LogService, RouterService } from 'shared-lib';
import { InviteduserService } from '../../services/inviteduser.httpservice';
@Component({
  selector: 'app-userconfirmation',
  templateUrl: './userconfirmation.component.html',
  styleUrls: ['./userconfirmation.component.css'],
  providers: [RouterService],
})
export class UserconfirmationComponent implements OnInit {
  userForm: FormGroup;
  inviteduserId: string;
  email: string;
  validId = false;
  photo: any;
  constructor(
    private loaderservice: LoaderService,
    private router: RouterService,
    private inviteduserService: InviteduserService,
    private formBuilder: FormBuilder,
    private logService: LogService
  ) {}

  ngOnInit() {
    console.log('User Confirmation');

    this.initializeForm();
    this.GetEmail();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        { value: '', disabled: true },
        ,
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptPolicy: [false, Validators.requiredTrue],
    });
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      console.log('photo', this.photo);
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
      error: (err) => {
        this.router.navigateTo('');
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
          this.router.getRouteParams('/login');
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

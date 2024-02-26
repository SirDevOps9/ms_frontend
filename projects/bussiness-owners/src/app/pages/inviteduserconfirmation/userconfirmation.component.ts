import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoaderService,
  LogService,
  RouterService,
} from 'shared-lib';
import { InviteduserService } from '../../services/inviteduser.httpservice';
import { AddConfirmedUserDto } from '../../models/users/addconfirmedcser.model';
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
  constructor(
    private loaderservice: LoaderService,
    private router: RouterService,
    private inviteduserService: InviteduserService,
    private formBuilder: FormBuilder,
    private logService: LogService
  ) {}

  ngOnInit() {
    console.log("User Confirmation");
    
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
      photo:['']
    });
    
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
      const addUserDto: AddConfirmedUserDto = this.userForm.value;
      addUserDto.invitedUserId = this.inviteduserId;
      addUserDto.email = this.email;
      this.logService.log(addUserDto);
      this.inviteduserService.ConfirmInvitedUser(addUserDto).subscribe({
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

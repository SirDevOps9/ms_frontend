import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from 'shared-lib';
import { ActivatedRoute, Router } from '@angular/router';
import { InviteduserService } from '../../services/inviteduser.httpservice';
import { AddConfirmedUserDto } from '../../models/users/add-ConfirmedUserDto';



@Component({
  selector: 'app-userconfirmation',
  templateUrl: './userconfirmation.component.html',
  styleUrls: ['./userconfirmation.component.css']
})
export class UserconfirmationComponent implements OnInit {

  userForm: FormGroup;
  inviteduserId: string |null;
  email :string;

  constructor(private router: Router, private inviteduserService: InviteduserService ,private route: ActivatedRoute, private formBuilder: FormBuilder , private logService: LogService) { 
  }

  ngOnInit() {
    this.initializeForm();
    this.GetEmail();
  }
  initializeForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: [{value: '', disabled: true},, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      acceptPolicy: [false, Validators.requiredTrue]
    });
  }
  GetEmail(){
     this.inviteduserId = this.route.snapshot.paramMap.get('id');
    if ( this.inviteduserId !== null) {
    this.inviteduserService.GetInvitedUserEmail( this.inviteduserId).subscribe({
      next: (res) => {
        this.email=res.response
        this.userForm.patchValue({
          email: res.response
        });
      },
  })
}
  }
  submitForm() {
    if (this.userForm.valid) {
      const addUserDto: AddConfirmedUserDto = {
        InvitedUserId: this.inviteduserId!,
        FullName: this.userForm.value.name,
        Email:this.email,
        Password: this.userForm.value.password,
        ConfirmPassword: this.userForm.value.confirmPassword
      };
      this.logService.log(addUserDto);
      this.inviteduserService.ConfirmInvitedUser(addUserDto).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        }})

    }
  }
}

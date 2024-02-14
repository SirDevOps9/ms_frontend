import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from 'shared-lib';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/users.httpsservice';


@Component({
  selector: 'app-userconfirmation',
  templateUrl: './userconfirmation.component.html',
  styleUrls: ['./userconfirmation.component.css']
})
export class UserconfirmationComponent implements OnInit {

  userForm: FormGroup;
  inviteduserId: string |null;

  constructor( private userService: UserService ,private route: ActivatedRoute, private formBuilder: FormBuilder , private logService: LogService) { 
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
    this.userService.GetInvitedUserEmail( this.inviteduserId).subscribe({
      next: (res) => {
        this.userForm.patchValue({
          email: res.response
        });
      },
  })
}
  }
  submitForm() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.logService.log('user Information:', user);

     // this.userService.CreateInvitedUser()

    }
  }
}

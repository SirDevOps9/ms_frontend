import { Component, Inject, Input, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/users.httpsservice';
import {
  LoaderService,
  LogService,
  RouterService,
  customValidators,
} from 'shared-lib';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'bouserdetails',
  templateUrl: './bouserdetails.component.html',
  styleUrls: ['./bouserdetails.component.css']
})
export class bouserdetails implements OnInit {
  userForm: FormGroup;
 @Input() formId:string;
  subdomains: any[] = [
    { id: 1, name: 'Marketing' },
    { id: 2, name: 'Sales' },
    { id: 3, name: 'Support' },
  ];

  platformplans: any[] = [
    { id: 1, name: 'Read' },
    { id: 2, name: 'Write' },
    { id: 3, name: 'Manage' },
  ];
  Id:string;

  constructor(private fb: FormBuilder 
    ,private Userservice :UserService 
    ,private router: RouterService
    , private logService: LogService
    , private loaderservice: LoaderService
    ,@Inject(MAT_DIALOG_DATA) public data: any) {
      this.Id = data.Id;
     }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      photo: [''],
      subdomain: [[]],
      platformplan: [[]]
    });
    this.getformdata();
   // this.Userservice.getSubdomains().subscribe(data => {
    //  this.subdomains = data;
  //  });

  //  this.Userservice.getPlatformPlans().subscribe(data => {
   //   this.platformplans = data;
   // });
  }
  getformdata() {
    this.logService.log(this.Id);
    this.Userservice.getUserById(this.Id).subscribe({
      next: (res) => {
        const userData = res.response;
        this.userForm.patchValue({
          username: userData.name,
          email: userData.email,
          photo: userData.photo,
          subdomain: userData.subDomain, 
          platformplan: userData.pLatformplan, 
        });
      },
      error: (err) => {
      },
    });

  }
  

  submitForm() {
    this.loaderservice.show();
    const userForm = this.userForm.value;
    this.Userservice.updateUser(userForm ,this.Id ).subscribe({
      next: (response) => {
        this.router.getRouteParams('/users');
      },
      error: () => {
        this.loaderservice.hide();
      },
    });
  }

}

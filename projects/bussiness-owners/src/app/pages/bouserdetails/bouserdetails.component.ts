import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/users.httpsservice';
import {
  LoaderService,
  LogService,
  RouterService,
  customValidators,
} from 'shared-lib';


@Component({
  selector: 'bouserdetails',
  templateUrl: './bouserdetails.component.html',
  styleUrls: ['./bouserdetails.component.css']
})
export class bouserdetails implements OnInit {
  userForm: FormGroup;
  subdomains: any[] = [];
  platformplans: any[] = [];
  Id:string;

  constructor(private fb: FormBuilder 
    ,private Userservice :UserService 
    ,private router: RouterService
    , private logService: LogService
    , private loaderservice: LoaderService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      photo: [''],
      subdomain: [[]],
      platformplan: [[]]
    });
   // this.Userservice.getSubdomains().subscribe(data => {
    //  this.subdomains = data;
  //  });

  //  this.Userservice.getPlatformPlans().subscribe(data => {
   //   this.platformplans = data;
   // });
  }
  getformdata() {
    this.loaderservice.show();
    this.Id = this.router.currentId;
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
        this.loaderservice.hide();
      },
      error: (err) => {
        this.loaderservice.hide();
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

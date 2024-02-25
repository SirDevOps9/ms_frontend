import { Component, Inject, Input, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/users.httpsservice';
import {
  LanguageService,
  LoaderService,
  LogService,
  RouterService,
  ToasterService,
  customValidators,
} from 'shared-lib';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { boupdateuser } from '../../../models/users/boupdateduser.model';


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
    ,private toasterService: ToasterService
    , public languageService: LanguageService
    ,@Inject(MAT_DIALOG_DATA) public data: any
    , private dialogRef: MatDialogRef<bouserdetails>) {
      this.Id = data.Id;
     }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [ { value: '', disabled: true }],
      email: [ { value: '', disabled: true }],
      photo: [ { value: '', disabled: true }],
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
          plateformPlan: userData.pLatformplan, 
        });
      },
      error: (err) => {
      },
    });

  }
  

  async submitForm() {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      const UpdateUserDto: boupdateuser = this.userForm.value;

      this.logService.log(UpdateUserDto);
      this.Userservice.updateUser(userForm ,this.Id ).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            'Success',
            this.languageService.transalte('User.BoUserDetails.UserUpdated')
          )
        //  this.dialogRef.close(); 
        },
        error: () => {
          this.dialogRef.close();
        },
      });
    }
   
  }
  cancelEdit(){
    this.dialogRef.close();
  }

}

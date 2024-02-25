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
  subdomains: any[];
  platformplans: any[]; 
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
    this.Userservice.subDomainDropDown().subscribe(data => {
      this.subdomains = data.response;
    });

    this.Userservice.platformDropDown().subscribe(data => {
      this.platformplans = data.response;
    });
    this.getformdata();
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
      this.Userservice.updateUser(UpdateUserDto ,this.Id ).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            'Success',
            this.languageService.transalte('User.BoUserDetails.UserUpdated')
          )
          this.dialogRef.close(); 
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

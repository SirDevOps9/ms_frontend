import { Component, Inject, Input, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/users.httpsservice';
import {
  BaseDto,
  EnvironmentService,
  LanguageService,
  LoaderService,
  LogService,
  RouterService,
  ToasterService,
  customValidators,
} from 'shared-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef  } from 'primeng/dynamicdialog';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { boupdateuser } from '../../../models/users/boupdateduser.model';
import { SubscriptionService } from '../../../services/subscription.httpservice';
import { SubscriptionDto } from '../../../models/subscription/subscriptionDto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'bouserdetails',
  templateUrl: './bouserdetails.component.html',
  styleUrls: ['./bouserdetails.component.scss']
})
export class bouserdetails implements OnInit {
  userForm: FormGroup;
  userName:string;
  userEmail:string;
  photo:string;
  // domains: BaseDto[];
  actions: BaseDto[];
  selectedPlat:number[];
  selectedSubscriptions:string[];
 @Input() formId:string;
  subdomains: SubscriptionDto[]=[];
  platformplans: any[]=[]; 
  Id:string;
  domains: {id: string; name: string}[];

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DynamicDialogRef,
    private ref: DynamicDialogRef,
    private fb: FormBuilder 
    ,private Userservice :UserService,
    private subscriptionService: SubscriptionService 
    ,private router: RouterService
    , private logService: LogService
    , private loaderservice: LoaderService
    ,private toasterService: ToasterService
    , public languageService: LanguageService,
    private env: EnvironmentService,
    ){
      
     }

  ngOnInit(): void {
    this.Id = this.config.data.Id;
    this.userForm = this.fb.group({
      username: [ { value: '', disabled: true }],
      email: [ { value: '', disabled: true }],
      photo: [ { value: '', disabled: true }],
      subdomain: [[]],
      platformplan: [[]]
    });
    // this.subscriptionService.getAll().subscribe(r => this.subdomains = r.response)

    // this.Userservice.platformDropDown().subscribe(data => {
    //   this.platformplans = data.response;
    // });
    this.getformdata();
    forkJoin([
      this.subscriptionService.getAll(),
      this.Userservice.platformDropDown(),
    ]).subscribe(([subscriptions, platformData]) => {
      this.domains = subscriptions.response.map(x=>({name: x.subdomain, id: x.id}));
      this.actions = platformData.response;
    });
  }
  getformdata() {
    this.logService.log(this.Id);
    this.Userservice.getUserById(this.Id).subscribe({
      next: (res) => {
        const userData = res.response;
        this.userName= userData.name; 
        this.userEmail= userData.email;
        this.selectedSubscriptions=userData.subscriptions;
        this.selectedPlat=userData.boRoles;
        
        // this.userForm.patchValue({
        //   subdomain: userData.subDomain, 
        //   plateformPlan: userData.pLatformplan, 
        // });
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
      const UpdateUserDto: boupdateuser = {
        subscriptions:this.selectedSubscriptions,
        bORoles:this.selectedPlat,
        id:this.Id
      }
       
      

      this.logService.log(UpdateUserDto);
      this.Userservice.updateUser(UpdateUserDto, this.Id ).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            'Success',
            this.languageService.transalte('User.BoUserDetails.UserUpdated')
          )
          this.ref.close(); 
        },
        error: () => {
          this.ref.close();
        },
      });
    }
   
  }
  cancelEdit(){
    this.ref.close();
  }
  getProfilePic(){
    return this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + this.Id
    
    
    
    
  }

}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  FormsService,
  LoaderService,
  RouterService,
  SharedLibraryEnums,
  customValidators,
} from 'shared-lib';

import { UserService } from '../../user.service';
import { AddConfirmedUserDto, InvitedUserDto } from '../../models';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-userconfirmation',
  templateUrl: './userconfirmation.component.html',
  styleUrls: ['./userconfirmation.component.scss'],
  providers: [RouterService],
})
export class UserconfirmationComponent implements OnInit {
  userForm: FormGroup;
  email: string;
  dto: InvitedUserDto;
  validId:boolean= false;
  notvalid:boolean= false;
  photo: any;
  errorMessage: string;
  photoSrc: string = 'assets/images/users/pic.jpg';
  ngOnInit() {
    this.titleService.setTitle('Confirm Invitation');
    this.initializeForm();
    this.getEmail();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      fullName: new FormControl('', [
        customValidators.required,
        customValidators.length(3, 50),
      ]),
      email: new FormControl('',  [customValidators.required,customValidators.email]),
      password: new FormControl('', [customValidators.required,customValidators.password]),
      confirmPassword: new FormControl('', [customValidators.required,customValidators.confrimPassword]),
      acceptPolicy: new FormControl('', [Validators.requiredTrue]),
      photo: new FormControl(''),
    });
  }
  getEmail() {
    this.userService.getInvitedById(this.invitedUserId).subscribe({

    
      next:(dto) => {
        this.dto = dto;
        this.email = dto.email;
        this.validId = true;
        this.notvalid = false;
        this.userForm.patchValue({
          email: dto.email,
        });
      },
      error:(error:any)=>{
        this.validId = false;
        this.notvalid = true;
      }
  });
  }

  submitForm() {
    if (!this.formsService.validForm(this.userForm, true)) return;
    this.loaderservice.show();
    const request: AddConfirmedUserDto = this.userForm.value;
    request.invitedUserId = this.invitedUserId;
    request.email = this.email;
    this.userService.submitUserConfirm(this.dto.subdomain, request);
  }
  
  get invitedUserId(): string {
    return this.router.currentId;
  }
  
  constructor(
    private loaderservice: LoaderService,
    private router: RouterService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private userService: UserService,
    public sharedLibEnums: SharedLibraryEnums,
    private titleService: Title
  ) { }
}

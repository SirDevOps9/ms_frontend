import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService, LoaderService, RouterService, customValidators } from 'shared-lib';

@Component({
  selector: 'app-confirm-invited-erp-user',
  templateUrl: './confirm-invited-erp-user.component.html',
  styleUrls: ['./confirm-invited-erp-user.component.css']
})
export class ConfirmInvitedErpUserComponent implements OnInit {

  userForm: FormGroup;
  email: string;
  validId = false;
  photo: any;
  errorMessage: string;
  photoSrc: string = 'assets/images/users/pic.jpg';
  

  ngOnInit() {
    this.initializeForm();
    this.getEmail();
  }
  initializeForm() {
    this.userForm = this.formBuilder.group(
      {
        fullName: [
          '',
          [customValidators.required, customValidators.length(3, 50)],
        ],
        email: [
          { value: '', disabled: true },
          ,
          [customValidators.required, customValidators.email],
        ],
        password: [
          '',
          [
            customValidators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', customValidators.required],
        acceptPolicy: [false, Validators.requiredTrue],
      },
      { validators: customValidators.confrimPassword } as AbstractControlOptions
    );
  }
  
  get getUserId(): string {
    return this.router.currentId;
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      const fData = new FormData();
      fData.append('photo', this.photo);
    }
    const file = event.srcElement.files;
    if (file) {
      this.photoSrc = URL.createObjectURL(file[0]);
    }
  }
getEmail() {
  }
  submitForm() {
  }

  constructor(
    private loaderservice: LoaderService,
    private router: RouterService,
    private formBuilder: FormBuilder,
    private formsService: FormsService  ) { }
}

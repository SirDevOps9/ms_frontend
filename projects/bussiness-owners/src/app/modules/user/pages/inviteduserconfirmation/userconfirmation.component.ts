import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  FormsService,
  LoaderService,
  RouterService,
  customValidators,
} from 'shared-lib';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-userconfirmation',
  templateUrl: './userconfirmation.component.html',
  styleUrls: ['./userconfirmation.component.scss'],
  providers: [RouterService],
})
export class UserconfirmationComponent implements OnInit {
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
    this.userService.getEmail(this.getUserId).subscribe({
      next: (email) => {
        this.email = email;
        this.validId = true;
        this.userForm.patchValue({
          email: email,
        });
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }

  submitForm() {
    if (!this.formsService.validForm(this.userForm, true)) return;
    this.loaderservice.show();
    const formData = this.fillDataForm();
    this.userService.submitUserConfirm(formData);
  }
  fillDataForm(): FormData {
    const formData = new FormData();
    formData.append('photo', this.photo);

    Object.keys(this.userForm.value).forEach((key) => {
      formData.append(key, this.userForm.value[key]);
    });
    formData.append('inviteduserId', this.getUserId);
    formData.append('email', this.email);
    return formData;
  }

  get getUserId(): string {
    return this.router.currentId;
  }
  constructor(
    private loaderservice: LoaderService,
    private router: RouterService,
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private userService: UserService
  ) {}
}

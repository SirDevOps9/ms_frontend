import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { LanguageService } from '../../services/language.service';
import { StorageService } from '../../services/localstorage.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  type: string = 'password';
  isLoading: boolean;
  isSubmit = false;
  public loading: boolean;
  errorMessages: string[];

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    public oidcSecurityService: OidcSecurityService,
    private languageService: LanguageService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.languageService.setDefaultLang('en');
    this.languageService.setLang();
    //this.storageService.ClearAllLocalStorage();
    // this.oidcSecurityService.authorize();
    this.loginFormValidation();
  }

  loginFormValidation() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
    });
  }

  microTecSignIn() {
    this.storageService.ClearAllLocalStorage();
    this.oidcSecurityService
      .authorizeWithPopUp()
      .subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
        if (isAuthenticated) this.routerService.navigateTo('/login-redirect');
        else console.log(errorMessage);

        //console.log(userData);
      });
   // this.oidcSecurityService.authorize();
  }

  onLogIn() {
    if (!this.loginForm.valid) {
      alert('Invalid Entries');
      return;
    }
    this.storageService.ClearAllLocalStorage();
    console.log(this.loginForm.value);
  }
}

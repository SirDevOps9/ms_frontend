import { Component, OnInit } from '@angular/core';
import { AuthHttpService, AuthService } from 'microtec-auth-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit {
  loginResponse: any;
  ngOnInit() {
    this.authHttp.updateLoginDate().subscribe();
    this.authService.afterLoginReidrect();
  }
  constructor(private authService: AuthService,
    private authHttp:AuthHttpService) {}
}

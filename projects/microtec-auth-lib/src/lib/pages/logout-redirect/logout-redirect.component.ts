import { Component } from '@angular/core';
import { RouterService } from 'shared-lib';
import { AuthService } from '../../services';

@Component({
  selector: 'app-logout-redirect',
  templateUrl: './logout-redirect.component.html',
  styleUrl: './logout-redirect.component.css',
})
export class LogoutRedirectComponent {
  constructor(
    private authService: AuthService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.authService.clearAllStorage();
    this.routerService.navigateTo('');
  }
}

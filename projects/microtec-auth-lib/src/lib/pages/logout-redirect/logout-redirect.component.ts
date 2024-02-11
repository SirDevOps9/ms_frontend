import { Component } from '@angular/core';
import { StorageService, RouterService } from 'shared-lib';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-logout-redirect',
  templateUrl: './logout-redirect.component.html',
  styleUrl: './logout-redirect.component.css',
})
export class LogoutRedirectComponent {
  constructor(
    private storage: StorageService,
    private cookiService: CookieService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.storage.clearAll();
    this.cookiService.removeAll();
    this.routerService.navigateTo('');
  }
}

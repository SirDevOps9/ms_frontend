import { Component } from '@angular/core';
import { StorageService } from '../../services/localstorage.service';
import { RouterService } from '../../services/router.service';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-logout-redirect',
  templateUrl: './logout-redirect.component.html',
  styleUrl: './logout-redirect.component.css',
})
export class LogoutRedirectComponent {
  constructor(private storage: StorageService,private cookiService:CookieService,
    private routerService:RouterService) {}

  ngOnInit(): void {
    this.storage.ClearAllLocalStorage();
    this.cookiService.removeAll();
    this.routerService.navigateTo('');
  }
}

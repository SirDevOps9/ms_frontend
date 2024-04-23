import { Component } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { AppStoreService } from 'projects/bussiness-owners/src/app/modules/app-store/app-store.service';
import { UserData } from 'projects/bussiness-owners/src/app/modules/user/models';
import { Observable } from 'rxjs';
import { EnvironmentService, LanguageService, RouterService } from 'shared-lib';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss'
})
export class LayoutHeaderComponent {
  userName: string;
  userData: UserData;
  showcard: boolean = false;
  sidebarOpen: boolean = false;
  // cartItemsCount$: Observable<number>;

  ngOnInit() {}

  toggleLanguage(): void {
  }
  logout(): void {
  }

  toggleSidebar() {
    if (this.sidebarOpen == true) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }


  getProfilePic() {
   
  }

  cardDrob() {
    if (this.showcard == true) {
      this.showcard = false;
    } else {
      this.showcard = true;
    }
  }
  routeToCart() {
  }

  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    private env: EnvironmentService,
    private cartService: AppStoreService,
    private routerService: RouterService,

  ) {
    // this.userName = this.authService.getUserName;
    // this.userData = this.authService.getUserData()?.userData;
    // this.languageService.setLang();
    // this.cartItemsCount$ = cartService.cartItemsCount$;
  }
}

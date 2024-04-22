import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { EnvironmentService, LanguageService, RouterService } from 'shared-lib';
import { UserData } from '../../user/models';
import { AppStoreService } from '../../app-store/app-store.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent implements OnInit {
  userName: string;
  userData: UserData;
  showcard: boolean = false;
  sidebarOpen: boolean = false;
  cartItemsCount$: Observable<number>;

  ngOnInit() {}

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  logout(): void {
    this.authService.logout();
  }

  toggleSidebar() {
    if (this.sidebarOpen == true) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }
  activeTag(id: any) {
    const targetElementId = document.getElementById(id);
    var test = document.querySelector('.active_link');
    test?.classList.remove('active_link');
    targetElementId?.classList.add('active_link');
  }

  getProfilePic() {
    return this.userData?.userType == '4'
      ? this.env.photoBaseUrl +
          '/api/Users/GetProfilePic?userId=' +
          this.userData.sub
      : 'assets/images/users/pic.jpg';
  }

  cardDrob() {
    if (this.showcard == true) {
      this.showcard = false;
    } else {
      this.showcard = true;
    }
  }
  routeToCart() {
    this.routerService.navigateTo(`/app-store/cart`)
  }

  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    private env: EnvironmentService,
    private cartService: AppStoreService,
    private routerService: RouterService,

  ) {
    this.userName = this.authService.getUserName;
    this.userData = this.authService.getUserData()?.userData;
    this.languageService.setLang();
    this.cartItemsCount$ = cartService.cartItemsCount$;
  }
}

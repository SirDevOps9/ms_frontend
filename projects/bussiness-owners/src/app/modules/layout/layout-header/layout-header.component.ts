import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AuthService, UserInfoDto } from 'microtec-auth-lib';
import { Cultures, EnvironmentService, LanguageService, RouterService } from 'shared-lib';
import { AppStoreService } from '../../app-store/app-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent implements OnInit {
  @Output() language = new EventEmitter();
  userName: string;
  userData: UserInfoDto;
  showcard: boolean = false;
  sidebarOpen: boolean = false;
  cartItemsCount$: Observable<number>;
  @Output() sidebarToggle = new EventEmitter(); // Renamed event

  ngOnInit() {}

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
    this.language.emit(this.languageService.getLang());
  }
  logout(): void {
    this.authService.logout();
  }

  // toggleSidebar() {
  //   if (this.sidebarOpen == true) {
  //     this.sidebarOpen = false;
  //   } else {
  //     this.sidebarOpen = true;
  //   }
  // }
  activeTag(id: any) {
    const targetElementId = document.getElementById(id);
    var test = document.querySelector('.active_link');
    test?.classList.remove('active_link');
    targetElementId?.classList.add('active_link');
  }

  getProfilePic() {
    // return this.userData?.userType == '4'
    //   ? this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + this.userData.sub
    //   :
    return 'assets/images/users/pic.jpg';
  }

  cardDrob() {
    if (this.showcard == true) {
      this.showcard = false;
    } else {
      this.showcard = true;
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.showcard && !this.eRef.nativeElement.contains(event.target)) {
      this.showcard = false;
    }
  }
  routeToCart() {
    this.routerService.navigateTo(`/app-store/cart`);
  }
  onToggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    console.log("header" , this.sidebarOpen);
    
    this.sidebarToggle.emit(this.sidebarOpen); // Emit event to parent
  }
 

  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    private env: EnvironmentService,
    private cartService: AppStoreService,
    private routerService: RouterService,
    private eRef: ElementRef
  ) {
    this.userName = this.authService.getUserName;
    this.userData = this.authService.getUserData().userInfo;
    this.languageService.setLang();
    this.cartItemsCount$ = cartService.cartItemsCount$;
  }
}

import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cultures, LanguageService } from 'shared-lib';
import { AuthService } from 'microtec-auth-lib';
import { RouterService } from 'shared-lib';
import { UserData } from '../../user/models/userdata.model';
import { AppStoreService } from '../../app-store/app-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  userName: string;
  showcard: boolean = false;
  sidebarOpen: boolean = false;
  countries: any[] | undefined;
  currentLang: Cultures | string;
  selectedCountry: string | undefined;

  @ViewChild('cardDr') cardDr: ElementRef;
  @ViewChild('profaile_card_drob') profaile_card_drob: ElementRef;
  cartItemsCount$: Observable<number>;
  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    private routerService: RouterService,
    private cartService: AppStoreService
  ) {
    this.userName = this.authService.getUserName;
    this.languageService.setLang();
    this.cartItemsCount$ = cartService.cartItemsCount$;
  }
  ngOnInit(): void {}

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  logout(): void {
    this.authService.logout();
  }
  languageToggleDetect(event: Cultures | string) {
    this.currentLang = event;
  }

  // toggleSidebar(event: boolean) {
  //   this.sidebarOpen = event;
  // }
  toggleSidebar(open: any) {
    console.log("88888888888888");
    
    console.log("00" , open);
    
    this.sidebarOpen = open;
  }
  toggleSidebars(open:any){
    console.log("88888888888888");
    
    console.log("00" , open);
    this.sidebarOpen = open;

  }
  activeTag(id: any) {
    const targetElementId = document.getElementById(id);
    var test = document.querySelector('.active_link');
    test?.classList.remove('active_link');
    targetElementId?.classList.add('active_link');
  }

  routeToCart() {
    this.routerService.navigateTo(`/app-store/cart`);
  }
}

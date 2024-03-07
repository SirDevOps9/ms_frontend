import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LanguageService } from '../../../../../shared-lib/src/lib/services/language.service';
import { AuthService } from 'microtec-auth-lib';
import { MenuItem } from 'primeng/api';
import { EnvironmentService, LogService } from 'shared-lib';
import { UserData } from '../../models/users/userdata.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  userName: string;
  userData: UserData;
  showcard: boolean = false;
  sidebarOpen: boolean = false;
  submenu: boolean = false;
  countries: any[] | undefined;

  selectedCountry: string | undefined;
  breadcrumbItems: MenuItem[];
  menuItems: MenuItem[];

  home: MenuItem | undefined;
  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    private logService: LogService,
    private env: EnvironmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.userName = this.authService.getUserName;
    this.userData = this.authService.getUserData()?.userData;
    this.languageService.setLang();
  }
  ngOnInit(): void {
    this.menuItems = this.createBreadcrumb(this.activatedRoute.root);
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ];
    this.home = { icon: 'pi pi-home', routerLink: '/plan' };
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () => (this.menuItems = this.createBreadcrumb(this.activatedRoute.root))
      );
  }

  private createBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        const localized = this.languageService.transalte(label);
        breadcrumbs.push({ label: localized, routerLink: url });
      }

      if (child.children && child.children.length > 0) {
        return this.createBreadcrumb(child, url, breadcrumbs);
      }
    }
    return breadcrumbs;
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  logout(): void {
    this.authService.logout();
  }
  cardDrob() {
    if (this.showcard == true) {
      this.showcard = false;
    } else {
      this.showcard = true;
    }
  }
  toggleSidebar() {
    if (this.sidebarOpen == true) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }
  showSubmenu() {
    this.submenu = true;
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
}

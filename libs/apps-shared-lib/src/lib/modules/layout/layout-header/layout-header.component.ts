import { MenuModule } from './../../../../../../shared-lib/src/lib/models/menuModule';
import { Component, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { UserData } from 'projects/bussiness-owners/src/app/modules/user/models';
import { Observable } from 'rxjs';
import { EnvironmentService, LanguageService, Modules, RouterService } from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModuleListComponent } from '../../../components/module-list/module-list.component';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
})
export class LayoutHeaderComponent {
  userName: string;
  moduleName: string;
  userData: UserData;
  showcard: boolean = false;
  sidebarOpen: boolean = false;
  moduleList: MenuModule[];
  cartItemsCount$: Observable<number>;
  userPhoto: string;
  ref: DynamicDialogRef;

  ngOnInit() {    
    this.moduleList = this.authService.getModules();
    if (this.router.snapshot.data['moduleId'] === Modules.Accounting)
      this.moduleName = 'Accounting';
    else if (this.router.snapshot.data['moduleId'] === Modules.Hr) this.moduleName = 'Hr';
    else if (this.router.snapshot.data['moduleId'] === Modules.GeneralSettings)
      this.moduleName = 'General Settings';
  }


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

  getProfilePic() {
    return this.userData?.userType == '4'
      ? this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + this.userData.sub
      : 'assets/images/users/pic.jpg';
  }

  cardDrob() {
    if (this.showcard == true) {
      this.showcard = false;
    } else {
      this.showcard = true;
    }
  }
  routeToCart() {}

  navigateto(key: number) {
    console.log(key);

    if (key === Modules.Hr) {
      location.href = '../hr';
    } else if (key === Modules.Accounting) {
      location.href = '../accounting';
    } else if (key === Modules.GeneralSettings) {
      location.href = '../erp';
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.showcard && !this.eRef.nativeElement.contains(event.target)) {
      this.showcard = false;
    }
  }
  openDialog(){
    this.RedirectToConfiguration()
  }
  RedirectToConfiguration() {
    this.ref = this.dialog.open(ModuleListComponent, {
      width: '612px',
      height: '435px',
      header:"Choose App"
    });
  }
  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    private env: EnvironmentService,
    public routerService: RouterService,
    private router: ActivatedRoute,
    private eRef: ElementRef,
    private dialog: DialogService

  ) {
    this.userName = this.authService.getUserName;
    this.languageService.setLang();
    this.userPhoto = this.authService.getUserPhoto;
  }
}

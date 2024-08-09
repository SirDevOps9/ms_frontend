import { Component, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { Observable } from 'rxjs';
import { LanguageService, MenuModule, Modules, RouterService ,breadCrumbHome} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModuleListComponent } from '../../../components/module-list/module-list.component';
import { LayoutService } from '../layout.service';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
})
export class LayoutHeaderComponent {
  userName: string;
  moduleName: string;
  showcard: boolean = false;
  sidebarOpen: boolean = false;
  moduleList: MenuModule[];
  cartItemsCount$: Observable<number>;
  userPhoto: string;
  ref: DynamicDialogRef;

  ngOnInit() {
    this.moduleList = this.layoutService.getModules();
    if (this.router.snapshot.data['moduleId'] === Modules.Accounting)
      this.moduleName = 'Accounting';
    else if (this.router.snapshot.data['moduleId'] === Modules.Hr) this.moduleName = 'Hr';
    else if (this.router.snapshot.data['moduleId'] === Modules.GeneralSettings)
      this.moduleName = 'General Settings';
    else if (this.router.snapshot.data['moduleId'] === Modules.Finance) this.moduleName = 'Finance';
    else if (this.router.snapshot.data['moduleId'] === Modules.Purchase)
      this.moduleName = 'Purchase';
    else if (this.router.snapshot.data['moduleId'] === Modules.Sales) this.moduleName = 'Sales';
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
    } else if (key === Modules.Sales) {
      location.href = '../sales';
    } else if (key === Modules.Finance) {
      location.href = '../finance';
    } else if (key === Modules.Purchase) {
      location.href = '../purchase';
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.showcard && !this.eRef.nativeElement.contains(event.target)) {
      this.showcard = false;
    }
  }

  openDialog() {
    this.ref = this.dialog.open(ModuleListComponent, {
      width: '650px',
      height: '500px',
      header: 'Choose App',
    });
  }
  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
    private layoutService: LayoutService,
    public routerService: RouterService,
    private router: ActivatedRoute,
    private eRef: ElementRef,
    private dialog: DialogService,
    private breadCrumbHome:breadCrumbHome,
    public generalService : GeneralService
  ) {
    this.userName = this.authService.getUserName;
    this.languageService.setLang();
    this.userPhoto = this.authService.getUserPhoto;
    console.log(this.generalService.sendSideBarState.getValue())

    

    
  }
}

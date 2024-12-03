import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { Observable } from 'rxjs';
import {
  Cultures,
  LanguageService,
  MenuModule,
  Modules,
  RouterService,
  StorageKeys,
  StorageService,
  breadCrumbHome,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModuleListComponent } from '../../../components/module-list/module-list.component';
import { LayoutService } from '../layout.service';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyTypes } from '../../sequence/models/companyTypes';
import { BranchInUserInfo, CompanyInUserInfo } from '../../sequence/models/company-dto';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
})
export class LayoutHeaderComponent implements OnInit, AfterViewInit {
  @Output() language = new EventEmitter();
  coBrForm: FormGroup;
  currentLang: Cultures;
  userName: string;
  moduleName: string;
  showcard: boolean = false;
  sidebarOpen: boolean = false;
  moduleList: MenuModule[];
  cartItemsCount$: Observable<number>;
  userPhoto: string;
  ref: DynamicDialogRef;
  userEmail: string;
  branchList: BranchInUserInfo[] = [];
  companyList: CompanyInUserInfo[] = [];

  _fb = inject(FormBuilder);
  localstoarage = inject(StorageService);
  companyDataFetched: boolean = false;

  ngOnInit() {
    this.moduleList = this.layoutService.getModules();
    this.currentLang = this.languageService.getLang();
    if (this.router.snapshot.data['moduleId'] === Modules.Accounting)
      this.moduleName = 'Accounting';
    else if (this.router.snapshot.data['moduleId'] === Modules.Hr) this.moduleName = 'Hr';
    else if (this.router.snapshot.data['moduleId'] === Modules.GeneralSettings)
      this.moduleName = 'General Settings';
    else if (this.router.snapshot.data['moduleId'] === Modules.Finance) this.moduleName = 'Finance';
    else if (this.router.snapshot.data['moduleId'] === Modules.Purchase)
      this.moduleName = 'Purchase';
    else if (this.router.snapshot.data['moduleId'] === Modules.Sales) this.moduleName = 'Sales';
    const userInf = this.localstoarage.getItem('currentUserInfo');
    if (!userInf || !this.coBrForm.get('companyId')?.value) {
      this.GetCurrentUserInfoApi();
    }
    this.patchUserInfo();
  }

  patchUserInfo() {
    const userInf = this.localstoarage.getItem(StorageKeys.USER_INFO);
    this.companyList = userInf?.companies;
    let dCompany = userInf?.companies?.find((x: any) => x.companyType == CompanyTypes.Holding);
    this.branchList = dCompany?.branches;

    let dBranch = dCompany?.branches?.find((x: any) => x.isDefault == true);
    this.coBrForm.patchValue({
      companyId: dCompany?.id,
      branchId: dBranch?.id,
    });
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
    this.language.emit(this.languageService.getLang());
    this.currentLang = this.languageService.getLang();
    location.reload();
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
    } else if (key === Modules.inventory) {
      location.href = '../inventory';
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
      width: '950px',
      height: '550px',
      // header: 'Choose App',
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
    private breadCrumbHome: breadCrumbHome,
    public generalService: GeneralService
  ) {
    this.userName = this.authService.getUserName;
    this.languageService.setLang();
    this.userPhoto = this.authService.getUserPhoto;
    this.userEmail = this.authService.getUserEmail;
    this.initForm();
  }
  ngAfterViewInit(): void {}
  initForm() {
    this.coBrForm = this._fb.group({
      companyId: [],
      branchId: [],
    });
  }

  GetCurrentUserInfoApi() {
    this.layoutService.GetCurrentUserInfo();
    this.layoutService.currentUserInfo.subscribe((res) => {
      this.localstoarage.setItem(StorageKeys.USER_INFO, res);
      let dCompany = res?.companies?.find((x: any) => x?.companyType == CompanyTypes.Holding);
      let currencies = {
        currencyId: dCompany?.currencyId,
        currencyName: dCompany?.currencyName,
      };
      this.localstoarage.setItem(StorageKeys.CURRENCEY_OBJ, currencies);

      if (res) {
        this.companyList = res.companies;

        this.patchUserInfo();
      }
    });
  }
}

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
  branchList: { id: string; name: string; isDefault: boolean }[] = [];
  companyList: { id: string; name: string; code: string; companyType: string }[] = [];

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
    const companies = this.localstoarage.getItem(StorageKeys.COMPANIES_LIST);
    if (!companies) {
      this.getCompany();
    }
    this.setDefaultCompany();
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
    const storedCompanyId = this.localstoarage.getItem(StorageKeys.DEFAULT_COMPANY);
    const storedBranchId = this.localstoarage.getItem(StorageKeys.DEFAULT_BRANCHE);
    this.coBrForm = this._fb.group({
      companyId: storedCompanyId || null,
      branchId: storedBranchId || null,
    });
  }
  setDefaultCompany() {
    const companies = this.localstoarage.getItem(StorageKeys.COMPANIES_LIST);
    const storedCompanyId = this.localstoarage.getItem(StorageKeys.DEFAULT_COMPANY);
    const storedBranchId = this.localstoarage.getItem(StorageKeys.DEFAULT_BRANCHE);

    this.companyList = companies;
    let matchedCompany = companies?.filter(
      (x: { id: string; name: string; code: string; companyType: string }) =>
        x.id === storedCompanyId.id
    );

    this.coBrForm.get('companyId')?.setValue(matchedCompany[0]?.id);

    this.setDefaultBranch(storedBranchId?.id);
  }
  setDefaultBranch(id: string) {
    const branches = this.localstoarage.getItem(StorageKeys.BRANCHES_LIST);
    this.branchList = branches;
    if (branches) {
      let matchedBranch = branches?.filter(
        (x: { id: string; name: string; isDefault: boolean }) => x.id === id
      );

      this.coBrForm.get('branchId')?.setValue(matchedBranch[0]?.id);
    }
  }

  getCompany() {
    this.layoutService.GetFirstCompany();
    this.layoutService.GetFirstCompanyDropdown$.subscribe((res) => {
      this.localstoarage.setItem(StorageKeys.COMPANIES_LIST, res);
      if (res && res.length > 0) {
        this.companyList = res;
        const holdingCompany = res.find((x) => x.companyType === CompanyTypes.Holding);
        if (holdingCompany) {
          this.localstoarage.setItem(StorageKeys.DEFAULT_COMPANY, holdingCompany);
          this.getBranch(holdingCompany.id);
          this.coBrForm.get('companyId')?.setValue(holdingCompany.id);
        }
      }
    });
  }
  getBranch(id: string) {
    this.layoutService.branchesDropDown(id);
    this.layoutService.branceDropDown$.subscribe((res) => {
      if (res) {
        this.branchList = res;
        let matchedBranch = res?.filter(
          (x: { id: string; name: string; isDefault: boolean }) => x.isDefault === true
        );

        this.coBrForm.get('branchId')?.setValue(matchedBranch[0]?.id);

        this.localstoarage.setItem(StorageKeys.BRANCHES_LIST, res);

        const filtered = res.find((x) => x.isDefault === true);
        if (filtered) {
          this.localstoarage.setItem(StorageKeys.DEFAULT_BRANCHE, filtered);
        } else {
          let otherBranch = res.find((x) => x.isDefault === false);
          this.localstoarage.setItem(StorageKeys.DEFAULT_BRANCHE, otherBranch);
        }
      } else {
        return;
      }
    });
  }
}

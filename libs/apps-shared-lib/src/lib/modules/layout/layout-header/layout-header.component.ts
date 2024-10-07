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
  branchList: { id: string; name: string; isDefault: boolean }[];
  companyList: { id: string; name: string; companyType: string }[];

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
    this.setDefaulatCompany();

    // setTimeout(()=>{
    //   this.setDefaulatCompany();
    // },500)
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
    const storedCompanyId = this.localstoarage.getItem('defaultCompany');
    const storedBranchId = this.localstoarage.getItem('defaultBranch');
    this.coBrForm = this._fb.group({
      companyId: storedCompanyId || null,
      branchId: storedBranchId || null,
    });
    // this.setDefaultBranch(storedCompanyId);

    // this.coBrForm.get('companyId')?.valueChanges.subscribe((companyId) => {
    //   if (!companyId) return;
    //   this.localstoarage.deleteItem('defaultCompany');
    //   this.localstoarage.setItem('defaultCompany', companyId);
    //   this.setDefaultBranch(companyId);
    // });
  }
  setDefaulatCompany() {
    const storedCompanyId = this.localstoarage.getItem('defaultCompany');

    // this.layoutService.companiesDropDown();
    // this.layoutService.companyListDropDown$.subscribe((res) => {
    //   this.companyList = res;
    //   if (res.some((x) => x.id === storedCompanyId)) {
    //     let matchedBranch = res.filter((x) => x.id === storedCompanyId)[0]?.id;

    //     this.coBrForm.get('companyId')?.setValue(matchedBranch);

    //   }
    // });

    const companies = this.localstoarage.getItem('companies');
    this.companyList = companies;
    if (companies?.some((x: {id:string , name : string,companyType : string}) => x.id === storedCompanyId)) {
    let matchedBranch = companies?.filter(
      (x: { id: string; name: string; companyType: string }) => x.id === storedCompanyId
    )[0]?.id;

    this.coBrForm.get('companyId')?.setValue(matchedBranch);

    }
    this.setDefaultBranch(storedCompanyId);
  }
  setDefaultBranch(id: string) {
    const storedBranchId = this.localstoarage.getItem('defaultBranch');

    // if (id) {
    //   this.layoutService.branchesDropDown(id);
    //   this.layoutService.branceDropDown$.subscribe((res) => {
    //     const storedBranchId = this.localstoarage.getItem('defaultBranch');

    //     this.branchList = res;
    //     if (res.some((x) => x.id === storedBranchId)) {
    //       let matchedBranch = res.filter((x) => x.id === storedBranchId)[0]?.id;

    //       this.coBrForm.get('branchId')?.setValue(matchedBranch);

    //     }else{

    //       this.coBrForm.get('branchId')?.valueChanges.subscribe((branchId) => {
    //         if (!branchId) return;
    //         this.localstoarage.deleteItem('defaultBranch');
    //         this.localstoarage.setItem('defaultBranch', branchId);
    //       });

    //     }
    //   });
    // }
    const branches = this.localstoarage.getItem('branches');
    this.branchList = branches;
    if (id) {
      if (branches?.some((x:  {id:string , name : string,isDefault : boolean}) => x.id === storedBranchId)) {
      let matchedBranch = branches?.filter(
        (x: { id: string; name: string; isDefault: boolean }) => x.id === storedBranchId
      )[0]?.id;

      this.coBrForm.get('branchId')?.setValue(matchedBranch);

      }
    }
  }

  
}
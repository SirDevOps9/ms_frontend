import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LayoutService } from 'apps-shared-lib';
import { LayoutProxy } from 'libs/apps-shared-lib/src/lib/modules/layout/layout.proxy';
import { CompanyTypes } from 'libs/apps-shared-lib/src/lib/modules/sequence/models/companyTypes';
import { AuthService } from 'microtec-auth-lib';
import { RouteParams, RouterService, StorageService } from 'shared-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit, AfterViewInit {
  loginResponse: any;

  ngOnInit() {
    let loginKey = this.routerservice.getRouteParams(RouteParams.LOGINKEY);
    let state = this.routerservice.getRouteParams(RouteParams.STATE);
    this.authService.collectToken(loginKey, state);

    setTimeout(() => {
      this.setDefaulatCompany();
    }, 500);
  }

  constructor(
    private authService: AuthService,
    private localstoarage: StorageService,
    private layoutService: LayoutService,
    private proxyService: LayoutProxy,
    private routerservice: RouterService
  ) {}
  ngAfterViewInit(): void {}

  setDefaulatCompany() {
    this.layoutService.companiesDropDown();
    this.layoutService.companyListDropDown$.subscribe((res) => {
      this.localstoarage.setItem('companies',res)
      
      if (res && res.length > 0) {
        const holdingCompany = res.find((x) => x.companyType === CompanyTypes.Holding);

        if (holdingCompany) {
          this.localstoarage.setItem('defaultCompany', holdingCompany.id);
          this.setDefaultBranch(holdingCompany.id);
        } else {
          const subsidiaryCompany = res.find((x) => x.companyType === CompanyTypes.Subsidiary);
          if (subsidiaryCompany) {
            this.localstoarage.setItem('defaultCompany', subsidiaryCompany.id);
            this.setDefaultBranch(subsidiaryCompany.id);
          } else {
            const type_0_Company = res.find((x) => x.companyType === '0');
            if (type_0_Company) {
              this.localstoarage.setItem('defaultCompany', type_0_Company.id);
              this.setDefaultBranch(type_0_Company.id);
            }
          }
        }
      }
    });
  }
  setDefaultBranch(id: string) {
    if (id) {
      this.layoutService.branchesDropDown(id);
      this.layoutService.branceDropDown$.subscribe((res) => {
        if (res) {
          this.localstoarage.setItem('branches',res)

          const filtered = res.find((x) => x.isDefault === true)?.id;
          if (filtered) {
            this.localstoarage.setItem('defaultBranch', filtered);
          } else {
            let otherBranch = res.find((x) => x.isDefault === false)?.id;
            this.localstoarage.setItem('defaultBranch', otherBranch);
          }
        } else {
          return;
        }
      });
    }
  }
}

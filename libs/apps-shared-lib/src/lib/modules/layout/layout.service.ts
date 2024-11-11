import { Injectable } from '@angular/core';
import { SideMenuModel, StorageKeys, MenuModule, StorageService } from 'shared-lib';
import { LayoutProxy } from './layout.proxy';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  sideMenuItems = new BehaviorSubject<SideMenuModel[] | undefined>(undefined);
  modulItems = new BehaviorSubject<MenuModule[] | undefined>(undefined);


  saveSideMenu(menuItems: SideMenuModel[]) {
    const distinctModules = menuItems
      .filter(
        (value, index, self) =>
          self.findIndex(
            (item) => item.moduleId === value.moduleId && item.module === value.module
          ) === index
      )
      .map(({ moduleId, module, moduleLogo }) => ({ moduleId, module, moduleLogo }));

    this.localStorageService.setItem(StorageKeys.MODULES, distinctModules);
    this.localStorageService.setItem(StorageKeys.SIDEMENU, menuItems);
    this.modulItems.next(distinctModules);
  }

  getModules() {
    let item = this.localStorageService.getItem(StorageKeys.MODULES);
    let menuModules = item! as MenuModule[];
    return menuModules;
  }

  getSideMenu() {
    let item = this.localStorageService.getItem(StorageKeys.SIDEMENU);
    if (!item) {
      this.layoutProxy.loadSideMenu().subscribe((sideMenuRes) => {
        this.saveSideMenu(sideMenuRes);
        this.sideMenuItems.next(sideMenuRes);
      });
    } else {
      let sidemenu = item! as SideMenuModel[];
      this.sideMenuItems.next(sidemenu);
    }
  }

  constructor(private localStorageService: StorageService, private layoutProxy: LayoutProxy) {}

  public branceDropDown = new BehaviorSubject<{id:string , name : string,isDefault : boolean}[]>([]);
  public branceDropDown$ = this.branceDropDown.asObservable();
  public companyListDropDown = new BehaviorSubject<{id:string , name : string,companyType : string}[]>([]);
  public companyListDropDown$ = this.companyListDropDown.asObservable();
  public GetFirstCompanyDropdown = new BehaviorSubject<{ id: string, name: string,code : string, companyType: string }[]>([]);
  public GetFirstCompanyDropdown$ = this.GetFirstCompanyDropdown.asObservable();

  companiesDropDown() {
    this.layoutProxy.companiesDropDown().subscribe({
      next: (res) => {
        this.companyListDropDown.next(res);
        
      },
      error:(err: any)=>{
        return
      }
    });
  }
  GetFirstCompany() {
    this.layoutProxy.GetFirstCompany().subscribe({
      next: (res) => {
        this.GetFirstCompanyDropdown.next(res);
        
      },
      error:(err: any)=>{
        return
      }
    });
  }
  branchesDropDown(id: string) {

    this.layoutProxy.branchesDropDown(id).subscribe({
      next: (res) => {
        this.branceDropDown.next(res);
        
      },
      error:(err: any)=>{
        return
      }
    });
  }

}

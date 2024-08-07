import { Injectable } from '@angular/core';
import { SideMenuModel, StorageKeys, MenuModule, StorageService } from 'shared-lib';
import { LayoutProxy } from './layout.proxy';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  sideMenuItems = new BehaviorSubject<SideMenuModel[] | undefined>(undefined);

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
}

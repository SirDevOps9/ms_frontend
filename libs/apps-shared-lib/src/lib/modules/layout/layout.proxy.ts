import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService, HttpService, SideMenuModel } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class LayoutProxy {
  constructor(private baseService: HttpService, private environmentService: EnvironmentService) {}

  loadSideMenu(): Observable<SideMenuModel[]> {
    return this.baseService.getFullUrl<SideMenuModel[]>(
      `${this.environmentService.BusinessOwnerUrl}/ErpMenu/GetUserMenus`
    );
  }
}

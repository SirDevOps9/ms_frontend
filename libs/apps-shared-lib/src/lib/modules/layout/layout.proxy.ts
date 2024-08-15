import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, SideMenuModel } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class LayoutProxy {
  constructor(private baseService: HttpService) {}

  loadSideMenu(): Observable<SideMenuModel[]> {
    return this.baseService.get<SideMenuModel[]>(`SideMenu`);
  }
}

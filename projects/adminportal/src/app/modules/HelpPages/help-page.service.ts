import { inject, Injectable } from '@angular/core';
import { HelpPageProxyService } from './help-page-proxy.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddHelpPage, HelpPagesList } from './models/heloPage';
import {
  LanguageService,
  PageInfo,
  PageInfoResult,
  RouterService,
  ToasterService,
} from 'shared-lib';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HelpPageService {
  private _proxyService = inject(HelpPageProxyService);
  private toasterService = inject(ToasterService);
  private languageService = inject(LanguageService);
  private routerService = inject(RouterService);

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  public helpsPageList = new BehaviorSubject<HelpPagesList[]>([]);
  public helpPageObj = new BehaviorSubject<AddHelpPage>({} as AddHelpPage);
  public helpsPageList$ = this.helpsPageList.asObservable();
  public helpPageObj$ = this.helpPageObj.asObservable();

  getHelpPagesList(quieries: string, pageInfo: PageInfo) {
    return this._proxyService.getAllHelpsPages(quieries, pageInfo).subscribe({
      next: (res: any) => {
        this.helpsPageList.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  sendHelpPage(obj: AddHelpPage) {
    this._proxyService.addHelpPage(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('Createed'),
        this.languageService.transalte('Data Saved Successfully ')
      );
      this.routerService.navigateTo('/help-pages');
    });
  }

  updateHelpPage(id: number, obj: AddHelpPage) {
    return this._proxyService.updateHelpPage(id, obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('Updated'),
        this.languageService.transalte('Data Updated Successfully ')
      );
      this.routerService.navigateTo('/help-pages');
    });
  }
  getPageById(id: number) {
    this._proxyService.getPageById(id).subscribe((res) => {
      if (res) {
        this.helpPageObj.next(res);
      }
    });
  }

  showConfirm(): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  publishChangeById(id: number) {
    this._proxyService.publishChangeById(id).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('Help page successfully')
        );
        if (!res) this.getHelpPagesList('', new PageInfo());
      },
      complete: () => {},
    });
  }
}

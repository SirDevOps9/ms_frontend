import { inject, Injectable } from '@angular/core';
import { HelpPageProxyService } from './help-page-proxy.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddHelpPage, HelpPagesList } from './models/heloPage';
import { LanguageService, PageInfo, PageInfoResult, ToasterService } from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class HelpPageService {

  private _proxyService= inject(HelpPageProxyService)
  private toasterService= inject(ToasterService)
  private languageService= inject(LanguageService)

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  public helpsPageList = new BehaviorSubject<HelpPagesList[]>([]);
  public addHelpPage = new BehaviorSubject<AddHelpPage>({} as AddHelpPage);
  public updateHlpPage = new BehaviorSubject<AddHelpPage>({} as AddHelpPage);
  public helpPageObj = new BehaviorSubject<AddHelpPage>({} as AddHelpPage);
  public helpsPageList$ = this.helpsPageList.asObservable();
  public addHelpPage$ = this.addHelpPage.asObservable();
  public updateHlpPage$ = this.updateHlpPage.asObservable();
  public helpPageObj$ = this.helpPageObj.asObservable();


  getHelpPagesList(quieries: string, pageInfo: PageInfo) {

    return this._proxyService.getAllHelpsPages(quieries, pageInfo).subscribe({
      next: (res :any) => {
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
      this.addHelpPage.next(res);
    });
  }

  updateHelpPage(id: number ,obj: AddHelpPage) {
    return this._proxyService.updateHelpPage(id , obj).subscribe((res) => {
      // if (res) {       

        this.updateHlpPage.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('Updated'),
          this.languageService.transalte('Data Updated Successfully ')
        );
      });
  }
  getPageById(id: number) {
    this._proxyService.getPageById(id).subscribe((res) => {
      if (res) {
        this.helpPageObj.next(res);
      }
    });
  }

}

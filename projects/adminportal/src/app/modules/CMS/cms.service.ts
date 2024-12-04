import { inject, Injectable } from '@angular/core';
import { CMSProxyService } from './cms-proxy.service';
import { BehaviorSubject } from 'rxjs';
import { ToasterService, LanguageService, RouterService, PageInfoResult,PageInfo } from 'shared-lib';
import { AddCMS, CMSList } from './models/cms';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CMSService {
  constructor(
    private proxyService: CMSProxyService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    public routerService: RouterService
  ) {}

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  public helpsPageList = new BehaviorSubject<CMSList[]>([]);
  public helpPageObj = new BehaviorSubject<AddCMS>({} as AddCMS);
  public helpsPageList$ = this.helpsPageList.asObservable();
  public helpPageObj$ = this.helpPageObj.asObservable();

  getCMSList(quieries: string, pageInfo: PageInfo) {
    return this.proxyService.getAllCMS(quieries, pageInfo).subscribe({
      next: (res: any) => {
        this.helpsPageList.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  sendCMS(obj: AddCMS) {
    this.proxyService.addCMS(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('Createed'),
        this.languageService.transalte('Data Saved Successfully ')
      );
      this.routerService.navigateTo('/help-cms');
    });
  }

  updateCMS(id: number, obj: AddCMS) {
    return this.proxyService.updateCMS(id, obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('Updated'),
        this.languageService.transalte('Data Updated Successfully ')
      );
      this.routerService.navigateTo('/help-cms');
    });
  }
  getCMSById(id: number) {
    this.proxyService.getCMSById(id).subscribe((res) => {
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
    this.proxyService.publishChangeById(id).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('CMS successfully')
        );
        if (!res) this.getCMSList('', new PageInfo());
      },
      complete: () => {},
    });
  }
  
  delete(id: number) {
    this.proxyService.delete(id).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('CMS successfully')
        );
      },
      complete: () => {this.getCMSList('', new PageInfo())},
    });
  }

}

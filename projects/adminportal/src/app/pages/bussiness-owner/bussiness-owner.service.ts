import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BussinessOwnerProxyService } from './bussiness-owner-proxy.service';
import { AddBussinesOwner, AppsInfo, BussinessOwner, CompanyInfo, LicenceInfo, SubDomainInfo, bussinesOwnerDetails, userData } from './models';
import { LanguageService, LoaderService, PageInfo, PaginationVm, RouterService, ToasterService } from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class BussinessOwnerService {

  constructor(
    private bussinessOwnerProxy : BussinessOwnerProxyService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,
  ) { }

  getBussinessOwnerList(pageInfo: PageInfo , quieries?:string) : Observable<PaginationVm<BussinessOwner>> {
   return this.bussinessOwnerProxy.getAllPaginated(pageInfo , quieries)
  }
  getBussinessGetBusinessOwnerById(id : string) : Observable<bussinesOwnerDetails> {
   return this.bussinessOwnerProxy.getBussinessGetBusinessOwnerById(id )
  }
  getCompanyInfoById(pageInfo: PageInfo ,id : string ) : Observable<PaginationVm<CompanyInfo>>  {
    return this.bussinessOwnerProxy.getCompanyInfoById(pageInfo ,id )
  }
  getLicenseInfoById(pageInfo: PageInfo ,id : string ) : Observable<PaginationVm<LicenceInfo>>  {
    return this.bussinessOwnerProxy.getLicenseInfoById(pageInfo ,id )
  }

  getSubDomainById(id:string): Observable<SubDomainInfo> {
    return this.bussinessOwnerProxy.getSubDomainById(id)
  }

  getUsersInfo(pageInfo: PageInfo , id : string) : Observable<PaginationVm<userData>>{
    return this.bussinessOwnerProxy.getUserDta(pageInfo ,id )

  }

  getAppsInfo(pageInfo: PageInfo , id : string) : Observable<PaginationVm<AppsInfo>>{
    return this.bussinessOwnerProxy.getAppsInfo(pageInfo ,id )

  }
  getCountriesLookup() : Observable<any>{
    return this.bussinessOwnerProxy.CountriesLookup()

  }
  getCurrenciesLookup() : Observable<any>{
    return this.bussinessOwnerProxy.CurrenciesLookup()

  }
  getApps() : Observable<any>{
    return this.bussinessOwnerProxy.Apps()

  }
  addBussinesOwner(obj: AddBussinesOwner) {
    this.loaderService.show();

    this.bussinessOwnerProxy.AddBussinesOwner(obj).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('Operation completed successfully.')
        );
        this.loaderService.hide();

         this.router.navigateTo('bussiness-owners');
      },
      error: (err: any) => {
        this.loaderService.hide();
      },
    });
  }

 
}

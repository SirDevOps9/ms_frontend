import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  AddDomainSpaceDto,
  ResponseSubdomainDto,
  SubscriptionDto,
  TenantLicenseDto,
} from './models';

import { LanguageService, LoaderService, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddDomainSpaceComponent } from './components/add-domain-space/add-domain-space.component';
import { SubscriptionProxy } from './subscription.proxy';
import { subscriptionDetailsDto } from './models/subscriptionDetailsDto';
import { ResponseSubdomainListDto } from './models/responseSubdomainListDto';
@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
// #########workflow###########
public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
public workwlowList = new BehaviorSubject<any>({} as any);
public statusDropDownList = new BehaviorSubject<{id:number , name : string}[]>({} as {id:number , name : string}[]);
public workflowObjByID = new BehaviorSubject<any>({} as any);
workwlowList$ = this.workwlowList.asObservable()
workflowObjByID$ = this.workflowObjByID.asObservable()
statusDropDownList$ = this.statusDropDownList.asObservable()

// #########workflow###########


  
  private subscriptionDataSource = new BehaviorSubject<SubscriptionDto[]>([]);
  public subscriptions = this.subscriptionDataSource.asObservable();

  private subdomainsDataSource = new BehaviorSubject<ResponseSubdomainListDto[] | undefined>(
    undefined
  );
  public subdomains = this.subdomainsDataSource.asObservable();

  private SubscriptionDetailsDataSource = new BehaviorSubject<subscriptionDetailsDto[]>([]);
  public SubscriptionDetails = this.SubscriptionDetailsDataSource.asObservable();

  loadSubdomains() {
    this.subscriptionProxy.getAllMySubdomains().subscribe((response) => {
      this.subdomainsDataSource.next(response);
    });
  }

  getSubscriptionDetails(id: string) {
    this.subscriptionProxy.getUserSubscriptionsDetail(id).subscribe((response) => {
      this.SubscriptionDetailsDataSource.next(response);
    });
  }

  checkSubdomian(subdomain: string) {
    return this.subscriptionProxy.checkSubdomain(subdomain);
  }

  openSubdomainModal(ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(AddDomainSpaceComponent, {
      width: '600px',
      height: '600px',
    });
    ref.onClose.subscribe();
  }
  addSubdomain(subdomain: AddDomainSpaceDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.subscriptionProxy.addSubdomain(subdomain).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Subscription.Subdomain.Success'),
          this.languageService.transalte('Subscription.Subdomain.SubdomainAddedSuccessfully')
        );
        this.loaderService.hide();

        dialogRef.close(res);

        let updatedList: ResponseSubdomainListDto[] = [];

        if (this.subdomainsDataSource.value)
          updatedList = [...this.subdomainsDataSource.value, res];
        else updatedList.push(res);

        this.subdomainsDataSource.next(updatedList);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }

  getSubdomainById(subdomainId: string): Observable<ResponseSubdomainDto> {
    return this.subscriptionProxy.getSubdomainById(subdomainId);
  }

  getTenantLicense(subdomainId: string): Observable<TenantLicenseDto[]> {
    return this.subscriptionProxy.getTenantLicense(subdomainId);
  }

  // workflow
  getWorkFlows(quieries: string, pageInfo: PageInfo)  {
    this.subscriptionProxy.getWorkFlows(quieries, pageInfo).subscribe((response) => {
     this.workwlowList.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  }
  // add 
  addWorkflow(addTagDto: any, dialogRef: DynamicDialogRef) {
    this.subscriptionProxy.addWorkflow(addTagDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.success'),
          this.languageService.transalte('tag.addtag.success')
        );
        dialogRef.close(res);
      },
      error: (err) => {
      },
    });
  }
  // edit 
  editWorkflow(tagDto: any, dialogRef: DynamicDialogRef) {
    this.subscriptionProxy.editWorkflow(tagDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('tag.addtag.success'),
          this.languageService.transalte('tag.addtag.success')
        );
        dialogRef.close();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
// get by id 
  getWorkFlowByID(id : number) {
    this.subscriptionProxy.getWorkFlowByID(id).subscribe(res=>{
      if(res) {
       this.workflowObjByID.next(res)
        
      }
    })
  }

  // status dropdown 
  statusDropDown(workflowId: number) {
    this.subscriptionProxy.statusDropDown(workflowId).subscribe((res) => {
      if (res) {
        this.statusDropDownList.next(res);
      }
    });
  }

  constructor(
    private subscriptionProxy: SubscriptionProxy,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

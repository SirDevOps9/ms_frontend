import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddDomainSpaceDto, ResponsePlanDto, ResponseSubdomainDto, SubscriptionDto } from './models';
import {
  LanguageService,
  LoaderService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddDomainSpaceComponent } from './components/add-domain-space/add-domain-space.component';
import { SubscriptionProxy } from './subscription.proxy';
import { subscriptionDetailsDto } from './models/subscriptionDetailsDto';
import { ResponseSubdomainListDto } from './models/responseSubdomainListDto';
@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private subscriptionDataSource = new BehaviorSubject<SubscriptionDto[]>([]);
  public subscriptions = this.subscriptionDataSource.asObservable();

  private subdomainsDataSource = new BehaviorSubject<ResponseSubdomainListDto[]>([]);
  public subdomains = this.subdomainsDataSource.asObservable();

  private plansDataSource = new BehaviorSubject<ResponsePlanDto[]>([]);
  public plans = this.plansDataSource.asObservable();

  private SubscriptionDetailsDataSource = new BehaviorSubject<subscriptionDetailsDto[]>([]);
  public SubscriptionDetails = this.SubscriptionDetailsDataSource.asObservable();

loadSubdomains(){
  this.subscriptionProxy.getAllMySubdomains().subscribe((response) => {
    this.subdomainsDataSource.next(response);
  });
}

  loadSubscription() {
    this.subscriptionProxy.getAllSubscriptions().subscribe((response) => {
      this.subscriptionDataSource.next(response);
    });
  }

  GetSubscriptionDetails(id :number){
    this.subscriptionProxy.GetUserSubscriptionsDetail(id).subscribe((response) => {
      this.SubscriptionDetailsDataSource.next(response);
    });
  }

   checkSubdomian(subdomain: string) {
     return  this.subscriptionProxy.checkSubdomain(subdomain); 
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
          this.languageService.transalte(
            'Subscription.Subdomain.SubdomainAddedSuccessfully'
          )
        );
        this.loaderService.hide();
        dialogRef.close(res);
        window.location.reload()
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });

  }

  getSubdomainById(subdomainId: number): Observable<ResponseSubdomainDto> {
    return this.subscriptionProxy.getSubdomainById(subdomainId);
  }
  
  constructor(
    private subscriptionProxy: SubscriptionProxy,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

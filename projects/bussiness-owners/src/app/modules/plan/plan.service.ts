import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponsePlanDto, SubscriptionDto } from './models';
import { PlanProxy } from './plan.proxy';
import { LanguageService, LoaderService, RouterService, ToasterService } from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DomainSpaceDto } from './models/domainspacedto';
import { AddDomainSpaceComponent } from './components/add-domain-space/add-domain-space.component';
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private subscriptionDataSource = new BehaviorSubject<SubscriptionDto[]>([]);
  public subscriptions = this.subscriptionDataSource.asObservable();

  private plansDataSource = new BehaviorSubject<ResponsePlanDto[]>([]);
  public plans = this.plansDataSource.asObservable();

  //constructor(private planProxy: PlanProxy) {}

  loadSubscription() {
    this.planProxy.getAllSubscriptions().subscribe((response) => {
      this.subscriptionDataSource.next(response);
    });
  }

  loadPlans() {
    this.planProxy.getAllPlans().subscribe((response) => {
      this.plansDataSource.next(response);
    });
  }


  openSubdomainModal( ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(AddDomainSpaceComponent, {
      width: '600px',
      height: '600px',
    });
    ref.onClose.subscribe();
  }
  addSubdomain(subdomain: DomainSpaceDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.planProxy.addSubdomain(subdomain).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Plan.Subdomain.Success'),
          this.languageService.transalte(
            'Plan.Subdomain.SubdomainAddedSuccessfully'
          )
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  constructor(
    private planProxy: PlanProxy,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

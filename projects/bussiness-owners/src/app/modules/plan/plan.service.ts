import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponsePlanDto, SubscriptionDto } from './models';
import { PlanProxy } from './plan.proxy';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  APIResponse,
  LanguageService,
  LoaderService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { AddSubdomainComponent } from './pages/add-subdomain/add-subdomain.component';
import { AddSubdomainDto } from './models/addsubdomaindto';
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private subscriptionDataSource = new BehaviorSubject<SubscriptionDto[]>([]);
  public subscriptions = this.subscriptionDataSource.asObservable();

  private plansDataSource = new BehaviorSubject<ResponsePlanDto[]>([]);
  public plans = this.plansDataSource.asObservable();


  loadSubscription() {
    this.planProxy.getAllSubscriptions().subscribe((response) => {
      this.subscriptionDataSource.next(response.response);
    });
  }

  loadPlans() {
    this.planProxy.getAllPlans().subscribe((response) => {
      this.plansDataSource.next(response.response);
    });
  }


  openSubdomainModal(Id: string,ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(AddSubdomainComponent, {
      width: '600px',
      height: '600px',
      data: { Id: Id },
    },
    );
    ref.onClose.subscribe();
  
  }
  
  addSubdomain(subdomain: AddSubdomainDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.planProxy.addSubdomain(subdomain).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Plan.Subdomain.Success'),
          this.languageService.transalte('Plan.Subdomain.SubdomainAddedSuccessfully')
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

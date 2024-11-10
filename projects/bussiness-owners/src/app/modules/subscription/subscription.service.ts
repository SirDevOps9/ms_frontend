import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  ActionDto,
  AddDomainSpaceDto,
  Addworkflow,
  ResponseSubdomainDto,
  statusDto,
  SubscriptionDto,
  TenantLicenseDto,
  usersDto,
  workflowDto,
} from './models';

import {
  LanguageService,
  LoaderService,
  PageInfo,
  PageInfoResult,
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
  // #########workflow###########
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public workwlowList = new BehaviorSubject<workflowDto[]>([]);
  public workflowStatusActionsList = new BehaviorSubject<ActionDto[]>([]);
  public workflowObjByID = new BehaviorSubject<any>({} as any);
  public workFlowStatesActions = new BehaviorSubject<any>({} as any);
  public getvariableObj = new BehaviorSubject<{ workflowId: number; name: string; type: string }>(
    {} as { workflowId: number; name: string; type: string }
  );
  public UsersForActions = new BehaviorSubject<usersDto[]>([]);
  public statusListView = new BehaviorSubject<statusDto[]>([]);
  public lookupForVariablesList = new BehaviorSubject<any[]>([]);
  public statusDropDownList = new BehaviorSubject<{ id: number; name: string }[]>(
    {} as { id: number; name: string }[]
  );
  public variablesDropDownList = new BehaviorSubject<any[]>([] as any);
  public addAction = new BehaviorSubject<any>({} as any);
  public addUserForAction = new BehaviorSubject<any>({} as any);
  public editUserForAction = new BehaviorSubject<any>({} as any);
  public updateAction = new BehaviorSubject<any>({} as any);

  workwlowList$ = this.workwlowList.asObservable();
  workflowStatusActionsList$ = this.workflowStatusActionsList.asObservable();
  workflowObjByID$ = this.workflowObjByID.asObservable();
  statusListView$ = this.statusListView.asObservable();
  lookupForVariablesList$ = this.lookupForVariablesList.asObservable();
  statusDropDownList$ = this.statusDropDownList.asObservable();
  addAction$ = this.addAction.asObservable();
  addUserForAction$ = this.addUserForAction.asObservable();
  editUserForAction$ = this.editUserForAction.asObservable();
  updateAction$ = this.updateAction.asObservable();
  workFlowStatesActions$ = this.workFlowStatesActions.asObservable();
  getvariableObj$ = this.getvariableObj.asObservable();
  variablesDropDownList$ = this.variablesDropDownList.asObservable();
  UsersForActions$ = this.UsersForActions.asObservable();

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
  getWorkFlows(quieries: string, pageInfo: PageInfo) {
    this.subscriptionProxy.getWorkFlows(quieries, pageInfo).subscribe((response) => {
      this.workwlowList.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }
  // status dropdown

  getStatusDropDown(workflowId: number, quieries: string, pageInfo: PageInfo) {
    if (!workflowId) {
      return;
    }
    this.subscriptionProxy
      .getStatusDropDown(workflowId, quieries, pageInfo)
      .subscribe((response) => {
        this.statusDropDownList.next(response);
      });
  }
  getWorkFlowsVariables(workflowId: number, quieries: string, pageInfo: PageInfo) {
    this.subscriptionProxy
      .getWorkFlowsVariables(workflowId, quieries, pageInfo)
      .subscribe((response) => {
        this.variablesDropDownList.next(response.result);
      });
  }
  // get Workflow Status Actions
  getWorkflowStatusActions(statusId: number, quieries?: string, pageInfo?: PageInfo) {
    this.subscriptionProxy
      .getWorkflowStatusActions(statusId, quieries, pageInfo)
      .subscribe((response) => {
        this.workflowStatusActionsList.next(response.result);
        this.currentPageInfo.next(response.pageInfoResult);
      });
  }
  // add
  addWorkflow(workflowDto: Addworkflow, dialogRef: DynamicDialogRef) {
    this.subscriptionProxy.addWorkflow(workflowDto).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('workflow.success'),
          this.languageService.transalte('workflow.success')
        );
        dialogRef.close(res);
      },
      error: (err) => {},
    });
  }
  // edit
  editWorkflow(name: Addworkflow) {
    this.subscriptionProxy.editWorkflow(name).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('workflow.success'),
          this.languageService.transalte('workflow.success')
        );
        // dialogRef.close();
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
  // get by id
  getWorkFlowByID(id: number) {
    this.subscriptionProxy.getWorkFlowByID(id).subscribe((res) => {
      if (res) {
        this.workflowObjByID.next(res);
      }
    });
  }
  //  WorkFlow States Actions
  getWorkFlowStatesActionsByID(stateId: number) {
    this.subscriptionProxy.getWorkFlowStatesActionsByID(stateId).subscribe((res) => {
      if (res) {
        this.workFlowStatesActions.next(res);
      }
    });
  }
  //  WorkFlow States Actions
  getVariableByID(id: number) {
    this.subscriptionProxy.getVariableByID(id).subscribe((res) => {
      if (res) {
        this.getvariableObj.next(res);
      }
    });
  }
  // getUsersForActionsByID
  getUsersForActionsByID(actionId: number) {
    this.subscriptionProxy.getUsersForActionsByID(actionId).subscribe((res) => {
      if (res) {
        this.UsersForActions.next(res.result);
      }
    });
  }
  // delete Action
  async deleteAction(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.subscriptionProxy.deleteActions(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('action.success'),
            this.languageService.transalte('action.delete')
          );
          this.loaderService.hide();
          const currentAction = this.workflowStatusActionsList.getValue();
          const updatedAction = currentAction.filter((c) => c.id !== id);
          this.workflowStatusActionsList.next(updatedAction);
        },
      });
    }
  }
  // delete workflow
  async deleteWorkflow(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.subscriptionProxy.deleteWorkflow(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('action.success'),
            this.languageService.transalte('action.delete')
          );
          this.loaderService.hide();
          const currentCostCenter = this.workwlowList.getValue();
          const updatedCostCenter = currentCostCenter.filter((c) => c.id !== id);
          this.workwlowList.next(updatedCostCenter);
        },
      });
    }
  }
  async deleteState(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.subscriptionProxy.deleteState(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('action.success'),
            this.languageService.transalte('action.delete')
          );
          this.loaderService.hide();
          const currenState = this.statusListView.getValue();
          const updatedState = currenState.filter((c) => c.id !== id);
          this.statusListView.next(updatedState);
        },
      });
    }
  }
  // delete user
  async deleteUser(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.subscriptionProxy.deleteUser(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('action.success'),
            this.languageService.transalte('action.delete')
          );
          this.loaderService.hide();
          const currenUsers = this.UsersForActions.getValue();
          const updatedUsers = currenUsers.filter((c) => c.id !== id);
          this.UsersForActions.next(updatedUsers);
        },
      });
    }
  }
  // delete user
  async deleteVariable(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.subscriptionProxy.deleteVariable(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('action.success'),
            this.languageService.transalte('action.delete')
          );
          this.loaderService.hide();
          const currenVars = this.variablesDropDownList.getValue();
          const updatedVars = currenVars.filter((c) => c.id !== id);
          this.variablesDropDownList.next(updatedVars);
        },
      });
    }
  }

  // status dropdown
  statusListViews(workflowId: number) {
    this.subscriptionProxy.statusListViews(workflowId).subscribe((res: any) => {
      if (res) {
        this.statusListView.next(res.result);
      }
    });
  }

  addVariable(
    workflowId: number,
    obj: { name: string; type: string },
    dialogRef: DynamicDialogRef
  ) {
    this.subscriptionProxy.addVariable(workflowId, obj).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('workflow.success'),
          this.languageService.transalte('workflow.success')
        );
        dialogRef.close(res);
      },
      error: (err) => {},
    });
  }
  addStatus(workflowId: number, name: { name: string }, dialogRef: DynamicDialogRef) {
    this.subscriptionProxy.addStatus(workflowId, name).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('workflow.success'),
          this.languageService.transalte('workflow.success')
        );
        dialogRef.close(res);
      },
      error: (err) => {},
    });
  }
  // edit status
  EditStatus(obj: { id: number; name: string }, dialogRef: DynamicDialogRef) {
    this.subscriptionProxy.EditStatus(obj).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('workflow.success'),
          this.languageService.transalte('workflow.success')
        );
        dialogRef.close(res);
      },
      error: (err) => {},
    });
  }
  EditVariables(obj: { id: number; name: string; type: string }, dialogRef: DynamicDialogRef) {
    this.subscriptionProxy.EditVariables(obj).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('workflow.success'),
          this.languageService.transalte('workflow.success')
        );
        dialogRef.close(res);
      },
      error: (err) => {},
    });
  }

  // Add Actions
  addActions(statusId: number, obj: any) {
    this.subscriptionProxy.addActions(statusId, obj).subscribe((res) => {
      this.addAction.next(res);
      this.toasterService.showSuccess(
        this.languageService.transalte('actions.success'),
        this.languageService.transalte('actions.add')
      );
    });
  }
  // Add Actions
  addUserForActions(actionId: number, obj: { userName: string }) {
    this.subscriptionProxy.addUserForActions(actionId, obj).subscribe((res) => {
      this.addUserForAction.next(res);
      this.toasterService.showSuccess(
        this.languageService.transalte('actions.success'),
        this.languageService.transalte('actions.add')
      );
    });
  }
  // edit Actions
  editUserForActions(obj: { id: number; userName: string }) {
    this.subscriptionProxy.editUserForActions(obj).subscribe((res) => {
      this.editUserForAction.next(res);
      this.toasterService.showSuccess(
        this.languageService.transalte('actions.success'),
        this.languageService.transalte('actions.update')
      );
    });
  }
  // Edit Actions
  editActions(obj: any) {
    this.subscriptionProxy.editActions(obj).subscribe((res) => {
      this.updateAction.next(res);
      this.toasterService.showSuccess(
        this.languageService.transalte('actions.success'),
        this.languageService.transalte('actions.add')
      );
    });
  }
  // variables lookupForVariables
  lookupForVariables() {
    this.subscriptionProxy.lookupForVariables().subscribe((res: any) => {
      if (res) {
        this.lookupForVariablesList.next(res[0]);
      }
    });
  }
  constructor(
    private subscriptionProxy: SubscriptionProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}
}

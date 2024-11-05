import { Component, Input, OnInit, output } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, RouterService, PageInfo } from 'shared-lib';
import { SubscriptionService } from '../../../../subscription.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-variables',
  templateUrl: './manage-variables.component.html',
  styleUrl: './manage-variables.component.scss'
})
export class ManageVariablesComponent implements OnInit {

  @Input() workflowId : number
  @Input() statusId : number
  showAddAction = output<boolean>()
  showEditAction = output<boolean>()


sendDataToUpdate =  output<any>()
  ngOnChanges(): void {
this.initworkFlowList();

  }
tableData: any[] = [];
currentPageInfo: PageInfoResult = { totalItems: 0 };
searchTerm: string;
exportData: any[];
exportColumns: any[];

constructor(
  private _subService: SubscriptionService,
  public authService: AuthService,
private _route :ActivatedRoute ,
  private routerService: RouterService

) {
  this.workflowId = Number(this._route.snapshot.paramMap.get('id'))
  
}
ngOnInit(): void {
  this.initworkFlowList()
 
}

initworkFlowList() {
  if(this.workflowId){
  this._subService.getWorkFlowsVariables(this.workflowId,'', new PageInfo());

  this._subService.variablesDropDownList$.subscribe({
    next: (res) => {
      this.tableData = res;
    },
  });
}

  this._subService.currentPageInfo.subscribe((currentPageInfo) => {
    this.currentPageInfo = currentPageInfo;
  });
}


addNew(e: boolean) {
  if (e) {
    this.addAction();
  }
}
onSearchChange() {
  this._subService.getWorkflowStatusActions(this.statusId,this.searchTerm, new PageInfo());

  this._subService.workflowStatusActionsList$.subscribe({
    next: (res) => {
      this.tableData = res;
    },
  });

  this._subService.currentPageInfo.subscribe((currentPageInfo) => {
    this.currentPageInfo = currentPageInfo;
  });

}
onPageChange(pageInfo: PageInfo) {
  this._subService.getWorkflowStatusActions(this.statusId,'', new PageInfo());

  this._subService.workflowStatusActionsList$.subscribe({
    next: (res) => {
      this.tableData = res;
    },
  });
}
addAction() {
  this.showAddAction.emit(true)
}

onEdit(event: any) {
  this.sendDataToUpdate.emit(event)
}
onView(id: number) {
     this.routerService.navigateTo(`/workflow/${id}`);

}
}

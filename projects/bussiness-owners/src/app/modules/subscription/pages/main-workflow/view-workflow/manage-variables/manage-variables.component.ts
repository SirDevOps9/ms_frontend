import { Component, Input, OnInit, output } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, RouterService, PageInfo } from 'shared-lib';
import { SubscriptionService } from '../../../../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { AddVariableComponent } from '../../../../components/workflow-comp/add-variable/add-variable.component';
import { EditVariableComponent } from '../../../../components/workflow-comp/edit-variable/edit-variable.component';

@Component({
  selector: 'app-manage-variables',
  templateUrl: './manage-variables.component.html',
  styleUrl: './manage-variables.component.scss',
})
export class ManageVariablesComponent implements OnInit {
  workflowId: number = 0;
  sendDataToUpdate = output<any>();
  ngOnChanges(): void {
    this.initValriabaleList();
  }
  tableData: any[] = [];
  currentPageInfo: PageInfoResult = { totalItems: 0 };
  searchTerm: string;
  exportData: any[];
  exportColumns: any[];

  constructor(
    private _subService: SubscriptionService,
    public authService: AuthService,
    private _route: ActivatedRoute,
    private routerService: RouterService,
    private dialog: DialogService
  ) {
    this.workflowId = Number(this._route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.initValriabaleList();
  }

  initValriabaleList() {
    if (this.workflowId) {
      this._subService.getWorkFlowsVariables(this.workflowId, '', new PageInfo());

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
      this.addValriables();
    }
  }
  onSearchChange() {
    this._subService.getWorkFlowsVariables(this.workflowId, '', new PageInfo());

    this._subService.variablesDropDownList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this._subService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });

    this._subService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this._subService.getWorkFlowsVariables(this.workflowId, '', pageInfo);

    this._subService.variablesDropDownList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
    this._subService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  addValriables() {
    const ref = this.dialog.open(AddVariableComponent, {
      width: '800px',
      height: '450px',
      data: this.workflowId,
    });
    ref.onClose.subscribe(() => {
      this.initValriabaleList();
    });
  }

  onEdit(obj: number) {
    const ref = this.dialog.open(EditVariableComponent, {
      width: '800px',
      height: '450px',
      data: obj,
    });
    ref.onClose.subscribe(() => {
      this.initValriabaleList();
    });
  }
  onDelete(id: number) {
    this._subService.deleteVariable(id);
  }
}

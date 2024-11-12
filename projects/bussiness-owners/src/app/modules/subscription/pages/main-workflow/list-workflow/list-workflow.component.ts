import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';

import { PageInfoResult, RouterService, PageInfo } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddWorkflowComponent } from '../../../components/workflow-comp/add-workflow/add-workflow.component';
import { workflowDto } from '../../../models';

@Component({
  selector: 'app-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrl: './list-workflow.component.scss',
})
export class ListWorkflowComponent implements OnInit {
  tableData: workflowDto[] = [];
  currentPageInfo: PageInfoResult = { totalItems: 0 };
  searchTerm: string;
  // exportData: IOperationalTagResult[];
  exportColumns: any[];

  constructor(
    private _subService: SubscriptionService,
    public authService: AuthService,
    private dialog: DialogService,
    private routerService: RouterService
  ) {}
  ngOnInit(): void {
    this.initworkFlowList();

    this._subService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  initworkFlowList() {
    this._subService.getWorkFlows('', new PageInfo());

    this._subService.workwlowList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this._subService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  addNew(e: boolean) {
    if (e) {
      this.newWorkflow();
    }
  }
  onSearchChange() {
    this._subService.getWorkFlows(this.searchTerm, new PageInfo());

    this._subService.workwlowList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this._subService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this._subService.getWorkFlows('', pageInfo);

    this._subService.workwlowList$.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  newWorkflow() {
    const dialogRef = this.dialog.open(AddWorkflowComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.onClose.subscribe(() => {
      this.initworkFlowList();
    });
  }

  // exportClick(e?: Event) {
  //   this.exportOperationalData(this.searchTerm);
  // }

  // exportOperationalData(searchTerm: string) {
  //   this.itemService.ExportOperationalTagList(searchTerm);

  //   this.itemService.SendExportOperationalTagList$.subscribe((res) => {
  //     this.exportData = res;
  //   });
  // }
  // onEdit(data: any) {
  //   const dialogRef = this.dialog.open(EditWorkflowComponent, {
  //     width: '500px',
  //     height: '450px',
  //     data: data,
  //   });

  //   dialogRef.onClose.subscribe(() => {
  //     this.initworkFlowList();
  //   });
  // }
  onView(id: number) {
    this.routerService.navigateTo(`/workflow/${id}`);
  }
  onDelete(id: number) {
    this._subService.deleteWorkflow(id);
  }
}

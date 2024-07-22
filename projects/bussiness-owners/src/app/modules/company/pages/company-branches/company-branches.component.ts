import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompanyService } from '../../company.service';
import { BranchDto } from '../../models/branch-dto';
import { lookupDto, RouterService } from 'shared-lib';
@Component({
  selector: 'app-company-branches',
  templateUrl: './company-branches.component.html',
  styleUrl: './company-branches.component.scss',
})
export class CompanyBranchesComponent implements OnInit {
  branches: BranchDto[];
  ref: DynamicDialogRef;
  editMode: boolean = false;
  exportColumns: lookupDto[];
  exportData: BranchDto[];
  tableData : BranchDto[];

  //@Input() companyId: string;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  ngOnInit() {
    this.initBranchData();
  }

  get companyId(): string {
    return this.routerService.currentId;
  }
  initBranchData() {
    this.companyService.loadBranches(this.companyId);
    this.companyService.branches.subscribe((branchList) => {
      this.branches = branchList;
    });
  }
  changed(e: any, id: string) {
    if (e.checked === false) {
      e.changed = true;
    } else {
      e.changed = false;
    }
  }

  addBranch() {
    this.companyService.openBranchModel(this.companyId, this.ref, this.dialog);
  }

  editBranch(branchId: string) {
    this.companyService.openEditBranchModel(branchId, this.ref, this.dialog);
  }

  deleteBranch(branchId: string) {
    this.companyService.deleteBranch(branchId);
  }

  toggle(id: string, isActive: boolean) {
    if (isActive) this.companyService.activateBranch(id);
    else this.companyService.deActivateBranch(id);
  }

  exportBranchesData() {
    this.companyService.exportBranchesData(this.companyId);
    this.companyService.exportsBranchesDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  constructor(
    private dialog: DialogService,
    private companyService: CompanyService,
    private routerService: RouterService
  ) {}
}

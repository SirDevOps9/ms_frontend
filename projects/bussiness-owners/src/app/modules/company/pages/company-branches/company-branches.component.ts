import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompanyService } from '../../company.service';
import { BranchDto } from '../../models/branch-dto';
import { lookupDto, RouterService } from 'shared-lib';
import { ExportBranchesDto } from '../../models';
@Component({
  selector: 'app-company-branches',
  templateUrl: './company-branches.component.html',
  styleUrl: './company-branches.component.scss',
})
export class CompanyBranchesComponent implements OnInit {
  branches: BranchDto[];
  ref: DynamicDialogRef;
  editMode: boolean = false;


  mappedExportData: BranchDto[];

  exportColumns: lookupDto[];
  exportData: ExportBranchesDto[];

  //@Input() companyId: string;

  cols: any[] = [
   
    {
      field: 'Id',
      header: 'code',
    },

    {
      field: 'Name',
      header: 'branchName',
    },
    {
      field: 'Branch Region',
      header: 'branchRegion',
    },
    {
      field: 'Branch City',
      header: 'branchCity',
    },
    {
      field: 'Branch Address',
      header: 'branchAddress',
    },
    {
      field: 'Mobile Number',
      header: 'mobileNumber',
    },
    {
      field: 'Branch Email',
      header: 'branchEmail',
    }
  ];



  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  ngOnInit() {
    this.initBranchData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  get companyId(): string {
    return this.routerService.currentId;
  }

  initBranchData() {
    this.companyService.loadBranches(this.companyId);
    this.companyService.branches.subscribe((branchList) => {
      this.branches = branchList;

      this.mappedExportData = this.branches.map(elem=>{
        let {id , mobileNumberCode, countryCode  , companyId, ...args} = elem
        return args
        
      })
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

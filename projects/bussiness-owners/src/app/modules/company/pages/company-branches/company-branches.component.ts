import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListResponse } from '../../../user/models';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewBranchesComponent } from '../../components/new-branches/new-branches.component';
import { CompanyService } from '../../company.service';
@Component({
  selector: 'app-company-branches',
  templateUrl: './company-branches.component.html',
  styleUrl: './company-branches.component.scss'
})
export class CompanyBranchesComponent implements OnInit {
  branchData: any[];
  ref: DynamicDialogRef;
  ngOnInit() {
    this.branchData=[
      {
        id:"1",
        code:"101",
        Name:"Company 01",
        Region:"Region",
        City:"City",
        Address:"12 st. riyadh Ksa",
        Phone:"002 010 2255441136",
        Email:"abc@abc.com",
        isActive:true,
       
      }
    ]
  }
  changed(e: any, id: string) {
    if (e.checked === false) {
     e.changed=true
    } else {
      e.changed=false
    }
  }
 
  addBranche() {
    this.CompanyService.addBranche(this.ref, this.dialog);
  }
 
  editBranche() {
    this.CompanyService.editBranche(this.ref, this.dialog);
  }
  constructor(
    private dialog: DialogService,
    private CompanyService: CompanyService,

  ){}
}

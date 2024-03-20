import { Component, OnInit, ViewChild } from '@angular/core';
import { UserListResponse } from '../../../user/models';

@Component({
  selector: 'app-company-branches',
  templateUrl: './company-branches.component.html',
  styleUrl: './company-branches.component.scss'
})
export class CompanyBranchesComponent implements OnInit {
  branchData: any[];

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
 
}

import { Component, OnInit } from '@angular/core';
import { BreadCrumbService } from 'shared-lib';

@Component({
  selector: 'app-main-cost-center',
  templateUrl: './main-cost-center.component.html',
  styleUrl: './main-cost-center.component.scss'
})
export class MainCostCenterComponent implements OnInit {
  Viewlist:boolean=false;
  edit:boolean=false;
  view:boolean=false;
  add:boolean=false;
constructor(private breadCrumbService :BreadCrumbService){}
  listView(){
    this.Viewlist=true
  }
  treeView(){
    this.Viewlist=false

  }
  ngOnInit(): void {
    this.breadCrumbService.setArray([
      { label: 'dd' }, 
      { label: 'dd' }, 
      { label: 'd' }, 
      { label: 'd' }, 
      { label: 'd' }
  ])
  }
}

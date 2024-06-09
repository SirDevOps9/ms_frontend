import { Component } from '@angular/core';

@Component({
  selector: 'app-main-cost-center',
  templateUrl: './main-cost-center.component.html',
  styleUrl: './main-cost-center.component.scss'
})
export class MainCostCenterComponent {
  Viewlist:boolean=false;
  edit:boolean=false;
  view:boolean=false;
  add:boolean=false;

  listView(){
    this.Viewlist=true
  }
  treeView(){
    this.Viewlist=false

  }
}

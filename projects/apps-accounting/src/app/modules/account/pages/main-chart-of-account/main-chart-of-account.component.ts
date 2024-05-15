import { Component } from '@angular/core';

@Component({
  selector: 'app-main-chart-of-account',
  templateUrl: './main-chart-of-account.component.html',
  styleUrl: './main-chart-of-account.component.scss'
})
export class MainChartOfAccountComponent {
  Viewlist:boolean=false;
  // toggleView(){
  //   this.listView=!this.listView
  // }
  listView(){
    this.Viewlist=true
  }
  treeView(){
    this.Viewlist=false

  }
}

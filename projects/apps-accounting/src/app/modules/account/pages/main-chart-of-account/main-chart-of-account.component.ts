import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main-chart-of-account',
  templateUrl: './main-chart-of-account.component.html',
  styleUrl: './main-chart-of-account.component.scss'
})
export class MainChartOfAccountComponent {
  Viewlist:boolean=false;
  edit:boolean=false;
  view:boolean=true;
  add:boolean=false;
  //@Output() edit = new EventEmitter<boolean>();
  
  // toggleView(){
  //   this.listView=!this.listView
  // }
  listView(){
    this.Viewlist=true
  }
  treeView(){
    this.Viewlist=false

  }
  editMode(){
    this.edit=true;
    this.view=false;
    this.add=false;
    console.log("edit");
    
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChartOfAccountConfigurationComponent } from '../../../components/chart-of-account-configuration/chart-of-account-configuration.component';
import { BreadCrumbService } from 'shared-lib';

@Component({
  selector: 'app-main-chart-of-account',
  templateUrl: './main-chart-of-account.component.html',
  styleUrl: './main-chart-of-account.component.scss'
})
export class MainChartOfAccountComponent implements OnInit {
  Viewlist:boolean=false;
  edit:boolean=false;
  view:boolean=false;
  add:boolean=false;
  ref: DynamicDialogRef;

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
  changeMode(event:boolean){
    this.edit=!event;
    this.view=!event;
    this.add=event;
  }
  RedirectToConfiguration() {
    this.ref = this.dialog.open(ChartOfAccountConfigurationComponent, {
      width: '647px',
      height: '886px',
    });
  }
  constructor(
    private dialog: DialogService,
    private breadCrumbService :BreadCrumbService

  ){}
  ngOnInit(): void {
    this.breadCrumbService.setArray([
      { label: 'Electronics' }, 
      { label: 'Computer' }, 
      { label: 'Accessories' }, 
      { label: 'Keyboard' }, 
      { label: 'Wireless' }
  ])
  this.breadCrumbService.setRouteHome("/")
  }
    
  
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChartOfAccountConfigurationComponent } from '../../../components/chart-of-account-configuration/chart-of-account-configuration.component';
import { Title } from '@angular/platform-browser';
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'app-main-chart-of-account',
  templateUrl: './main-chart-of-account.component.html',
  styleUrl: './main-chart-of-account.component.scss'
})
export class MainChartOfAccountComponent {
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
      height: '600px',
    });
  }
  constructor(
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
  ){
    this.title.setTitle(this.langService.transalte('ChartOfAccount.Title'));
  }
}

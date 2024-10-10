import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'app-main-item-categories-tree',
  templateUrl: './main-item-categories-tree.component.html',
  styleUrl: './main-item-categories-tree.component.scss'
})
export class MainItemCategoriesTreeComponent {
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
    // this.ref = this.dialog.open(ChartOfAccountConfigurationComponent, {
    //   width: '647px',
    //   height: '600px',
    // });
  }
  constructor(
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
  ){
  }
}

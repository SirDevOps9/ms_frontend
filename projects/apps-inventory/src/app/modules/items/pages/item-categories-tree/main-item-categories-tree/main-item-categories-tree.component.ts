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
    
  }
  changeMode(event:boolean){
    this.edit=!event;
    this.view=!event;
    this.add=event;
  }
  RedirectToConfiguration() {

  }
  constructor(
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
  ){
  }
}

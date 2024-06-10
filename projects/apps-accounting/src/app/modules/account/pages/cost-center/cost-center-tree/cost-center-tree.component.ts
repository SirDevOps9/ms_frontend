import { Component, EventEmitter, Input, OnInit, Output, input, output } from '@angular/core';
import { AccountService } from '../../../account.service';
import { AccountByIdDto, accountTreeList } from '../../../models';
import { Title } from '@angular/platform-browser';
import { LanguageService } from 'shared-lib';
import { ChartOfAccountConfigurationComponent } from '../../../components/chart-of-account-configuration/chart-of-account-configuration.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cost-center-tree',
  templateUrl: './cost-center-tree.component.html',
  styleUrl: './cost-center-tree.component.scss'
})
export class CostCenterTreeComponent implements OnInit {
@Input() edit: boolean;
@Input() view: boolean;
@Input() add: boolean;
parentAddedId: number |undefined ;
account: AccountByIdDto;
@Output() addmode = new EventEmitter<boolean>();
nodes: accountTreeList[];
expanded: boolean = false;
viewWithParent: boolean = false;
newChiled: boolean = false;
showTree: boolean = true;
ref: DynamicDialogRef;
parentAdded: any;
parentEditedId:any
activeNode: any = null;

constructor(
  private accountService: AccountService,
  private title: Title,
  private langService: LanguageService,
  private dialog: DialogService
) {
  this.langService.setLang();

  //console.log('Lang', this.langService.transalte('LoadError'));

  this.title.setTitle('Chart of accounts');
}
ngOnInit() {
  this.GetCostTree();
  // console.log(this.parentAddedId);
}
mapToTreeNodes(data: any[]) {
  data = data.map((item, index) => {
    return {
      hasNoChild: item.hasNoChild,
      id: item.id,
      accountCode: item.accountCode,
      ParentId: item.ParentId,
      LevelId: item.LevelId,
      label: item.name, // Assuming you want to display the English label
      children: item.childrens ? this.mapToTreeNodes(item.childrens) : [],
    };
  });
  return data;
}
addChild(parentNode: any) {
  this.activeNode = parentNode;
  this.parentAdded = parentNode;
  this.newChiled=false
  this.view = false;
  this.edit = false;
  this.add = false;
  this.addmode.emit(true);
  this.parentAddedId = parentNode.id;

  if (!parentNode.children) {
    parentNode.children = [];
  }
  this.add = true;
  // parentNode.children.push({ label: 'New Child', children: [] });
}
newChild() {
  this.activeNode = null;
  this.parentAddedId = undefined;
  this.parentAdded = null;
  this.view = false;
  this.edit = false;
  this.add = false;
  this.addmode.emit(true);
  this.newChiled=true
  this.add = true;
}
getAccountDetails(id: number) {
  this.accountService.getAccountDetails(id);
  this.accountService.AccountViewDetails.subscribe((res) => {
    this.account = res;
    console.log(res , "oooooooooooooo");
    
  });
  if(this.account.parentAccountName===""){
    this.viewWithParent=true
  }else{
    this.viewWithParent=false
  }
}
// toggleNode(node: any) {
//   node.expanded = !node.expanded;
// }
handleTabClick(node: any) {
  this.edit = false;
  this.add = false;
  this.view = false;    
  this.activeNode = node;
  this.parentAddedId = node.id;
  if(this.parentAddedId){
    this.getAccountDetails(this.parentAddedId);
  
  }
  this.view = true;
  //console.log(node);
}
viewMode(event:number){
  setTimeout(() => {
    this.edit = false;
  this.add = false;
  this.view = false;    
  //this.activeNode = node;
  this.parentAddedId = event;
  if(this.parentAddedId){
    this.getAccountDetails(this.parentAddedId);
  
  }
  this.view = true;
  this.GetCostTree()
  }, 1000);
  
}
GetCostTree() {
  // this.accountService.getTreeList().subscribe((res: any) => {
  //   this.nodes = this.mapToTreeNodes(res);
  // });
  this.accountService.GetCostTree().subscribe((res: any) => {
    this.nodes = res;
    console.log(res);
    
  });
}
RedirectToConfiguration() {
  this.ref = this.dialog.open(ChartOfAccountConfigurationComponent, {
    width: '800px',
    height: '700px',
  });
}
handleOperationCompleted(event: any) {
  if(this.parentAdded){
    this.parentAdded.children.push({ label: event.name, id: event.id, children: [] });

  }else{
  this.GetCostTree()
  }
  this.add = false;
  //this.view=true
}
toggelTree() {
  this.showTree = !this.showTree;
}
editAccount(node:any){
  this.edit = false;
  this.add = false;
  this.view = false;
  this.activeNode = node;
  this.parentEditedId = node.id;
  this.edit = true;
  //console.log(node);
  
}
}


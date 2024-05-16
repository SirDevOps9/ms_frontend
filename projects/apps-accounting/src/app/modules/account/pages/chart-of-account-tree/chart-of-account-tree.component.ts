import { Component, Input, OnInit, input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AccountService } from '../../account.service';
import { accountTreeList } from '../../models';
@Component({
  selector: 'app-chart-of-account-tree',
  templateUrl: './chart-of-account-tree.component.html',
  styleUrl: './chart-of-account-tree.component.scss'
})
export class ChartOfAccountTreeComponent implements OnInit {
  @Input() edit:boolean;
  @Input() view:boolean;
  @Input() add:boolean;
  nodes: accountTreeList[];
  expanded:boolean=false;
  // view:boolean=false;
  // add:boolean=false;
  //edit:boolean=false;
  constructor(private accountService: AccountService){}
  ngOnInit() {
    
    //this.view=true
    this.getTreeList()
  }
  mapToTreeNodes(data: any[]) {
    data =data.map(item=>{
     return{
      label: item.nameEn, // Assuming you want to display the English label
      children:item.childrens?this.mapToTreeNodes(item.childrens) : [] 
     }
    }) 
    return data
}
  addChild(parentNode: TreeNode) {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push({ label: 'New Child Node' });
  }
  // toggleNode(node: any) {
  //   node.expanded = !node.expanded;
  // }
  handleTabClick(node:any){
    console.log(node);
    
  }
  getTreeList(){
    this.accountService.getTreeList().subscribe((res:any)=>{
      this.nodes =this.mapToTreeNodes(res)
      
    })
  }

}

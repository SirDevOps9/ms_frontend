import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { AccountByIdDto, accountTreeList } from 'projects/apps-accounting/src/app/modules/account/models';
import { LanguageService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddItemCategory } from '../../../models';

@Component({
  selector: 'app-items-category-tree',
  templateUrl: './items-category-tree.component.html',
  styleUrl: './items-category-tree.component.scss'
})
export class ItemsCategoryTreeComponent implements OnInit {
  @Input() edit: boolean;
  @Input() view: boolean;
  @Input() add: boolean;
  parentAddedId: number | undefined;
  account: AddItemCategory;
  @Output() addmode = new EventEmitter<boolean>();
  nodes: accountTreeList[];
  expanded: boolean = false;
  viewWithParent: boolean = false;
  newChiled: boolean = false;
  showTree: boolean = true;
  ref: DynamicDialogRef;
  parentAdded: any;
  parentEditedId: any;
  test: any;
  activeNode: any = null;
  activeNodeId: number | null = null; // Store the active node ID

  constructor(
    private accountService: AccountService,
    private title: Title,
    private langService: LanguageService,
    private dialog: DialogService,
    private itemsSevice : ItemsService
  ) {
  }
  ngOnInit() {
    this.getTreeList();
    this.itemsSevice.AddItemCategoryLookupObs.subscribe(res=>{
      this.getTreeList();

    })
  }
  mapToTreeNodes(data: any[]) {
    data = data.map((item, index) => {
      return {
        isActive: item.isActive,
        id: item.id,
        hasNoChild: item.hasNoChild,
        isDetailed: item.isDetailed,

        label: item.name ,
        children: item.children ? this.mapToTreeNodes(item.children) : [],
      };
    });
    return data;
  }
  addChild(parentNode: any) {  
    this.activeNode = parentNode;
    this.parentAdded = parentNode;
    this.newChiled = false;
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
    this.newChiled = true;
    this.add = true;
  }
  getItemCategoryById(id: number) {
    this.itemsSevice.getItemCategoryById(id);
    this.itemsSevice.getItemCategoryByIdDataObs.subscribe((res) => {
      this.account = res;
    });
    // if (this.account.parentAccountName === '') {
    //   this.viewWithParent = true;
    // } else {
    //   this.viewWithParent = false;
    // }
  }

  handleTabClick(node: any) {
    this.edit = false;
    this.add = false;
    this.view = false;
    this.activeNode = node;
    this.parentAddedId = node.id;
    if (this.parentAddedId) {
      this.getItemCategoryById(this.parentAddedId);
    }
    this.view = true;
  }
  viewMode(event: number) {
    if (event === -1) {
      this.edit = false;
      this.add = false;
      this.view = false;
      return;
    }
    setTimeout(() => {
      this.edit = false;
      this.add = false;
      this.view = false;
      this.parentAddedId = event;
      if (this.parentAddedId) {
        this.getItemCategoryById(this.parentAddedId);
      }
      this.view = true;
      this.getTreeList();
    }, 1000);
  }

  handleOperationCompleted(event: any) {
//  this.test=event
    
    this.getTreeList();
    // if(event.id){
    //  this.viewMode(event.id)

      //this.expandParents(event)
    // this.setActiveNode(event.id)
      this.test=event.id
      
    // }
    this.add = false;

  }
  toggelTree() {
    this.showTree = !this.showTree;
  }
  editAccount(node: any) {
    this.edit = false;
    this.add = false;
    this.view = false;
    this.activeNode = node;
    this.parentEditedId = node.id;
    this.edit = true;
  }

  getTreeList() {
    const activeNodeId = this.activeNode ? this.activeNode.id : null;
    this.itemsSevice.getItemCategoryTreeList().subscribe((res: any) => {
      this.nodes = this.mapToTreeNodes(res);
      if (activeNodeId) {
        setTimeout(() => {
          this.setActiveNode(activeNodeId);
        }, 100);
      }
    });
  }

  setActiveNode(id: number) {
    const findNode = (nodes: any[]): any => {
      for (let node of nodes) {
        
        if (node.id === id) {
          //  this.test=node

          return node;
        }
         if (node.children) {
          const foundChild = findNode(node.children);
          if (foundChild ) {
            if(node.children.id===id){
              
            }
            
            return foundChild;
          }
        }
      }
      return null;
    };

    const x:any = findNode(this.nodes);
    x.expanded = true;

    if (x.children.length!=0) {
      x.children.forEach((element:any) => {
        if(element.id===this.test){
          this.activeNode=element 
            this.getItemCategoryById(element.id);
          
          this.view = true;
        }else{
          // this.activeNode=x
          // this.getItemCategoryById(x.id);
          
          // this.view = true; 

        }
      });
    }else if(x.children.length[0]){

                this.activeNode=x 

    }


  }

  expandParents(node: any) {
    let parentNode = this.findParentNode(this.nodes, node);
    while (parentNode) {
      parentNode.expanded = true;
      parentNode = this.findParentNode(this.nodes, parentNode);
      
      
    }
    
  }

  findParentNode(nodes: any[], childNode: any): any {
    
    for (let node of nodes) {
      if (node.children.includes(childNode)) {
        
        return node;
      }
      if (node.children) {
        const parent = this.findParentNode(node.children, childNode);
        if (parent) {

          return parent;
        }
      }
    }
    // return null;
  }
  deleteAccount(id: number) {
    const parentNode = this.findParentNodeById(this.nodes, id);
    this.itemsSevice.deleteItemCategory(id);
    this.itemsSevice.itemsCategoryDeletedObs.subscribe((res) => {
      if (res) {
        if (parentNode) {
          this.setActiveNode(parentNode.id);
        }
        this.getTreeList();
      }
    });
  }

  findParentNodeById(nodes: any[], childId: number): any {
    for (let node of nodes) {
      if (node.children && node.children.some((child: any) => child.id === childId)) {
        return node;
      }
      if (node.children) {
        const parent = this.findParentNodeById(node.children, childId);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }
}


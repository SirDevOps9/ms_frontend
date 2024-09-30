import { Component, EventEmitter, Input, OnInit, Output, input, output } from '@angular/core';
import { AccountService } from '../../../account.service';
import { AccountByIdDto, accountTreeList } from '../../../models';
import { Title } from '@angular/platform-browser';
import { LanguageService } from 'shared-lib';
import { ChartOfAccountConfigurationComponent } from '../../../components/chart-of-account-configuration/chart-of-account-configuration.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-chart-of-account-tree',
  templateUrl: './chart-of-account-tree.component.html',
  styleUrl: './chart-of-account-tree.component.scss',
})
export class ChartOfAccountTreeComponent implements OnInit {
  @Input() edit: boolean;
  @Input() view: boolean;
  @Input() add: boolean;
  parentAddedId: number | undefined;
  account: AccountByIdDto;
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
    private dialog: DialogService
  ) {
    this.title.setTitle(this.langService.transalte('ChartOfAccount.Title'));
  }
  ngOnInit() {
    this.getTreeList();
    
  }
  mapToTreeNodes(data: any[]) {
    data = data.map((item, index) => {
      return {
        hasNoChild: item.hasNoChild,
        id: item.id,
        accountCode: item.accountCode,
        ParentId: item.ParentId,
        LevelId: item.LevelId,
        label: item.name + ' - ' + item.accountCode, // Assuming you want to display the English label
        children: item.childrens ? this.mapToTreeNodes(item.childrens) : [],
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
  getAccountDetails(id: number) {
    this.accountService.getAccountDetails(id);
    this.accountService.AccountViewDetails.subscribe((res) => {
      this.account = res;
    });
    if (this.account.parentAccountName === '') {
      this.viewWithParent = true;
    } else {
      this.viewWithParent = false;
    }
  }

  handleTabClick(node: any) {
    this.edit = false;
    this.add = false;
    this.view = false;
    this.activeNode = node;
    this.parentAddedId = node.id;
    if (this.parentAddedId) {
      this.getAccountDetails(this.parentAddedId);
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
        this.getAccountDetails(this.parentAddedId);
      }
      this.view = true;
      this.getTreeList();
    }, 1000);
  }

  handleOperationCompleted(event: any) {
  //  this.test=event
  this.activeNode=event

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
    // console.log(this.activeNode ,"0000");
    
    const activeNodeId = this.activeNode ? this.activeNode.id : null;
    this.accountService.getTreeList().subscribe((res: any) => {
      this.nodes = this.mapToTreeNodes(res);
      if (activeNodeId) {
        setTimeout(() => {
          this.setActiveNode(activeNodeId);
        }, 100);
      }
    });
  }


  setActiveNode(id: number) {
    const findAndExpandNode = (nodes: any[], id: number): any => {
      for (let node of nodes) {
        if (node.id === id) {
          return node; // Found the target node
        }
  
        if (node.children) {
          const foundChild = findAndExpandNode(node.children, id);
          if (foundChild) {
            node.expanded = true;
            return foundChild; 
          }
        }
      }
      return null;
    };
  
    const targetNode: any = findAndExpandNode(this.nodes, id);
  
    if (targetNode) {
      this.activeNode = targetNode; // Set the active node
  
      if (targetNode.children && targetNode.children.length > 0) {
        targetNode.children.forEach((child: any) => {
          if (child.id === this.test) {
            this.activeNode = child;
            this.getAccountDetails(child.id);
            this.view = true;
          }
        });
      } else {
        this.getAccountDetails(targetNode.id);
        this.view = true;
      }
    }
  
    // Logging for debug
    console.log(targetNode, "Activated node");
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
    this.accountService.deleteAccount(id);
    this.accountService.accountdeletedObser.subscribe((res) => {
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


  // expand_Collapse(){
  //   this.expanded = !this.expanded; 
  //   this.nodes.forEach(node => {
  //     this.toggleNode(node, this.expanded); 
  //   });   
  // }

  toggleNode(node: any, expanded: boolean) {
    node.expanded = expanded; 
    if (node.children) {
      node.children.forEach((child: any) => {
        this.toggleNode(child, expanded);
      });
    }
  }

  routeToEditFromView(id : number){
    this.view = false
    this.add = false
    this.parentEditedId = id
    this.edit= true

    
  }

// check if all nodes are expanded
areAllNodesExpanded(): boolean {
  return this.nodes.every((node) => this.isNodeFullyExpanded(node));
}

// function to check if a single node and all its children are expanded
isNodeFullyExpanded(node: any): boolean {
  if (!node.expanded) {
    return false;
  }

  if (node.children) {
    return node.children.every((childNode: any) => this.isNodeFullyExpanded(childNode));
  }

  return true;
}

// When a node is expanded, expand only the clicked node without expanding its children
nodeExpand(event: any) {
  const expandedNode = event.node;
  expandedNode.expanded = true; 
  // console.log('Node expanded:', expandedNode);

  // Check if all nodes are expanded after this node is expanded
  this.expanded = this.areAllNodesExpanded();
}

// When a node is collapsed, collapse only the clicked node without collapsing its children
nodeCollapse(event: any) {
  const collapsedNode = event.node;
  collapsedNode.expanded = false; 
  // console.log('Node collapsed:', collapsedNode);

  // Set expanded to false as not all nodes are expanded
  this.expanded = false;
}

// Function to toggle expansion/collapse for the whole tree
expand_Collapse() {
  this.expanded = !this.expanded;
  this.nodes.forEach((node) => {
    this.setNodeExpandedState(node, this.expanded);
  });
}

setNodeExpandedState(node: any, expanded: boolean) {
  node.expanded = expanded;

  if (expanded && node.children) {
    node.children.forEach((childNode: any) => {
      this.setNodeExpandedState(childNode, expanded);
    });
  }
}
}

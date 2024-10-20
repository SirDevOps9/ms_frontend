import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  input,
  output,
} from '@angular/core';
import { AccountService } from '../../../account.service';
import { AccountByIdDto, accountTreeList, costById } from '../../../models';
import { Title } from '@angular/platform-browser';
import { LanguageService } from 'shared-lib';
import { ChartOfAccountConfigurationComponent } from '../../../components/chart-of-account-configuration/chart-of-account-configuration.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cost-center-tree',
  templateUrl: './cost-center-tree.component.html',
  styleUrl: './cost-center-tree.component.scss',
})
export class CostCenterTreeComponent implements OnInit {
  @Input() edit: boolean;
  @Input() view: boolean;
  @Input() add: boolean;
  parentAddedId: number | undefined;
  account: costById;
  @Output() addmode = new EventEmitter<boolean>();
  nodes: accountTreeList[];
  expanded: boolean;
  viewWithParent: boolean = false;
  newChiled: boolean = false;
  showTree: boolean = true;
  ref: DynamicDialogRef;
  parentAdded: any;
  parentEditedId: any;
  activeNode: any = null;
  parentStatus: boolean;
  test: any;
  activeNodeId: number | null = null; // Store the active node ID

  cdr = inject(ChangeDetectorRef);
  constructor(
    private accountService: AccountService,
    private title: Title,
    private langService: LanguageService,
    private dialog: DialogService
  ) {
    this.title.setTitle(this.langService.transalte('costCenter.costCenter'));
  }
  ngOnInit() {
    this.getCostTree();

    this.expanded = false;
  }
  mapToTreeNodes(data: any[]) {
    data = data.map((item, index) => {
      return {
        id: item.id ?? '',
        code: item.code,
        label: item.label,
        isDetail: item.isDetail,
        parentId: item.parentId,
        isActive: item.isActive,

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
    this.parentStatus = parentNode.isActive;

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
    this.newChiled = true;
    this.add = true;
  }
  getcostById(id: number) {
    this.accountService.getcostById(id);
    this.accountService.selectedCostById.subscribe((res) => {
      this.account = res;
    });
    if (this.account.parentId) {
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
    this.view = true;
    this.activeNode = node;
    this.parentAddedId = node.id;
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

      this.view = true;
      // this.getCostTree();
    }, 1000);
  }
  getCostTree() {
    const activeNodeId = this.activeNode ? this.activeNode.id : null;
    this.accountService.GetCostTree().subscribe((res: any) => {
      this.nodes = this.mapToTreeNodes(res);
      if (activeNodeId) {
        setTimeout(() => {
          this.setActiveNode(activeNodeId);
        }, 100);
      }
    });

    // this.accountService.GetCostTree().subscribe((res: any) => {
    //   this.nodes = res;
    // });
  }
  handleOperationCompleted(event: any) {
    this.activeNode = event;
    this.getCostTree();
    // }
    this.test = event.id;
    this.add = false;
    this.viewMode(event.id);
    //this.view=true
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
  deleteCost(id: number) {
    this.accountService.deleteCostCenter(id);

    this.accountService.costCenterDataObser.subscribe((res) => {
      if (res) {
        this.getCostTree();
        // this.expand_Collapse()
      }
    });
  }

  toggleNode(node: any, expanded: boolean) {
    node.expanded = expanded;
    if (node.children) {
      node.children.forEach((child: any) => {
        this.toggleNode(child, expanded);
      });
    }
  }
  routeToEditFromView(id: number) {
    this.view = false;
    this.add = false;
    this.parentEditedId = id;
    this.edit = true;
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
      if (node.children && node.children.includes(childNode)) {
        return node;
      }
      if (node.children) {
        const parent = this.findParentNode(node.children, childNode);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
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

  getCostDetails(id: number) {
    if (id === undefined || id === null) {
      return;
    }
    this.accountService.getCostDetails(id);
    this.accountService.selectedCostDetails.subscribe((res) => {
      this.account = res;
    });
    if (this.account.name === '') {
      this.viewWithParent = true;
    } else {
      this.viewWithParent = false;
    }
  }

  setActiveNode(id: number) {
    const findAndExpandNode = (nodes: any[], id: number): any => {
      for (let node of nodes) {
        if (node.id === id) {
          return node;
        }

        if (node.children) {
          const foundChild = findAndExpandNode(node.children, id);
          // expand the parent node and  return the found child
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
      this.activeNode = targetNode;

      // Only fetch details if the id is valid
      if (targetNode.id) {
        this.getCostDetails(targetNode.id);
      }

      if (targetNode.children && targetNode.children.length > 0) {
        targetNode.children.forEach((child: any) => {
          if (child.id === this.test) {
            this.activeNode = child;

            if (child.id) {
              this.getCostDetails(child.id);
            }

            this.view = true;
          }
        });
      }
    }
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

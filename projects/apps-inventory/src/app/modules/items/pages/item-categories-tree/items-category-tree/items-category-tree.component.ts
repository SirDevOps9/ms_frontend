import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { accountTreeList } from 'projects/apps-accounting/src/app/modules/account/models';
import { ItemsService } from '../../../items.service';
import { AddItemCategory } from '../../../models';

@Component({
  selector: 'app-items-category-tree',
  templateUrl: './items-category-tree.component.html',
  styleUrl: './items-category-tree.component.scss',
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
  activeNodeId: number | null = null;

  constructor(private itemsSevice: ItemsService) {}
  ngOnInit() {
    this.getTreeList();
  }
  mapToTreeNodes(data: any[]) {
    data = data.map((item, index) => {
      return {
        isActive: item.isActive,
        id: item.id,
        hasNoChild: item.hasNoChild,
        isDetailed: item.isDetailed,

        label: item.name,
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
    this.activeNode = event;
    this.getTreeList();
    this.test = event.id;
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

  }
  deleteAccount(id: number) {
    this.itemsSevice.deleteItemCategory(id);
    this.itemsSevice.itemsCategoryDeletedObs.subscribe((res) => {
      if (res) {
        this.getTreeList();
        // if the deleted node is the active node
        if (this.activeNode && this.activeNode.id === id) {
          this.activeNode = null;
          this.view = false;
        }
          const parentNode = this.findParentNode(this.nodes, id);
  
        if (parentNode) {
          // If the deleted node is a child, keep the parent expanded
          parentNode.expanded = true;
          this.activeNode = parentNode;
          this.getItemCategoryById(parentNode.id); 
          this.view = false;
        } else {
          this.activeNode = null;
          this.view = false;
        }
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
      this.activeNode = targetNode;

      if (targetNode.children && targetNode.children.length > 0) {
        targetNode.children.forEach((child: any) => {
          if (child.id === this.test) {
            this.activeNode = child;
            this.getItemCategoryById(child.id);
            this.view = true;
          }
        });
      } else {
        this.getItemCategoryById(targetNode.id);
        this.view = true;
      }
    }
  }

  areAllNodesExpanded(): boolean {
    return this.nodes.every((node) => this.isNodeFullyExpanded(node));
  }

  isNodeFullyExpanded(node: any): boolean {
    if (!node.expanded) {
      return false;
    }

    if (node.children) {
      return node.children.every((childNode: any) => this.isNodeFullyExpanded(childNode));
    }

    return true;
  }

  nodeExpand(event: any) {
    const expandedNode = event.node;
    expandedNode.expanded = true;

    this.expanded = this.areAllNodesExpanded();
  }

  // When a node is collapsed, collapse only the clicked node without collapsing its children
  nodeCollapse(event: any) {
    const collapsedNode = event.node;
    collapsedNode.expanded = false;
    // Set expanded to false as not all nodes are expanded
    this.expanded = false;
  }

  //  toggle expansion/collapse for the all tree
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

  routeToEditFromView(id: number) {
    this.view = false;
    this.add = false;
    this.parentEditedId = id;
    this.edit = true;
  }
}

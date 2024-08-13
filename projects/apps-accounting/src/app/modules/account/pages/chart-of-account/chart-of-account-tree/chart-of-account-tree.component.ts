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
    console.log(event,"eveeeee");
    console.log(event.id);
    
    this.getTreeList();
    if(event.id){
      this.viewMode(event.id)

      this.expandParents(event)
      this.setActiveNode(event.id)
    }
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
    const findNode = (nodes: any[]): any => {
      for (let node of nodes) {
        if (node.id === id) {
          return node;
        }
        if (node.children) {
          const foundChild = findNode(node.children);
          if (foundChild ) {
            return foundChild;
          }
        }
      }
      return null;
    };
    this.activeNode = findNode(this.nodes);
    if (this.activeNode) {
      this.expandParents(this.activeNode);
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
}

import { Component, Input, OnInit, input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AccountService } from '../../account.service';
import { accountTreeList } from '../../models';
import { Title } from '@angular/platform-browser';
import { LanguageService } from 'shared-lib';
import { ChartOfAccountConfigurationComponent } from '../../components/chart-of-account-configuration/chart-of-account-configuration.component';
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
  nodes: accountTreeList[];
  expanded: boolean = false;
  ref: DynamicDialogRef;

  constructor(
    private accountService: AccountService,
    private title: Title,
    private langService: LanguageService,
    private dialog: DialogService
  ) {
    this.langService.setLang();

    console.log('Lang', this.langService.transalte('LoadError'));

    this.title.setTitle('Chart of accounts');
  }
  ngOnInit() {
    this.getTreeList();
  }
  mapToTreeNodes(data: any[]) {
    data = data.map((item, index) => {
      return {
        //expanded: true,
        expanded: index === 0,
        label: item.nameEn, // Assuming you want to display the English label
        children: item.childrens ? this.mapToTreeNodes(item.childrens) : [],
      };
    });
    return data;
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
  handleTabClick(node: any) {
    console.log(node);
  }
  getTreeList() {
    this.accountService.getTreeList().subscribe((res: any) => {
      this.nodes = this.mapToTreeNodes(res);
    });
  }
  RedirectToConfiguration() {
    this.ref = this.dialog.open(ChartOfAccountConfigurationComponent, {
      width: '800px',
      height: '700px',
    });
  }
}

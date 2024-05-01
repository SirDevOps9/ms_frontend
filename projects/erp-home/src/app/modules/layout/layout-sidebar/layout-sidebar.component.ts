import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { TreeNode } from 'primeng/api';
import { SideMenuModel } from 'shared-lib';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss'
})
export class LayoutSidebarComponent {
  @Output() sidebaropend = new EventEmitter<boolean>();
  sidebarVisible: boolean = true;
  sidebarOpen: boolean = false;
  nodes!: any[];
  menuList:SideMenuModel[];  
  treeData: TreeNode[] = [];

  ngOnInit(): void {
  //   this.nodes=[
  //     {
  //         key: '0',
  //         moduleId: 1,
  //         module: "Accounting",
  //         labelEn: "General Ledger",
  //         labelAr: "دفتر الاستاذ",
  //         routePath: ".",
  //         type: "Text",
  //         icon: null,
  //         parentId: null,
  //         children: [
  //             {
  //                 key: '0-0',
  //                 moduleId: 1,
  //                 module: "Accounting",
  //                 labelEn: "Master Data",
  //                 labelAr: "بيانات عامة",
  //                 routePath: ".",
  //                 type: "Text",
  //                 icon: null,
  //                 parentId: 3,
  //                 children: []
  //             },
  //             {
  //                 key: '0-1',
  //                 moduleId: 1,
  //                 module: "Accounting",
  //                 labelEn: "Transaction",
  //                 labelAr: "عمليات",
  //                 routePath: ".",
  //                 type: "Text",
  //                 icon: null,
  //                 parentId: 3,
  //                 children: [
  //                     {
  //                         key: '0-1-0',
  //                         moduleId: 1,
  //                         module: "Accounting",
  //                         labelEn: "Journal Entry",
  //                         labelAr: "قيود اليومية",
  //                         routePath: "fsgdgd",
  //                         type: "Url",
  //                         icon: "logo",
  //                         parentId: 5,
  //                         children: []
  //                     }
  //                 ]
  //             },
  //             {
  //                 key: '0-2',
  //                 moduleId: 1,
  //                 module: "Accounting",
  //                 labelEn: "Reports",
  //                 labelAr: "تقارير",
  //                 routePath: ".",
  //                 type: "Text",
  //                 icon: null,
  //                 parentId: 3,
  //                 children: []
  //             }
  //         ]
  //     }
  // ]
    this.nodes = [
      {
        key: '0',
        label: 'General Ledger',
        icon: 'pi-align-justify',
        children: [
          {
            key: '0-0',
            label: 'Master Data',
            labelEn: 'skill ',
            //data: '/anther-pages/editor/landing',
            //type: 'url',
            icon: 'pi-align-justify',
          
          },
          {
            key: '0-1',
            label: 'Transaction',
            // type: 'url',
            icon: 'pi-align-justify',
            children: [
              {
                key: '1-0',
                label: 'Journal Entry',
                data: 'journalentry',
                type: 'url',
                icon: 'pi-align-justify',
              },
            ],
          },
          {
            key: '0-2',
            label: 'Reports',
            //type: 'url',
            icon: 'pi-align-justify',
          },
        ],
      },
  
    ];
   this.menuList= this.authService.getSideMenu()
   console.log("Menu list",this.menuList);
   this.treeData = this.mapToTreeNodes(this.menuList);
   console.log( this.treeData ," this.treeData");
 
  }
  toggleSidebar() {
    if (this.sidebarOpen == true) {
      this.sidebarOpen = false;
      
      this.sidebaropend.emit(false);
    } else {
      this.sidebarOpen = true;
      this.sidebaropend.emit(true);

    }
  }
  mapToTreeNodes(data: SideMenuModel[]): TreeNode[] {
    // Create a map of items by key
    const map: { [key: string]: TreeNode } = {};
    data.forEach(item => {
      // Create a TreeNode for each item
      map[item.key.toString()] = {
        key: item.key.toString(),
        label: item.labelEn, // Assuming you want to display the English label
        icon: item.icon,
        type:item.type,
        data: item.data,
        children:[]
      };
    });

    // Construct the tree structure
    const tree: TreeNode[] = [];
    data.forEach(item => {
      if (item.parentId != null) {
        // Add the item as a child of its parent
        map[item.parentId]?.children?.push(map[item.key.toString()]);
      } else {
        // If no parent, it is a root node
        tree.push(map[item.key.toString()]);
      }
    });

    return tree;
  }
  constructor(
    public authService: AuthService,

  ){}

}

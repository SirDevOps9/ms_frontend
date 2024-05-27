import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { SideMenuModel } from 'shared-lib';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss',
})
export class LayoutSidebarComponent {
  @Output() sidebaropend = new EventEmitter<boolean>();
  sidebarVisible: boolean = true;
  sidebarOpen: boolean = false;
  menuList: SideMenuModel[];
  openStates: boolean[] = [];
  treeData: any;
  highlightedParent: any = null; // To track the highlighted parent node
  menuItems: any;
  ngOnInit(): void {
    this.menuList = this.authService.getSideMenu();

    this.menuList = this.menuList.filter(
      (x) => x.moduleId == this.router.snapshot.data['moduleId']
    );
    this.treeData = this.mapToTreeNodes(this.menuList);

    //console.log(this.treeData, ' this.treeData');
  }
  open(event: any, i: any) {
    
    // Check if the clicked element has the class 'arrow'
    if (event.target.classList.contains('arrow')) {
      // Get the parent element with the class 'iocn-link'
      const arrowParent = event.target.closest('.iocn-link');
      // Ensure the parent element is found
      if (arrowParent) {
        // Find the sibling element of the parent, which should be the menu element
        const menuElement = arrowParent.nextElementSibling;
        //console.log(arrowParent, 'm');

        // Ensure the menu element is found
        if (menuElement) {
          // Toggle the 'showMenu' class on the menu element
          if (menuElement.classList.contains('sub-menu')) {
            menuElement.classList.add('sub-menuu2');
            menuElement.classList.remove('sub-menu');
            const line: any = arrowParent;
            line.classList.add('parent');
          } else {
            menuElement.classList.add('sub-menu');
            menuElement.classList.remove('sub-menuu2');
            const line: any = arrowParent;
            line.classList.remove('parent');
          }
        }
        this.openStates[i] = !this.openStates[i];

      }
    }
  }

  toggleSidebar() {
    if (this.sidebarOpen == true) {
      this.sidebarOpen = false;
      const elements = document.querySelectorAll('.sub-menuu2');

      // Iterate over the elements and remove the class from each
      elements.forEach((element) => {
        element.classList.remove('sub-menuu2');
        element.classList.add('sub-menu');
      });
      this.sidebaropend.emit(false);
    } else {
      this.sidebarOpen = true;
      this.sidebaropend.emit(true);
    }
  }
  mapToTreeNodes(data: any[]) {
    data = data.map((item) => {
      return {
        key: item.key.toString(),
        name: item.labelEn, // Assuming you want to display the English label
        icon: item.icon,
        type: item.type.toLowerCase(),
        link: item.routePath,
        subMenu: item.children ? this.mapToTreeNodes(item.children) : [],
      };
    });
    return data;
  }
  findParentNode(expandedNode: any): any {
    // Recursive function to search for the parent node
    const searchParent = (currentNode: any, parentNode: any): any => {
      // Check if the current node has children
      if (currentNode.children) {
        // Iterate through each child
        for (const child of currentNode.children) {
          // Check if the child is the expanded node
          if (child === expandedNode) {
            // Return the current node as the parent
            return parentNode;
          }
          // Recursively search in the child node's children
          const result = searchParent(child, currentNode);
          if (result) {
            return result;
          }
        }
      }
      return null; // Return null if not found
    };

    // Start the search from the root nodes of the tree data
    for (const node of this.treeData) {
      const parent = searchParent(node, null);
      if (parent) {
        return parent; // Return the found parent node
      }
    }
    return null; // Return null if no parent is found
  }

  // Function to handle node expansion event
  onNodeExpand(event: any) {
    // Get the expanded node
    const expandedNode = event.node;

    // Find and update the highlighted parent node
    this.highlightedParent = this.findParentNode(expandedNode);
  }
  constructor(public authService: AuthService, private router: ActivatedRoute) {}
}

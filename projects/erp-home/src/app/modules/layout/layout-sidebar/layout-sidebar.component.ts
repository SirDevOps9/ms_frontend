import { Component, EventEmitter, Output } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss'
})
export class LayoutSidebarComponent {
  @Output() sidebaropend = new EventEmitter<boolean>();
  sidebarVisible: boolean = true;
  sidebarOpen: boolean = false;
  nodes!: TreeNode[];
  ngOnInit(): void {
    this.nodes = [
      {
        key: '0',
        label: 'create',
        icon: 'fa-solid fa-square-plus',
        children: [
          {
            key: '0-0',
            label: 'skill pathway',
            //data: '/anther-pages/editor/landing',
            //type: 'url',
            icon: 'https://i.pinimg.com/736x/0e/7c/3c/0e7c3cd000541a95fee5e98205881c59.jpg',
            children: [
              {
                key: '0-0',
                label: 'skill pathway',
                //data: '/anther-pages/editor/landing',
                //type: 'url',
                icon: 'fa-solid fa-cubes-stacked',
              },
              {
                key: '0-1',
                label: 'competency quiz',
                // type: 'url',
                icon: 'fa-solid fa-file-circle-question',
              },
              {
                key: '0-2',
                label: 'activity',
                //type: 'url',
                icon: 'fa-solid fa-chalkboard-user',
              },
            ],
          },
          {
            key: '0-1',
            label: 'competency quiz',
            // type: 'url',
            icon: 'fa-solid fa-file-circle-question',
          },
          {
            key: '0-2',
            label: 'activity',
            //type: 'url',
            icon: 'fa-solid fa-chalkboard-user',
          },
        ],
      },
      {
        key: '1',
        label: 'What’s News',
        icon: 'fa-solid fa-arrows-to-eye',
        children: [
          {
            key: '1-0',
            label: 'assessment hub',
            data: '',
            // type: 'url',
            icon: 'fa-solid fa-newspaper',
          },
          {
            key: '1-1',
            label: 'author mode',
            data: '',
            // type: 'url',
            icon: 'fa-solid fa-user-pen',
          },
        ],
      },
      {
        key: '2',
        label: 'analytics',
        icon: 'fa-solid fa-chart-line',
        children: [
          {
            key: '1-0',
            label: 'Skyscope Overview',
            icon: 'fa-solid fa-eye',
            children: [
              {
                key: '1-0',
                label: 'Seats & Segmentation',
                // type: 'url',
                data: '',
              },
              {
                key: '1-1',
                label: 'Live Lens',
                // type: 'url',
                data: '',
              },
              {
                key: '1-2',
                label: 'Business Analytics',
                // type: 'url',w
                data: '',
              },
            ],
          },
          {
            key: '1-1',
            label: 'progress tracker',
            //type: 'url',
            icon: ' fa-solid fa-chart-area',
          },
          {
            key: '1-2',
            label: 'Performance',
            icon: 'fa-solid fa-user-group',
            children: [
              {
                key: '1-0',
                label: 'Overview',
                // type: 'url',
                data: '',
              },
              {
                key: '1-1',
                label: 'View Time Status',
                // type: 'url',
                data: '',
              },
            ],
          },
        ],
      },
      {
        key: '3',
        label: 'organization',
        icon: 'fa-solid fa-sitemap',
        children: [
          {
            key: '1-0',
            label: 'structure',
            // type: 'url',
            icon: 'fa-solid fa-folder-tree',
          },
          {
            key: '1-1',
            label: 'User explorer',
            type: 'url',
            icon: 'fa-solid fa-globe',
            data: '/pages/user-explorer/view',
          },
        ],
      },
      {
        key: '4',
        label: 'reports',
        icon: 'fa-solid fa-ranking-star',
        children: [
          {
            key: '1-0',
            label: 'custom reports',
            //type: 'url',
            icon: 'fa-solid fa-chart-pie',
          },
          {
            key: '1-1',
            label: 'saved reports',
            //  type: 'url',
            icon: 'fa-solid fa-floppy-disk',
          },
          {
            key: '1-2',
            label: 'alerts',
            // type: 'url',
            icon: 'fa-solid fa-circle-radiation',
          },
        ],
      },
      {
        key: '5',
        label: 'assignments',
        icon: 'fa-solid fa-file-signature',
        children: [
          {
            key: '1-0',
            label: 'new assignment',
            type: 'url',
            icon: 'fa-solid fa-file-circle-plus',
            data: '/pages/assignments/content-list',
          },
          {
            key: '1-1',
            label: 'history',
            type: 'url',
            icon: 'fa-solid fa-clock-rotate-left',
            data: '/pages/assignments/list',
          },
        ],
      },
      {
        key: '6',
        label: 'collection',
        icon: 'fa-solid fa-users-between-lines',
        children: [
          {
            key: '1-0',
            label: 'skill pathway',
            //type: 'url',
            icon: 'fa-solid fa-cubes-stacked',
          },
          {
            key: '1-1',
            label: 'company quiz',
            // type: 'url',
            icon: 'fa-solid fa-file-circle-question',
          },
          {
            key: '1-2',
            label: 'activity',
            // type: 'url',
            icon: 'fa-solid fa-chalkboard-user',
          },
        ],
      },
      {
        key: '7',
        label: 'bookmarks',
        icon: 'fa-solid fa-bookmark',
        children: [
          {
            key: '1-0',
            label: 'new folder',
            type: 'url',
            icon: 'fa-solid fa-folder-plus',
            data: '/pages/bookmarks/list',
          },
          {
            key: '1-1',
            label: 'bookmarked content',
            type: 'url',
            icon: 'fa-solid fa-book-bookmark',
            data: '/pages/bookmarks/list',
          },
        ],
      },
      {
        key: '8',
        label: 'content catalogue',
        icon: 'fa-brands fa-buromobelexperte',
        
        children: [
          {
            key: '1-0',
            label: 'pathways library',
            type: 'url',
            icon: 'fa-solid fa-archway',
            data: '/pages/pathways/list',
          },
          {
            key: '1-1',
            label: 'books library',
            type: 'url',
            icon: 'fa-solid fa-photo-film',
            data: '/pages/books/list',
          },
          {
            key: '1-2',
            label: 'courses library',
            type: 'url',
            icon: 'fa-solid fa-swatchbook',
            data: '/pages/courses/list',
          },
          {
            key: '1-3',
            label: 'reading library',
            type: 'url',
            icon: 'fa-solid fa-book-open-reader',
            data: '/pages/reading/list',
          },
        ],
      },
    ];
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

}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view-workflow',
  templateUrl: './view-workflow.component.html',
  styleUrl: './view-workflow.component.scss'
})
export class ViewWorkflowComponent implements OnInit {

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  ngOnInit() {
      this.items = [
          { label: 'Status', icon: 'pi pi-home' },
          { label: 'Variables', icon: 'pi pi-chart-line' },
          { label: 'Products', icon: 'pi pi-list' },
          { label: 'Messages', icon: 'pi pi-inbox' }
      ]
      this.activeItem = this.items[0];

  }
  onActiveItemChange(event: MenuItem) {    
    this.activeItem = event;
}
}

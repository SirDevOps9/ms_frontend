import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view-workflow',
  templateUrl: './view-workflow.component.html',
  styleUrl: './view-workflow.component.scss',
})
export class ViewWorkflowComponent implements OnInit {
  workflowId: number = 0;
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;
  _route = inject(ActivatedRoute);

  ngOnInit() {
    this.workflowId = Number(this._route.snapshot.paramMap.get('id'));

    this.items = [
      { label: 'General', icon: 'pi pi-list' },
      { label: 'Status', icon: 'pi pi-home' },
      { label: 'Variables', icon: 'pi pi-chart-line' },
      // { label: 'Products', icon: 'pi pi-list' },
      // { label: 'Messages', icon: 'pi pi-inbox' },
    ];
    this.activeItem = this.items[0];
  }
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}

import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabPanel } from 'primeng/tabview';

@Component({
  selector: 'lib-tabview',
  templateUrl: './tabview.component.html',
  styleUrl: './tabview.component.scss'
})
export class TabviewComponent {
  @ContentChildren(TabPanel) panels!: QueryList<TabPanel>;

  tabs: { title: string, content: string }[] = [];
 
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-new-bread-crumb',
  templateUrl: './new-bread-crumb.component.html',
  styleUrl: './new-bread-crumb.component.scss'
})
export class NewBreadCrumbComponent {
  @Input() home: any;
  @Input() menuItems: any;
}

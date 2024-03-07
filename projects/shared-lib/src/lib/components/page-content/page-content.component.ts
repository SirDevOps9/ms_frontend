import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-page-content',
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.css',
})
export class PageContentComponent {
  @Input() title: string;
  @Input() subTitle: string;
}

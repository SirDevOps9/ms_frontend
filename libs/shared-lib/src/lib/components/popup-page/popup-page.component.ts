import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'lib-popup-page',
  standalone: true,
  imports: [],
  templateUrl: './popup-page.component.html',
  styleUrl: './popup-page.component.scss'
})
export class PopupPageComponent {
  @Input() title: number;
  @Input() Cancel: any;
}

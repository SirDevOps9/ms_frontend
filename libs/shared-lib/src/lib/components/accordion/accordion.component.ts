import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  @Input() header:string;

}

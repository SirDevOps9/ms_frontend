import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-fildest',
  templateUrl: './fildest.component.html',
  styleUrl: './fildest.component.scss'
})
export class FildestComponent {
  
  @Input() header: string;
  @Input() toggleable: boolean =false;

}

import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'lib-button-micro',
  templateUrl: './button-micro.component.html',
  styleUrl: './button-micro.component.scss'
})
export class ButtonMicroComponent {
  @Input() widthNumber:any;
  @Input() title:string;
  @Input() iconName:string;
  @Input() nameClass:string;


}

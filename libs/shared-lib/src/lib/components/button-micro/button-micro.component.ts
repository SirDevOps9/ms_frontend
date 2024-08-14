import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'lib-button-micro',
  templateUrl: './button-micro.component.html',
  styleUrl: './button-micro.component.scss'
})
export class ButtonMicroComponent {
  @Input() widthNumber: any;
  @Input() title: string;
  @Input() iconName: string;
  @Input() nameClass: 'btn' | 'btn_edit' | 'btn_delet' | 'save' | 'export' | 'cancel' | 'btn_rounded'| 'disabled' | 'outline'| 'saveDisabled';
  @Input() disabled : boolean = false;
  @Output() click = new EventEmitter()

}

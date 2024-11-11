import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'lib-button-micro',
  templateUrl: './button-micro.component.html',
  styleUrl: './button-micro.component.scss',
})
export class ButtonMicroComponent {
  @Input() widthNumber: any;
  @Input() title: string;
  @Input() iconName: string;
  @Input() nameClass:
      'w-100'
    | 'btn'
    | 'btn_edit'
    | 'btn_delet'
    | 'save'
    | 'export'
    | 'cancel'
    | 'btn_rounded'
    |'savePoupUp'
    | 'disabled'
    | 'outline'| 'saveDisabled'|'table_button_view'|'table_button_edit'|'table_button_delete'| 'sequence'| 'table_button_statement'|any | 'print';
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter();
  @Input() type: 'submit' | 'button';
}

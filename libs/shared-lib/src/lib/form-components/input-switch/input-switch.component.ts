import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrl: './input-switch.component.scss'
})
export class InputSwitchComponent implements OnInit {

  @Input() isActive: boolean;
  @Input() id: string;
  @Output() valueChanged = new EventEmitter<boolean>();
  ngOnInit() {
    
  }
  changed(event:any){
    this.valueChanged.emit(event.checked);
  }

}

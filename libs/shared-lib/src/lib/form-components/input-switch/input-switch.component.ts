import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSwitchComponent),
      multi: true
    }
  ]
})
export class InputSwitchComponent implements OnInit, ControlValueAccessor {
  @Input() isActive: boolean;
  @Input() id: string;
  @Input() disabled: boolean;
  @Output() valueChanged = new EventEmitter<boolean>();
  @Input() labelTest: any = 'input-switch';

  value: boolean = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  ngOnInit() {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }



  changed(event: any) {
    this.value = event.checked;
    this.onChange(this.value);
    this.valueChanged.emit(this.value);
  }

  
}

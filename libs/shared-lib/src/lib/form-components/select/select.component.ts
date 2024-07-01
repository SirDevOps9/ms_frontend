import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class 
SelectComponent implements ControlValueAccessor, Validator {
  @Input() label: string;
  @Input() options: any[];
  @Input() optionValue = 'code';
  @Input() optionLabel = 'name';
  @Input() readOnly: boolean;
  @Input() inputContainerClass: string;
  @Input() placeholder: string;
  @Input() maxLength: string;
  @Input() customClass: string;
  @Input() id: string;
  @Input() selectedValue: any;
  @Input() disabledMode: boolean = false;
  @Input() data_testid: string = '';
  @Input() labelTest: any;

  @Output() valueChanged = new EventEmitter<string>();

  value: string = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(value: string) {
    this.value = value;
    this.valueChanged.emit(this.value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    return null;
  }

  // change(m: any) {
  //   this.onChange(m.target.value);
  //   this.valueChanged.emit(m.target.value);
  // }
  change(m: any) {
    this.onChange(m.value);
    this.valueChanged.emit(m.value);
  }
  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }
  ngAfterViewInit(){
    if (this.controlDir) {
      setTimeout(() => {
        this.labelTest=this.controlDir.name
      }, 500);
      
      
    }
  }
}

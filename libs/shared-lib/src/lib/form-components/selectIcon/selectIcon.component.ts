import { Component, Input, Output, EventEmitter, Optional, Self, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { StorageService, LanguageService } from 'shared-lib';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'lib-selectIcon',
  templateUrl: './selectIcon.component.html',
  styleUrls: ['./selectIcon.component.scss'],
})
export class SelectIconComponent implements ControlValueAccessor, Validator {
  @Input() label: string;
  @Input() options: any[];
  @Input() icons: 'flags';
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
  @Input() labelTest: any;
  @Output() valueChanged = new EventEmitter<string>();

  value: string = '';
  primengConfig = inject(PrimeNGConfig);

  _local = inject(StorageService);
  lang = inject(LanguageService);
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

  ngAfterViewInit() {
    if (this.controlDir) {
      setTimeout(() => {
        this.labelTest = this.controlDir.name;
      }, 500);
    }
    if (this._local.getItem('selectedLanguage') == 'ar') {
      this.primengConfig.setTranslation({
        emptyMessage: 'لا توجد نتائج',
      });
    } else {
      return;
    }
  }

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }
}

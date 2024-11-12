import { Component, EventEmitter, inject, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'lib-columns-selection',
  templateUrl: './columns-selection.component.html',
  styleUrls: ['./columns-selection.component.css'],

})
export class ColumnsSelectionComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() optionValue = 'id';
  @Input() optionLabel = 'name';
  @Input() className: string = '';
  @Input() style: any = { 'min-width': '20px', 'border': 'none' };
  @Input() panelStyle: any = { width: '300px' };
  @Output() valueChanged = new EventEmitter<string | []>();
  @Output() filterColumns = new EventEmitter<any>();
  positionClass : any
  languageService = inject(LanguageService)
  ngOnInit() {
    let dir = this.languageService.ar;
    this.positionClass = dir === true ? 'rtl-position' : 'ltr-position';
  }

  selectedValue: string[] = [];
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
      this.selectedValue = value;
      this.handleFilterColumns(this.selectedValue);

    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  change(event: any) {
    this.onChange(event.value);
    this.valueChanged.emit(event.value);
    this.handleFilterColumns(event.value);

  }

  constructor(@Self() @Optional() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }

  }
  handleFilterColumns(selectedColumns: string[]) {
    this.filterColumns.emit(selectedColumns);
  }
}

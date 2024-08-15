import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchField } from '../../models/searchField';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Condition, FilterDto, FilterOptions } from '../../models/filterDto';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrl: './search-engine.component.css',
})
export class SearchEngineComponent {
  @Input() searchFields: SearchField[] = [];
  searchFormData: FormGroup;

  @Output() searchValue = new EventEmitter<FilterDto>();

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    const formControls: { [key: string]: AbstractControl } = {};
    this.searchFields.forEach((field) => {
      formControls[field.name] = this.fb.control('');
    });
    this.searchFormData = this.fb.group(formControls);
  }
  onSearch() {
    const formData = this.searchFormData.value;
    let cond: Condition[] = [];
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (value)
          cond.push({
            column: key,
            operator: this.searchFields.filter((x) => x.name == key)[0].operator,
            value: value,
          });
      }
    }
    // let params =new FilterDto () {
    //   conditions: cond ? cond : undefined,
    // };
   // this.searchValue.emit(params);
   // console.log('Collected Data:', params);
  }
}

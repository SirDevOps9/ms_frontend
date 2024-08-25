import {Component, EventEmitter, Input, OnChanges, Output,SimpleChanges, ViewChild,} from '@angular/core';
import {FormBuilder,FormControl,FormGroup} from '@angular/forms';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.scss'],
})
export class SharedFormComponent implements  OnChanges {
  @ViewChild('calendar') calendar: Calendar;
  disSaveBtn : boolean = false
  constructor(private fb: FormBuilder ) {}
  @Input() fields: any;
  @Output() formValues: EventEmitter<any> = new EventEmitter();
  @Output() selectedValuesMulti: EventEmitter<any> = new EventEmitter();
  @Output() listOwners: EventEmitter<any> = new EventEmitter();
  @Input() showSaveBtn: boolean = true;
  @Input() list: any[] = [];
  @Input() formClass: boolean = false
  
  form: FormGroup = new FormGroup({});
  listArray: any[] = [];
  Listvalues: string;
  disSave: boolean = false;
  selectedItems : any = []
  previousSelection: any[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    changes['fields'].currentValue?.forEach((elem: any) => {
      if (elem.key) {
        this.form?.addControl(
          elem?.key,
          new FormControl(
            {
              value: elem.firstValue ? elem.firstValue : null,
              disabled: elem.disabled == true ? true : false,
            },
            elem.hidden ? [] : elem?.validators?.validation
          )
        );
        this.form?.updateValueAndValidity();
      }
    });
    this.fields = changes['fields'].currentValue
  }



  // Send Form Data
  sendFormValues() {
    this.disSaveBtn = true
    for (let key in this.form.value) {
      if (this.form.value[key] instanceof Date ) {
        this.isDate(key)
      }
    }
    this.listOwners.emit(this.listArray);

    this.formValues.emit(this.form.getRawValue());
    setTimeout(() => {
      this.disSaveBtn = false

    }, 300);
  }

  // change Date Format for Backend
  isDate(key  :any) {
      let date = new Date(this.form.value[key]);
      let fullDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        console.log(fullDate)
      this.form.patchValue({ [key]: fullDate });
  }

  // Detect Multi Select event
  onMultiSelected(e : any) {

    this.selectedValuesMulti.emit(e.value)
  }



}

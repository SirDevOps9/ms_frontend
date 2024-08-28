import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'lib-field-validations',
  templateUrl: './field-validation.component.html',
  styleUrls: ['./field-validation.component.scss'],
})
export class FieldValidationsComponent implements OnInit {
  @Input() appControl: AbstractControl | any;
  @Input() labelTest: any = 'validation';

  get errorKeys(): string[] {
    return Object.keys(this.appControl?.errors!);
  }

  ngOnInit(): void {}

  constructor() {}
  
  ngAfterViewInit() {
    if (this.appControl) {
      setTimeout(() => {
        this.labelTest = this.appControl.name;
      }, 500);
    }
  }

     
}

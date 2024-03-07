import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'lib-field-validations',
  templateUrl: './field-validation.component.html',
  styleUrls: ['./field-validation.component.scss'],
})
export class FieldValidationsComponent implements OnInit {
  @Input() appControl: AbstractControl;

  private name: string;

  ngOnInit(): void {}

  constructor() {}
}

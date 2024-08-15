import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-form-group',
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.scss',
})
export class FormGroupComponent {
  @Input() customWidth : string
}

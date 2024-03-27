import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, FormGroup, NgControl } from '@angular/forms';
import { customValidators } from '../../services';

@Component({
  selector: 'lib-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() value: number;
  @Input() isReadOnly :boolean;
  @Input() showCancel :boolean;

  

  ngOnInit(): void {}
}

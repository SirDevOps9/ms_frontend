import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, FormGroup, NgControl } from '@angular/forms';
import { customValidators } from '../../services';

@Component({
  selector: 'lib-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  @Input() label: string;
  @Input() appControl: AbstractControl | any;
  @Input() labelTest: any;
  get ControlName() {
    var controlName = null;
    var parent = this.appControl['_parent'];

    // only such parent, which is FormGroup, has a dictionary
    // with control-names as a key and a form-control as a value
    if (parent instanceof FormGroup) {
      // now we will iterate those keys (i.e. names of controls)
      Object.keys(parent.controls).forEach((name) => {
        // and compare the passed control and
        // a child control of a parent - with provided name (we iterate them all)
        if (this.appControl === parent.controls[name]) {
          // both are same: control passed to Validator
          //  and this child - are the same references
          controlName = name;
        }
      });
    }
    // we either found a name or simply return null
    return controlName;
  }

  get Required() {
    return this.appControl.hasValidator(customValidators.required);
  }

  ngOnInit(): void {
    this.labelTest = "label-"+this.ControlName;
  }
}

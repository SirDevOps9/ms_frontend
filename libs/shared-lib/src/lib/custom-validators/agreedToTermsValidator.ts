import { AbstractControl } from '@angular/forms';

export function IsAgreedToTermsRequired(control: AbstractControl) {
  if (control.value === true || control.value === 'true') {
    return null;
  } else {
    return { isNotAgreedToTermsRequired: true };
  }
}

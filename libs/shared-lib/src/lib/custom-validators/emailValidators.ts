import { AbstractControl } from '@angular/forms';
import { HasWhitespaceAroundString } from './stringValidators';

export function IsValidEmail(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }
  
  if (control.value.includes('#')) {
    return { specialCharacterInEmail: true };
  }
  const regularExpression = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = regularExpression.test(String(control.value));

  if (isValid) {
    return null;
  } else {
    return { inValidEmailPattern: true };
  }
}

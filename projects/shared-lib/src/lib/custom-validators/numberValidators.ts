import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HasWhitespaceAroundString } from './stringValidators';

export function IsNumber(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const regularExpression = /^[0-9]*$/;

  const isValid = regularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { invalidNumber: true };
  }
}


export function rangeValidator(
  minLength: number,
  maxLength: number
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      control.value == null ||
      control.value === '' ||
      control.value.length === 0
    ) {
      return null;
    }

    const length: number = control.value;

    if (length >= minLength && length <= maxLength) {
      return null; // Validation passed
    } else {
      return { lengthRange: { min: minLength, max: maxLength } }; // Validation failed
    }
  };
}


import { HasWhitespaceAroundString } from './stringValidators';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IsValidCRNumber(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const regularExpression = /^1\d{9}$/;

  const isValid = regularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { invalidCRNumber: true };
  }
}
export function IsValid700Number(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const regularExpression = /^7\d{9}$/;

  const isValid = regularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { invalidUnifiedNumber: true };
  }
}
export function IsIqamaId(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const numericValue = control.value.replace(/\D/g, '');

  if (numericValue.length === 10 && numericValue[0] == 2) {
    return null; // Validation passed
  } else {
    return { invalidIqamaiId: true }; // Validation failed
  }
}
export function IsOnlySaudiId(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const numericValue = control.value.replace(/\D/g, '');

  if (numericValue.length === 10 && numericValue[0] == 1) {
    return null; // Validation passed
  } else {
    return { invalidOnlySaudiId: true }; // Validation failed
  }
}
export function IsValidSaudiId(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const numericValue = control.value.replace(/\D/g, '');

  if (
    numericValue.length === 10 &&
    (numericValue[0] == 1 || numericValue[0] == 2)
  ) {
    return null; // Validation passed
  } else {
    return { invalidSaudiId: true }; // Validation failed
  }
}


// Custom validator for English letters
export function onlyEnglishLetters(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const englishLetterPattern = /^[A-Za-z\s]+$/; // English letters pattern
    return value && !englishLetterPattern.test(value) ? { onlyEnglishLetters: true } : null;
  };
}
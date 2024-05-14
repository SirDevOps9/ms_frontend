import { AbstractControl } from '@angular/forms';
import { HasWhitespaceAroundString } from './stringValidators';

export function IsValidNationalMobile(control: AbstractControl) {
  return null;
}

export function IsValidMobileWithPrefix(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const regularExpression = /^05[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

  const isValid = regularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { inValidMobilePrefixPattern: true };
  }
}
export function IsValidMobile(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const regularExpression = /^05[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

  const isValid = regularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { inValidMobilePattern: true };
  }
}
export function IsValidPhone(control: AbstractControl) {
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

  if (numericValue.length === 9 || numericValue.length === 10) {
    return null; // Validation passed
  } else {
    return { invalidPhone: true }; // Validation failed
  }
}

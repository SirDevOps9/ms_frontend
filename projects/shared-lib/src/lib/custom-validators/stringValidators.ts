import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PreventSpecialChars(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const resularExpression = /^[\u0621-\u064Aa-zA-Z0-9\n\s.?؟-]*$/;

  const isValid = resularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { hasSpecialChars: true };
  }
}

export function lengthValidator(
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

    const length: number = control.value.length;

    if (length >= minLength && length <= maxLength) {
      return null; // Validation passed
    } else {
      return { lengthRange: { min: minLength, max: maxLength } }; // Validation failed
    }
  };
}

export function HasWhitespaceAroundString(targetString: string): boolean {
  const regularExpression = /^\s|\s$/;
  return regularExpression.test(targetString);
}

export function notOnlyWhitespaceValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isWhitespace =
      control.value.length > 0 && (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    control.value.trim();
    return isValid ? null : { hasWhiteSpaces: true };
  };
}

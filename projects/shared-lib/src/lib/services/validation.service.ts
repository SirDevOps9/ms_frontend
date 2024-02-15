import { AbstractControl } from '@angular/forms';

function IsNumber(control: AbstractControl) {
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
function IsValidMobileWithPrefix(control: AbstractControl) {
  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const regularExpression = /^5[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

  const isValid = regularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { inValidMobilePrefixPattern: true };
  }
}
function IsValidMobile(control: AbstractControl) {
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

function IsValidPhone(control: AbstractControl) {
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

function PreventSpecialChars(control: AbstractControl) {
  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const resularExpression = /^[\u0621-\u064Aa-zA-Z0-9\n\s?؟-]*$/;

  const isValid = resularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { hasSpecialChars: true };
  }
}

function IsAgreedToTermsRequired(control: AbstractControl) {
  if (control.value === true || control.value === 'true') {
    return null;
  } else {
    return { isNotAgreedToTermsRequired: true };
  }
}

function IsAbove18(control: AbstractControl) {
  const enteredDate = control.value;

  if (!enteredDate) {
    // Return null if the value is empty, as it means the field is not required.
    return null;
  }

  const currentDate = new Date();
  const inputDate = new Date(enteredDate);

  const timeDiff = currentDate.getTime() - inputDate.getTime();
  const yearsDiff = timeDiff / (1000 * 60 * 60 * 24 * 365.25); // Taking leap years into account

  if (yearsDiff < 18) {
    return { dateLessThan18YearsAgo: true };
  }

  return null;
}

function IsValidNationalMobile(control: AbstractControl) {
  return null;

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const regularExpression = /^00[1-9]\d{0,14}$/;

  const isValid = regularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { isValidNationalMobile: true };
  }
}

function IsValidCRNumber(control: AbstractControl) {
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

function IsValid700Number(control: AbstractControl) {
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

function IsValidSEmail(control: AbstractControl) {
  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const regularExpression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = regularExpression.test(String(control.value).toLowerCase());
  if (isValid) {
    return null;
  } else {
    return { inValidEmailPattern: true };
  }
}

function IsValidSaudiId(control: AbstractControl) {
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

function IsOnlySaudiId(control: AbstractControl) {
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

function IsIqamaId(control: AbstractControl) {
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

export const customValidators = {
  isValidMobile: IsValidMobile,
  isValidPhone: IsValidPhone,
  isAbove18: IsAbove18,
  isValidSEmail: IsValidSEmail,
  isValidSaudiId: IsValidSaudiId,
  IsOnlySaudiId: IsOnlySaudiId,
  IsIqamaId: IsIqamaId,
  isValidNationalMobile: IsValidNationalMobile,
  isNumber: IsNumber,
  isValid700Number: IsValid700Number,
  isValidCRNumber: IsValidCRNumber,
  preventSpecialChars: PreventSpecialChars,
  IsValidMobileWithPrefix: IsValidMobileWithPrefix,
  isAgreedToTermsRequired: IsAgreedToTermsRequired,
};

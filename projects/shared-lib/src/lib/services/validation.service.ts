import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function notOnlyWhitespaceValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isWhitespace =
      control.value.length > 0 && (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    control.value.trim();
    return isValid ? null : { hasWhiteSpaces: true };
  };
}

function IsNumber(control: AbstractControl) {
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
function IsValidMobileWithPrefix(control: AbstractControl) {
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
function IsValidMobile(control: AbstractControl) {
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

function IsValidPhone(control: AbstractControl) {
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

function PreventSpecialChars(control: AbstractControl) {
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

function IsAgreedToTermsRequired(control: AbstractControl) {
  if (control.value === true || control.value === 'true') {
    return null;
  } else {
    return { isNotAgreedToTermsRequired: true };
  }
}

function IsValidNationalMobile(control: AbstractControl) {
  return null;
}

function IsValidCRNumber(control: AbstractControl) {
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

function IsValid700Number(control: AbstractControl) {
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

function HasWhitespaceAroundString(targetString: string): boolean {
  const regularExpression = /^\s|\s$/;
  return regularExpression.test(targetString);
}

function IsValidEmail(control: AbstractControl) {
  const hasSpacesAround = HasWhitespaceAroundString(control?.value);

  if (hasSpacesAround) return { hasWhitespaceAroundString: true };

  if (
    control.value == null ||
    control.value === '' ||
    control.value.length === 0
  ) {
    return null;
  }

  const regularExpression = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const isValid = regularExpression.test(String(control.value));
  if (isValid) {
    return null;
  } else {
    return { inValidEmailPattern: true };
  }
}

function IsValidSaudiId(control: AbstractControl) {
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

function IsOnlySaudiId(control: AbstractControl) {
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

function IsIqamaId(control: AbstractControl) {
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

function IsRequired(control: AbstractControl) {
  const value = control?.value?.toString()?.trim();
  if (value === null || value === undefined || value === '') {
    return { required: true };
  }

  return null;
}

function lengthValidator(minLength: number, maxLength: number): ValidatorFn {
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

function minimumNumberOfYears(age: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpacesAround = HasWhitespaceAroundString(control?.value);

    if (hasSpacesAround) return { hasWhitespaceAroundString: true };

    const enteredDate = control.value;

    if (!enteredDate) {
      // Return null if the value is empty, as it means the field is not required.
      return null;
    }

    const currentDate = new Date();
    const inputDate = new Date(enteredDate);

    const timeDiff = currentDate.getTime() - inputDate.getTime();
    const yearsDiff = timeDiff / (1000 * 60 * 60 * 24 * 365.25); // Taking leap years into account

    if (yearsDiff < age) {
      return { ageAbove: age };
    }

    return null;
  };
}

function validPassword(control: AbstractControl) {
  const password = control.value;

  if (!password || password.length < 8 || password.length > 16) {
    return { invalidPassword: true };
  }

  if (
    !/[A-Z]+/.test(password) ||
    !/[a-z]+/.test(password) ||
    !/[0-9]+/.test(password) ||
    !/[~!@#$%^&*()]+/.test(password)
  ) {
    return { invalidPassword: true };
  }

  return null; // Valid password
}
export const ConfirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmpassword = control.get('confirmPassword');
  if (password && confirmpassword && password.value != confirmpassword.value) {
    return {
      passwordmatcherror: true,
    };
  }
  return null;
};

export const customValidators = {
  notOnlyWhitespaceValidator: notOnlyWhitespaceValidator,
  required: IsRequired,
  mobile: IsValidMobile,
  phone: IsValidPhone,
  notUnderAge: minimumNumberOfYears,
  email: IsValidEmail,
  saudiId: IsValidSaudiId,
  onlySaudiId: IsOnlySaudiId,
  saudiIqamaId: IsIqamaId,
  nationalMobile: IsValidNationalMobile,
  number: IsNumber,
  cr700Number: IsValid700Number,
  cRNumber: IsValidCRNumber,
  noSpecialChars: PreventSpecialChars,
  mobileWithPrefix: IsValidMobileWithPrefix,
  agreedToTermsRequired: IsAgreedToTermsRequired,
  password: validPassword,
  confrimPassword: ConfirmPasswordValidator,
  length: lengthValidator,
};

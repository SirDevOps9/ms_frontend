import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validPassword(control: AbstractControl) {
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

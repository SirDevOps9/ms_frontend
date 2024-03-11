import { AbstractControl } from '@angular/forms';

export function IsRequired(control: AbstractControl) {
  const value = control?.value?.toString()?.trim();
  if (value === null || value === undefined || value === '') {
    return { required: true };
  }

  return null;
}

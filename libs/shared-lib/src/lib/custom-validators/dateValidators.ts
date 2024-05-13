import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HasWhitespaceAroundString } from './stringValidators';

export function minimumNumberOfYears(age: number): ValidatorFn {
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

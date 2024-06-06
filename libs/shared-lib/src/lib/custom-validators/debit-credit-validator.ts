import { AbstractControl, ValidationErrors } from "@angular/forms";

//this function works on a whole from group
export function debitAndCreditValidator(control: AbstractControl): ValidationErrors | null {
    const debitAmount = control.get('debitAmount')?.value;
    const creditAmount = control.get('creditAmount')?.value;

    if (debitAmount == 0 && creditAmount == 0) {

      return { debitAndCreditZero: true };
    }
  
    return null;
  }


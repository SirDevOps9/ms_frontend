import { HasWhitespaceAroundString } from './stringValidators';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Arabic letters pattern
export function onlyArabicLetters(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const arabicLetterPattern = /^[\u0600-\u06FF\s]+$/; 
  
      return value && !arabicLetterPattern.test(value) ? { onlyArabicLetters: true } : null;
    };
  }
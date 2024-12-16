/* eslint-disable @typescript-eslint/naming-convention*/
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { LogService } from './log.service';
import { ToasterService } from './toaster.service';
import { LanguageService } from './language.service';
import { DefaultExceptionModel } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  validFileTypes = {
    'image/jpg': 'image/jpg',
    'image/jpeg': 'image/jpeg',
    'image/png': 'image/png',
    'application/pdf': 'application/pdf',
    'application/msword': 'application/msword',
    'application/vnd.ms-excel': 'application/vnd.ms-excel',
    'application/x-zip-compressed': 'application/x-zip-compressed',
    'application/vnd.rar': 'application/vnd.rar',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  validFileExtensions = '.pdf,.jpg,.jpeg,.png';
  validFileExtensions2 = 'pdf,txt,doc,docx,jpg,jpeg,png,gif,mp4,wmv';

  validForm(form: FormGroup | FormArray, showAlert: boolean = false) {
    form.markAllAsTouched();

    form.markAsDirty();
    this.logService.log(form);

    if (form.status === 'VALID') {
      return true;
    }
    if (!showAlert) {
      return false;
    }

    this.logService.log(form, 'Invalid form');

    this.toasterService.showError(
      this.languageService.transalte('Shared.Error'),
      this.languageService.transalte('Shared.valdation.invalidForm')
    );

    return false;
  }
  public findInvalidControls(form: FormGroup, logDetails = false) {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    if (logDetails) {
    }
    return invalid;
  }

  public setFormValidationErrors(form: FormGroup, err: any): void {
    let defaultError = err as DefaultExceptionModel;
    let validationErrors = defaultError.validationErrors!;
    validationErrors.forEach((validationError) => {
      const keys = validationError.key.split('.');
      const errorMessage = validationError.errorMessages[0];

      if (keys.length === 1) {
        if (keys[0] == '') {
          this.toasterService.showError(errorMessage, errorMessage);
        }
        // Single level key
        const controlName = Object.keys(form.controls).find(
          (control) => control.toLowerCase() === keys[0].toLowerCase()
        );

        if (controlName) {
          form.controls[controlName].setErrors({ backendValidation: errorMessage });
        }
      } else if (keys.length === 2) {
        // Two level key
        const formGroupName = Object.keys(form.controls).find(
          (group) => group.toLowerCase() === keys[0].toLowerCase()
        );

        if (formGroupName) {
          const formGroup = form.controls[formGroupName] as FormGroup;
          const controlName = Object.keys(formGroup.controls).find(
            (control) => control.toLowerCase() === keys[1].toLowerCase()
          );

          if (controlName) {
            formGroup.controls[controlName].setErrors({ backendValidation: errorMessage });
          }
        }
      }
    });
  }

  download(fileSrc: string, imageName = 'image') {
    const typeSrc = fileSrc.split(';')[0].split('/')[1];
    const source = fileSrc;
    const link = document.createElement('a');
    link.href = source;
    link.download = imageName + '.' + typeSrc;
    link.click();
  }

  constructor(
    private logService: LogService,
    private languageService: LanguageService,
    private toasterService: ToasterService
  ) {}
}

export const IsEqual = (value1: any, value2: any): boolean => {
  // Check if the two values are identical
  if (value1 === value2) return true;

  // Check if the two values are both objects or arrays
  if (
    typeof value1 === 'object' &&
    value1 !== null &&
    typeof value2 === 'object' &&
    value2 !== null
  ) {
    if (Array.isArray(value1) && Array.isArray(value2)) {
      value1 = value1.sort();
      value2 = value2.sort();
    }
    // Check if the two values have the same number of keys/elements
    if (
      Object.keys(value1).length !== Object.keys(value2).length ||
      value1.length !== value2.length
    )
      return false;

    // Recursively compare each key/element
    for (const key in value1) {
      if (!IsEqual(value1[key], value2[key])) return false;
    }

    // If all keys/elements are equal, return true
    return true;
  }

  // If the two values are not both objects or arrays, they are not equal
  return false;
};

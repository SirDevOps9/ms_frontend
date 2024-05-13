/* eslint-disable @typescript-eslint/naming-convention*/
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LogService } from './log.service';
import { ToasterService } from './toaster.service';
import { LanguageService } from './language.service';

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

  validForm(form: FormGroup, showAlert: boolean = false) {
    form.markAllAsTouched();

    form.markAsDirty();

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

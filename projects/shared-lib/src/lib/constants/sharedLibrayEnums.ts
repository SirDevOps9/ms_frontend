import { Injectable } from '@angular/core';
import { AttachmentFileTypeEnum } from '../models';
import { Actions } from 'microtec-auth-lib';

@Injectable({
  providedIn: 'root',
})
export class SharedLibraryEnums {
  get AttachmentFileTypes(): typeof AttachmentFileTypeEnum {
    return AttachmentFileTypeEnum;
  }

  get PageActions(): typeof Actions {
    return Actions;
  }
}

import { Injectable } from '@angular/core';
import { AttachmentFileTypeEnum } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SharedLibraryEnums {
  get AttachmentFileTypes(): typeof AttachmentFileTypeEnum {
    return AttachmentFileTypeEnum;
  }
}

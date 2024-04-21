import { Injectable } from '@angular/core';
import { AttachmentFileTypeEnum, LookupEnum } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SharedLibraryEnums {
  get AttachmentFileTypes(): typeof AttachmentFileTypeEnum {
    return AttachmentFileTypeEnum;
  }

  get LookupTypes(): typeof LookupEnum {
    return LookupEnum;
  }
}

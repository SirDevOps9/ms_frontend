import { Injectable } from '@angular/core';
import { AttachmentFileTypeEnum, LookupEnum } from '../models';
import { Actions, Apps, Licenses, Services } from 'microtec-auth-lib';

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

  get PageActions(): typeof Actions {
    return Actions;
  }

  get AppsTypes(): typeof Apps {
    return Apps;
  }
  get LicenseTypes(): typeof Licenses {
    return Licenses;
  }

  get ServiceTypes(): typeof Services {
    return Services;
  }
}

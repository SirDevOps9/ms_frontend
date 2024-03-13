import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './base.httpservice';
import {
  APIResponse,
  AttachmentDto,
  AttachmentFileTypeEnum,
  FileDto,
  FileTypeMetaData,
  UploadFileConfigDto,
} from '../models';
import { LanguageService } from './language.service';
import { ToasterService } from './toaster.service';
import { customValidators } from '../custom-validators/validation.service';
import { getFileType } from '../custom-validators/attachmentValidators';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private attachmentIdDataSource = new BehaviorSubject<string>('');

  public attachemntId = this.attachmentIdDataSource.asObservable();

  private validationErrorsDataSource = new BehaviorSubject<{}>({});

  public validationErrors = this.validationErrorsDataSource.asObservable();

  uploadFile(files: FileDto[], uploadFileConfig: UploadFileConfigDto) {
    const reader = new FileReader();

    const [file] = files;

    console.log(file);

    const validationErrors = customValidators.file(file, uploadFileConfig);

    if (validationErrors) {
      this.validationErrorsDataSource.next(validationErrors);
      return;
    }

    reader.readAsDataURL(file);

    reader.onload = () => {
      let fileInfo: AttachmentDto = {
        fileContent: reader.result as string,
        fileName: file.name,
      };

      this.httpService
        .post('Attachments/UploadAttachment', fileInfo)
        .subscribe((response: APIResponse<string>) => {
          if (!response.response) {
            this.toasterService.showError(
              this.languageService.transalte('Shared.Error'),
              this.languageService.transalte('Shared.valdation.invalidForm')
            );
          }
          this.attachmentIdDataSource.next(response.response);
        });
    };
  }

  downloadAttachment(
    fileId: string,
    label: string,
    fileType: AttachmentFileTypeEnum
  ) {
    const fileTypeMetaData = getFileType(fileType);

    this.httpService
      .get('Attachments/DownloadAttachment/' + fileId)
      .subscribe((apiResponse: APIResponse<AttachmentDto>) => {
        if (apiResponse.response) {
          const source = `${fileTypeMetaData.fileBase64Padding},${apiResponse.response.fileContent}`;

          const link = document.createElement('a');

          link.href = source;

          link.download = label + fileTypeMetaData.fileExtension;

          link.click();
        } else {
          this.toasterService.showError(
            this.languageService.transalte('Shared.Error'),
            this.languageService.transalte('Shared.valdation.invalidForm')
          );
        }
      });
  }

  constructor(
    private httpService: HttpService,
    private languageService: LanguageService,
    private toasterService: ToasterService
  ) {}
}

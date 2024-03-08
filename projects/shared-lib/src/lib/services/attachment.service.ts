import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from './base.httpservice';
import {
  APIResponse,
  AttachmentDto,
  AttachmentFileTypes,
  FileTypeMetaData,
} from '../models';
import { LanguageService } from './language.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private attachmentIdDataSource = new BehaviorSubject<string>('');

  public attachemntId = this.attachmentIdDataSource.asObservable();

  uploadFile(files: any[]) {
    const reader = new FileReader();

    const [file] = files;

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
    fileType: AttachmentFileTypes
  ) {
    const fileTypeMetaData = this.getFileType(fileType);

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

  getFileType(fileType: AttachmentFileTypes): FileTypeMetaData {
    let fileTypeInfo: FileTypeMetaData = {};

    switch (fileType) {
      case AttachmentFileTypes.image:
        fileTypeInfo.fileExtension = '.jpg';
        fileTypeInfo.allowedExtensions = 'png,peg,jpg,jpeg';
        fileTypeInfo.fileBase64Padding = 'data:image/jpg;base64';
        break;
      case AttachmentFileTypes.pdf:
        fileTypeInfo.fileExtension = '.pdf';
        fileTypeInfo.allowedExtensions = 'pdf';
        fileTypeInfo.fileBase64Padding = 'data:application/pdf;base64';
        break;
    }
    return fileTypeInfo;
  }

  constructor(
    private httpService: BaseService,
    private languageService: LanguageService,
    private toasterService: ToasterService
  ) {}
}

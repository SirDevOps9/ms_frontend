import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpService } from './base.httpservice';
import {
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
import { EnvironmentService } from './environment.service';
import { ValidationErrors } from '@angular/forms';
import { UploadFileResult } from '../models/uploadFileResult';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private attachmentIdDataSource = new BehaviorSubject<string>('');
  public attachmentIds = new BehaviorSubject<any>([]);
  public attachmentIdsObservable = this.attachmentIds.asObservable()

  public attachemntId = this.attachmentIdDataSource.asObservable();

  private validationErrorsDataSource = new BehaviorSubject<{}>({});

  public validationErrors = this.validationErrorsDataSource.asObservable();
  filesInfo : any = []
  filesName: any[] = []
  fileExtension: any = []
  filesUrls : any = []
  files : any = []
  attachemntIdsList : string[] = []
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
        .postFullUrl(
          `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/UploadBase64Attachment`,
          fileInfo
        )
        .subscribe((response: string) => {
          if (!response) {
            this.toasterService.showError(
              this.languageService.transalte('Shared.Error'),
              this.languageService.transalte('Shared.valdation.invalidForm')
            );
          }
          this.attachmentIdDataSource.next(response);
        });
    };
  }

  validateFile(files: FileDto[], uploadFileConfig: UploadFileConfigDto) : ValidationErrors | null  {
    const [file] = files;

    const validationErrors = customValidators.file(file, uploadFileConfig);

    return validationErrors;
  }

   uploadValidatedFile(files: AttachmentDto) {
   return  this.httpService
      .postFullUrl(
        `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/UploadBase64Attachment`,
        files
      ).subscribe((res )=>{
       
        this.attachemntIdsList.push(res)
        this.attachmentIds.next(this.attachemntIdsList)
        console.log(this.attachemntIdsList ,"this.attachemntIdsList");

      })
  }

  downloadAttachment(
    fileId: string,
    label: string,
    fileType: AttachmentFileTypeEnum
  ) {
    // const fileTypeMetaData = getFileType(fileType);

    this.httpService
      .getFullUrl(
        `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/DownloadBase64Attachment/` +
        fileId
      )
      .subscribe((apiResponse: AttachmentDto) => {

        console.log("attachmentResp", apiResponse);

        if (apiResponse) {
          const source = `${apiResponse.base64Padding},${apiResponse.fileContent}`;

          const link = document.createElement('a');

          link.href = source;

          link.download = label ;

          link.click();
        } else {
          this.toasterService.showError(
            this.languageService.transalte('Shared.Error'),
            this.languageService.transalte('Shared.valdation.invalidForm')
          );
        }
      });
  }

  getAttachment(fileId: string): Observable<any> {
    return this.httpService.getFullUrl(
      `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/DownloadBase64Attachment/` +
      fileId
    );
  }

  clearState(){
    this.attachmentIdDataSource.next('');
  }
  viewAttachment(fileId: string) {
    this.httpService
      .getFullUrl(
        `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/DownloadBase64Attachment/` +
        fileId
      )
      .subscribe((apiResponse: AttachmentDto) => {
        if (apiResponse) {
          const source = `${apiResponse.base64Padding},${apiResponse.fileContent}`;
          console.log(source ,"source");
          
          window.open(source, '_blank');
        } else {
          this.toasterService.showError(
            this.languageService.transalte('Shared.Error'),
            this.languageService.transalte('Shared.valdation.invalidForm')
          );
        }
      });
  }
  updateFilesInfo(newFiles: any[]) {
    this.filesInfo = newFiles;
  }
  constructor(
    private httpService: HttpService,
    private languageService: LanguageService,
    private toasterService: ToasterService,
    private enviormentService: EnvironmentService
  ) {
   }
}

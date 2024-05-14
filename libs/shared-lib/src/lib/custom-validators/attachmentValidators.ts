import { ValidationErrors } from '@angular/forms';
import {
  AttachmentFileTypeEnum,
  FileDto,
  FileTypeMetaData,
  UploadFileConfigDto,
} from '../models';

export function fileValidator(
  uploadedFile: FileDto,
  uploadFileConfig: UploadFileConfigDto) : ValidationErrors | null 
{
  const fileTypeInfo = getFileType(uploadFileConfig.type!);
  console.log(uploadedFile);

  if (!fileTypeInfo.allowedTypes?.find((e) => e === uploadedFile.type)) {
    return {
      invalidFileType: {
        allowedFileTypes: getFileType(uploadFileConfig.type!).allowedExtensions,
      },
    };
  }

  if (uploadedFile.size > uploadFileConfig.maxSize!) {
    return {
      invalidSize: {
        maxSize: uploadFileConfig.maxSize,
      },
    };
  }
  // return {
  //   invalidSize: true,
  //   invalidWidth: true,
  //   invalidHeight: true,
  //   invalidFileType: true,
  // };
  return null;
}

export function getFileType(
  fileType: AttachmentFileTypeEnum
): FileTypeMetaData {
  let fileTypeInfo: FileTypeMetaData = {};

  switch (fileType) {
    case AttachmentFileTypeEnum.image:
      fileTypeInfo.fileExtension = '.jpg';
      fileTypeInfo.allowedExtensions = ['png', 'peg', 'jpg', 'jpeg'];
      fileTypeInfo.allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/peg',
        'image/jpg',
      ];
      // fileTypeInfo.fileBase64Padding = 'data:image/jpg;base64';
      break;
    case AttachmentFileTypeEnum.pdf:
      fileTypeInfo.fileExtension = '.pdf';
      fileTypeInfo.allowedExtensions = ['pdf'];
      // fileTypeInfo.fileBase64Padding = 'data:application/pdf;base64';
      break;
  }
  return fileTypeInfo;
}

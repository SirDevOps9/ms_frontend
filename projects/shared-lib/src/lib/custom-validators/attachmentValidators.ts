import {
  AttachmentFileTypes,
  FileDto,
  FileTypeMetaData,
  UploadFileConfigDto,
} from '../models';

export function fileValidator(
  uploadedFile: FileDto,
  uploadFileConfig: UploadFileConfigDto
) {
  const fileTypeInfo = getFileType(uploadFileConfig.type!);
  ('');

  if (!fileTypeInfo.allowedExtensions?.find((e) => e === uploadedFile.type)) {
    return {
      invalidType: {
        errorMessage: 'Invalid type',
      },
    };
  }

  return {
    invalidSize: true,
    invalidWidth: true,
    invalidHeight: true,
    invalidFileType: true,
  };
}

export function getFileType(fileType: AttachmentFileTypes): FileTypeMetaData {
  let fileTypeInfo: FileTypeMetaData = {};

  switch (fileType) {
    case AttachmentFileTypes.image:
      fileTypeInfo.fileExtension = '.jpg';
      fileTypeInfo.allowedExtensions = ['png', 'peg', 'jpg', 'jpeg'];
      fileTypeInfo.fileBase64Padding = 'data:image/jpg;base64';
      break;
    case AttachmentFileTypes.pdf:
      fileTypeInfo.fileExtension = '.pdf';
      fileTypeInfo.allowedExtensions = ['pdf'];
      fileTypeInfo.fileBase64Padding = 'data:application/pdf;base64';
      break;
  }
  return fileTypeInfo;
}

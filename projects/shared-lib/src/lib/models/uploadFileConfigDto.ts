import { AttachmentFileTypeEnum } from './attachmentFileTypes';

export class UploadFileConfigDto {
  type?: AttachmentFileTypeEnum;
  maxSize?: number;
  maxHeight?: number;
  maxWidth?: number;
  viewThumbnail?: boolean;
}

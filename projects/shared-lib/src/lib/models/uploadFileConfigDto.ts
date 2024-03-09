import { AttachmentFileTypes } from './attachmentFileTypes';

export class UploadFileConfigDto {
  type?: AttachmentFileTypes;
  maxSize?: number;
  maxHeight?: number;
  maxWidth?: number;
}

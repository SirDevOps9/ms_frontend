import { Component, Input, Output, EventEmitter, Optional, Self, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { AttachmentsService } from '../../services';
import { AttachmentDto, AttachmentFileTypeEnum, UploadFileConfigDto } from '../../models';
import { SharedLibraryEnums } from '../../constants';

@Component({
  selector: 'lib-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent implements ControlValueAccessor, Validator {
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() inputContainerClass: string;
  @Input() placeholder: string;
  @Input() base64: string;
  @Input() id: string;
  @Input() showImgName: boolean = true;
  @Input() className: string;
  @Input() uploadClassName: string;
  @Input() appControl: AbstractControl;
  @Input() config: UploadFileConfigDto = { type: AttachmentFileTypeEnum.image };
  @Output() valueChanged = new EventEmitter<string>();
  @ViewChild('fileInput') fileInput: ElementRef;

  imgName: string = '';
  value: string = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
      this.value = value;
      this.updateImageBase64();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(value: string) {
    this.value = value;
    this.valueChanged.emit(this.value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log('validate file uploader', control);
    const value = control.value;
    // if (!value) {
    //   return null;
    // }

    return { invalidFile: true };
  }

  change(m: any) {
    this.onChange(m.target.value);
    this.valueChanged.emit(m.target.value);
  }

  uploadFile(event: any) {
    this.attachmentService.uploadFile(event.target.files, this.config);
    this.imgName = event.target.files[0].name;
  }

  // resetErrorMessages() {
  //   this.fleSizeExceed = false;
  //   this.fleSizeExceedMsg = null;
  //   this.fileExtensionsNotAllowed = false;
  //   this.fileExtensionsNotAllowedMSg = null;
  // }

  downloadAttachment() {
    this.attachmentService.downloadAttachment(this.value, this.label, this.config.type!);
  }
  deleteAttachment() {
    this.value = '';
    this.onChange('');
    this.valueChanged.emit('');
    this.base64 = '';
    this.fileInput.nativeElement.value = '';
  }

  private subscribe() {
    this.attachmentService.attachemntId.subscribe((attId) => {
      this.value = attId;

      this.onChange(attId);

      this.valueChanged.emit(attId);

      this.updateImageBase64();
    });

    this.attachmentService.validationErrors.subscribe((err) => {
      this.appControl?.markAllAsTouched();

      this.appControl?.markAsDirty();

      this.appControl?.setErrors(err);
    });

    if (this.config.type === AttachmentFileTypeEnum.image && this.value) {
      this.updateImageBase64();
    }
  }
  private updateImageBase64() {
    if (this.value != '') {
      this.attachmentService.getAttachment(this.value).subscribe((response: AttachmentDto) => {
        if (response?.fileContent) {
          const source = `${response.base64Padding},${response.fileContent}`;
          this.base64 = source;
        }
      });
    }
  }

  constructor(
    @Self() @Optional() public controlDir: NgControl,
    public sharedLibEnums: SharedLibraryEnums,

    public attachmentService: AttachmentsService
  ) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
    this.attachmentService.clearState();
    this.subscribe();
  }
}

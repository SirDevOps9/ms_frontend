import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { AttachmentsService } from '../../services';
import { AttachmentFileTypes } from '../../models';

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
  @Input() maxLength: string;
  @Input() fileType: AttachmentFileTypes = AttachmentFileTypes.image;
  @Input() id: string;

  @Output() valueChanged = new EventEmitter<string>();

  value: string = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
      this.value = value;
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
    const value = control.value;
    if (!value) {
      return null;
    }

    return null;
  }

  change(m: any) {
    this.onChange(m.target.value);
    this.valueChanged.emit(m.target.value);
  }

  uploadFile(event: any) {
    this.attachmentService.uploadFile(event.target.files);
  }

  // resetErrorMessages() {
  //   this.fleSizeExceed = false;
  //   this.fleSizeExceedMsg = null;
  //   this.fileExtensionsNotAllowed = false;
  //   this.fileExtensionsNotAllowedMSg = null;
  // }

  downloadAttachment() {
    this.attachmentService.downloadAttachment(
      this.value,
      this.label,
      this.fileType
    );
  }
  deleteAttachment() {
    this.value = '';
    this.onChange('');
    this.valueChanged.emit('');
  }

  constructor(
    @Self() @Optional() public controlDir: NgControl,
    public attachmentService: AttachmentsService
  ) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
    this.attachmentService.attachemntId.subscribe((attId) => {
      this.value = attId;

      this.onChange(attId);

      this.valueChanged.emit(attId);
    });
  }
}

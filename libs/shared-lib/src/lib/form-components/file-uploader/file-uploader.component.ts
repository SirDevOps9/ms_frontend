import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
import * as XLSX from 'xlsx';

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
  @Input() file: boolean;
  @Input() className: string;
  @Input() uploadClassName: string;
  @Input() appControl: AbstractControl ;
  @Input() labelTest: any;
  @Input() config: UploadFileConfigDto = { type: AttachmentFileTypeEnum.image };
  @Output() valueChanged = new EventEmitter<string>();
  @Output() data = new EventEmitter<any>();
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
  
  ngAfterViewInit() {
    if (this.appControl) {
      setTimeout(() => {
        //this.labelTest = this.appControl.name;
        this.labelTest = this.label;
      }, 500);
    }
  }
  /////////////

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === 'xlsx') {
        this.readExcelFile(file);
      } else {
        console.log('not supported');
      }
    }
  }

  readExcelFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json:any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    console.log("888888888888888888888");
    
      this.data.emit(json);

    
    };
    
    reader.readAsBinaryString(file);

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

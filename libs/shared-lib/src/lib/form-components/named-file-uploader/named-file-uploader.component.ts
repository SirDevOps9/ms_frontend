import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { AttachmentsService } from '../../services';
import {
  AttachmentDto,
  AttachmentFileTypeEnum,
  UploadFileConfigDto,
} from '../../models';
import { SharedLibraryEnums } from '../../constants';

@Component({
  selector: 'lib-named-file-uploader',
  templateUrl: './named-file-uploader.component.html',
  styleUrl: './named-file-uploader.component.scss',
})
export class NamedFileUploaderComponent implements OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() base64: string;
  @Input() id: string;
  @Input() showImgName: boolean = true;
  @Input() uploadClassName: string = 'upload';
  @Input() appControl: AbstractControl;
  @Input() config: UploadFileConfigDto = { type: AttachmentFileTypeEnum.image };
  @Input() labelTest: any ;
  imgName : string = ''
  value: string;
  public get fg(): FormGroup {
    return this.appControl as FormGroup;
  }

  ngOnInit(): void {
    const value = this.appControl.value.attachmentId;
    this.setValue(value);
  }

  async uploadFile(event: any) {
    this.deleteAttachment();
    const errors = this.attachmentService.validateFile(event.target.files, this.config);
    if (errors) {
      this.appControl?.markAsDirty();
      this.appControl?.setErrors(errors);
      return;
    }
    const upload$ = await this.attachmentService.uploadValidatedFile(event.target.files);
    // upload$.subscribe(result => {
    //   this.setValue(result.attachmentId);
    //   this.fg.setValue({
    //     attachmentId: result.attachmentId,
    //     name: result.name
    //   });
    //   this.imgName = result.name

    // })
  }

  downloadAttachment() {
    this.attachmentService.downloadAttachment(
      this.value,
      this.label || this.fg.value.name,
      this.config.type!
    );
  }

  private setValue(value: string){
    this.value = value;
    this.updateImageBase64();
  }

  deleteAttachment() {
    this.setValue('');
    this.fg.setValue({
      attachmentId: '',
      name: ''
    });
  }

  private updateImageBase64() {
    if(!this.value){
      this.base64 = '';
      return;
    }
    this.attachmentService
      .getAttachment(this.value)
      .subscribe((response: AttachmentDto) => {
        if (response?.fileContent) {
          const source = `${response.base64Padding},${response.fileContent}`;
          this.base64 = source;
        }
      });
  }
  
  ngAfterViewInit() {
    if (this.appControl) {
      setTimeout(() => {
        this.labelTest = this.label;
      }, 500);
    }
  }


  constructor(
    public sharedLibEnums: SharedLibraryEnums,
    public attachmentService: AttachmentsService
  ) {
  }
}

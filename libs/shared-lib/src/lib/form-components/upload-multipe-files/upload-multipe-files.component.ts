import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttachmentsService } from '../../services/attachment.service';
import { AttachmentDto } from '../../models';

@Component({
  selector: 'lib-upload-multipe-files',

  templateUrl: './upload-multipe-files.component.html',
  styleUrl: './upload-multipe-files.component.css',
})
export class UploadMultipeFilesComponent implements OnInit {
  constructor(public attachmentService: AttachmentsService) {

  }
  ngOnInit(): void {
    this.urls = this.attachmentService.filesUrls
    this.filesName = this.attachmentService.filesName
    this.files = this.attachmentService.files
  }
 
  urls: any = [];
  files: any = [];
  filesName: string[] = [];
  @Input() imgExtentions = ['image/png', 'image/png', 'application/pdf'];
  @Output() sendFiles = new EventEmitter();
  editStates: boolean[] = [];

  showText: boolean = true;
  onSelectFile(event: any) {
    let file = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
          this.attachmentService.filesUrls = this.urls

          this.files.push(file[i]);
          this.attachmentService.files = this.files
          this.filesName.push(file[i].name);
          this.attachmentService.filesName =  this.filesName

          let fileInfo: AttachmentDto = {
            fileContent: this.urls[i] as string,
            fileName: this.filesName[i],
          };
          this.attachmentService.filesInfo.push(fileInfo);
          this.attachmentService.uploadValidatedFile(fileInfo);

          this.editStates.push(false); // Initialize edit state for new file
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onDragDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      const filesAmount = files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
          this.files.push(files[i]);
          this.filesName.push(files[i].name);
          // this.sendFiles.emit({
          //  name : this.filesName,
          //  attachmentId : this.urls
          // })
          this.sendFiles.emit({});

          this.editStates.push(false); // Initialize edit state for new file
        };

        reader.readAsDataURL(files[i]);
      }
    }
  }

  preventDefault(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  removeFile(index: number) {
    this.urls.splice(index, 1);
    this.files.splice(index, 1);
    this.editStates.splice(index, 1); // Remove edit state
  }

  toggleEditState(index: number) {
    this.editStates[index] = !this.editStates[index];
  }

  downloadFile(url: string, fileName: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }
}

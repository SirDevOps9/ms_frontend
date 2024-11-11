import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttachmentsService } from '../../services/attachment.service';
import { AttachmentDto, AttachmentFileTypeEnum } from '../../models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { EnvironmentService, HttpService } from 'shared-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-upload-multipe-files',

  templateUrl: './upload-multipe-files.component.html',
  styleUrl: './upload-multipe-files.component.css',
})
export class UploadMultipeFilesComponent implements OnInit {
  urls: any = [];
  files: any = [];
  filesName: string[] = [];
  fileExtension: string[] = [];
  attachments: any[] = [];
  @Input() filesData: any;
  @Input() screen: any;
  @Output() sendFiles = new EventEmitter();
  editStates: boolean[] = [];
  ngOnInit(): void {

    this.fileExtension = this.attachmentService.fileExtension;
    this.filesName = this.attachmentService.filesName;
    this.files = this.attachmentService.files;
    this.attachmentService.filesInfo.push(this.attachmentService.filesUrls);
    this.subscrip()

  }

  onSelectFile(event: any) {
    let file = event.target.files;
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = ((fileItem) => {
          return (event: any) => {

            this.files.push(fileItem);
            this.filesName.push(fileItem.name);
            this.fileExtension.push(fileItem.name.split('.').pop());

            let fileInfo: AttachmentDto = {
              fileContent: event.target.result as string,
              fileName: fileItem.name,
            };
            this.attachmentService.filesInfo.push(fileInfo);
            this.attachmentService.uploadValidatedFile(fileInfo);
            this.editStates.push(false); // Initialize edit state for new file

            this.cdRef.detectChanges();
          };
        })(file[i]);

        reader.readAsDataURL(file[i]);
      }
    }
  }

  subscrip() {
    this.attachmentService.attachmentIdsObservable.subscribe((res: any) => {
      this.setUrls()
    });


  }
  setUrls() {
    this.urls = []
    this.attachmentService.attachemntIdsList.forEach((url: any, index: number) => {
      // تحقق مما إذا كان العنصر موجودًا مسبقًا في المصفوفة
      const existingItem = this.urls.find((item: any) => item.attachmentId === url);

      if (!existingItem) {
        let filesName = this.filesName[index]
        let dotIndex = filesName.lastIndexOf(".");
        let name = filesName.substring(0, dotIndex); // الاسم
        let extension = filesName.substring(dotIndex + 1); // الامتداد
        // أضف العنصر الجديد إذا لم يكن موجودًا بالفعل          
        this.urls.push({
          id: 0,
          attachmentId: url,
          fileName: name,
          fileExtension: extension,
          name: this.filesName[index]
        });
      }
    });
    this.processAttachments();
  }
  processAttachments() {
    this.attachments = []; // Resetting the array    


    this.attachments = [...this.urls]; // Create a shallow copy of `urls`

    this.sendFiles.emit(this.attachments);

  }
  onTableDataChange() {
    this.processAttachments();
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
          // this.urls.push(event.target.result);
          this.files.push(files[i]);
          this.filesName.push(files[i].name);
          this.fileExtension.push(files[i].name.includes('.') ? files[i].name.split('.').pop() || '' : '');
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

    if (this.urls && this.urls.length > 0) {

      this.urls.splice(index, 1);
      this.attachmentService.attachemntIdsList.splice(index, 1);
      this.files.splice(index, 1);
      this.filesName.splice(index, 1);
      this.fileExtension.splice(index, 1);
      this.editStates.splice(index, 1);

      this.cdRef.detectChanges();
    }
    this.processAttachments()

  }


  toggleEditState(index: number) {
    this.editStates[index] = !this.editStates[index];
  }
  downloadFile(url: any, fileName: string) {
    this.attachmentService.downloadAttachment(url.attachmentId, fileName, AttachmentFileTypeEnum.image);
  }

  reviewAttachment(fileName: any, url: any): void {
    this.httpService.getFullUrl(
      `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/DownloadBase64Attachment/` + url.attachmentId)
      .subscribe((apiResponse: any) => {
        if (apiResponse) {
          let base64Content = apiResponse.fileContent;
          const mimeType = apiResponse.base64Padding.split(';')[0].split(':')[1];

          base64Content = base64Content.replace(/[^A-Za-z0-9+/=]/g, '');
          while (base64Content.length % 4 !== 0) {
            base64Content += '=';
          }

          try {
            const byteCharacters = atob(base64Content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: mimeType });
            const unsafeUrl = URL.createObjectURL(blob);
            const newUrl = `${globalThis.location.origin}/accounting/attachment-view?url=${encodeURIComponent(unsafeUrl)}`;
            globalThis.open(newUrl, '_blank');
            this.ref.close(this.attachments);

          } catch (error) {
            console.error('Error decoding Base64 string:', error);
          }
        }
      });
  }

  // Helper function to handle downloading from base64 content
  private handleFileDownload(base64Content: string, base64Padding: string) {
    const mimeType = base64Padding.split(';')[0].split(':')[1];

    // Ensure valid base64 data
    base64Content = base64Content.replace(/[^A-Za-z0-9+/=]/g, '');
    while (base64Content.length % 4 !== 0) {
      base64Content += '=';
    }

    try {
      const byteCharacters = atob(base64Content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const unsafeUrl = URL.createObjectURL(blob);

      // Navigate to the attachment view component
      this.router.navigate(['/attachment-view'], { queryParams: { url: unsafeUrl } });
      this.ref.close(this.attachments);
    } catch (error) {
      console.error('Error decoding Base64 string:', error);
    }
  }


  updateFileName(index: number, newName: string, extension: string) {

    this.filesName[index] = newName.trim() + '.' + extension;
    this.attachmentService.filesName = [...this.filesName];
    this.urls.forEach((element: any, line: number) => {
      if (line == index) {
        element.fileName = newName.trim()
      }
      element.name = this.filesName[line]
    });
  }
  constructor(
    public attachmentService: AttachmentsService,
    private cdRef: ChangeDetectorRef,
    private httpService: HttpService,
    private enviormentService: EnvironmentService,
    private router: Router,
    private ref: DynamicDialogRef,
  ) {

  }
}

import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttachmentsService } from '../../services/attachment.service';
import { AttachmentDto, AttachmentFileTypeEnum, Pages } from '../../models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JournalEntryService } from 'projects/apps-accounting/src/app/modules/journal-entry/journal-entry.service';
import { switchMap } from 'rxjs';
import { EnvironmentService, HttpService } from 'shared-lib';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-upload-multipe-files',

  templateUrl: './upload-multipe-files.component.html',
  styleUrl: './upload-multipe-files.component.css',
})
export class UploadMultipeFilesComponent implements OnInit {
  constructor(public attachmentService: AttachmentsService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    private journalEntryService: JournalEntryService,
    private httpService: HttpService,
    private enviormentService: EnvironmentService,
    private router: Router,
    private ref: DynamicDialogRef,
    private fb: FormBuilder




  ) {

  }
 
  attachmentUrl: SafeResourceUrl = '';

  urls: any = [];
  files: any = [];
  filesName: string[] = [];
  arr: any[] = [];
  @Input() filesData: any;
  @Input() viewData: any;
  @Input() screen: any;

  @Input() imgExtentions = ['image/png', 'image/png', 'application/pdf'];
  @Output() sendFiles = new EventEmitter();
  editStates: boolean[] = [];
  fileUrl: any; // URL for the iframe
  showIframe: boolean = false; // Flag to show/hide the iframe

  showText: boolean = true;
  ngOnInit(): void {
    this.urls = this.fb.array([]); // تعريف FormArray
  
    this.urls = this.attachmentService.filesUrls;
    this.filesName = this.attachmentService.filesName;
    this.files = this.attachmentService.files;
    this.attachmentService.filesInfo.push(this.attachmentService.filesUrls);

    console.log(this.filesData, "filesDatafilesData");
  
    if (this.filesData && this.filesData.length > 0 && this.urls.length === 0) {
      this.filesData.forEach((file: any) => {
        this.urls.push(file.attachmentId); // استخدم attachmentId لعرضه في الجدول
        this.filesName.push(file.name);
        this.files.push(file); // يمكنك أيضاً الاحتفاظ بالكائن الكامل للملف إذا كنت بحاجة إلى ذلك
        this.editStates.push(false); // إضافة حالة تحرير جديدة
      });
    }
  }
  
  onSelectFile(event: any) {
    let file = event.target.files;
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
    
        reader.onload = ((fileItem) => {
          return (event: any) => {
            // this.urls.push(event.target.result); // يمكن تعديل ذلك ليتناسب مع ما تريد عرضه
            this.files.push(fileItem);
            this.filesName.push(fileItem.name);
          
            let fileInfo: AttachmentDto = {
              fileContent: event.target.result as string,
              fileName: fileItem.name,
            };
            this.attachmentService.filesInfo.push(fileInfo);
            this.attachmentService.uploadValidatedFile(fileInfo);
            setTimeout(() => {
              this.attachmentService.attachemntIdsList.forEach((element:any) => {
                
    if (!this.urls.find((url:any) => url === element)) {
      this.urls.push(element);
  }
              });
            }, 2000);
            //  this.sendFiles.emit(this.urls);

            this.editStates.push(false); // Initialize edit state for new file
    
            this.cdRef.detectChanges();
          };
        })(file[i]);
    
        reader.readAsDataURL(file[i]);
        console.log(this.attachmentService.attachemntIdsList[0] ,"attachemntIdsList");
        console.log(this.urls ,"urls");
        console.log(this.filesData ,"filesDatafilesData");
        console.log(this.filesName ,"filesName");
         this.arr = this.filesData||[]
        console.log(this.arr ,"oooo");
        setTimeout(() => {
          let index = 0; // Use a more descriptive name

          this.urls.forEach((url: string) => { 

            if (!this.arr?.find((attachment:any) => attachment.attachmentId == url)) {
              this.arr.push({
                id: 0,
                attachmentId: url,
                name: this.filesName[index] // Assuming filesName has a direct mapping with urls
              });
              console.log(this.arr ,"sssssss");
          
            }else{
             // this.arr = this.filesData

            }
            index++;

          });
                  
                  console.log(this.arr ,"aaaaaaaa");
                  this.sendFiles.emit(this.arr);

        }, 3000);


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
          this.sendFiles.emit({
           name : this.filesName,
           attachmentId : this.urls
          })
         // this.sendFiles.emit({});

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

  removeFile( test:any , url:any , index: number) {
    console.log(test ,url, "11111111111");

        if (this.filesData && this.filesData.length > 0) {
          // تحقق إذا كان الملف موجودًا في الملفات المحملة مسبقًا
          const existingFile = this.filesData.find((file: any) => file.attachmentId === url || file.name === test);
          console.log(existingFile, "22222222222");

          if (existingFile) {
            console.log(existingFile.attachmentId, "existingFile");
            if (this.screen == Pages.JournalEntry) {
            this.journalEntryService.deleteAttachment(existingFile.id).then(() => {
              this.journalEntryService.attachmentDeletedObser.subscribe((res: boolean) => {
                if (res) {
                  this.urls.splice(index, 1);
                  this.files.splice(index, 1);
                  this.filesName.splice(index, 1);
                  this.editStates.splice(index, 1);
                
                  // Optionally, log the updated arrays to check if they're correctly updated
                
                  // Detect changes to update the view
                  this.cdRef.detectChanges();
                }
              });
            });
            
            }
            
          } else {
            this.urls.splice(index, 1);
            this.files.splice(index, 1);
            this.filesName.splice(index, 1);
            this.editStates.splice(index, 1);
          
            // Optionally, log the updated arrays to check if they're correctly updated
            console.log(this.urls, this.files, this.filesName, this.editStates, "Updated arrays after removal");
          
            // Detect changes to update the view
            this.cdRef.detectChanges();
          }
        }else {
          this.urls.splice(index, 1);
          this.files.splice(index, 1);
          this.filesName.splice(index, 1);
          this.editStates.splice(index, 1);
        
          // Optionally, log the updated arrays to check if they're correctly updated
          console.log(this.urls, this.files, this.filesName, this.editStates, "Updated arrays after removal");
        
          // Detect changes to update the view
          this.cdRef.detectChanges();
        }
      
   
  }


  toggleEditState(index: number) {
    this.editStates[index] = !this.editStates[index];
  }
  downloadFile(url: string, fileName: string) {
    if (this.filesData && this.filesData.length > 0) {
      // تحقق إذا كان الملف موجودًا في الملفات المحملة مسبقًا
      const existingFile = this.filesData.find((file: any) => file.attachmentId === url || file.name === fileName);
      
      if (existingFile) {
        console.log(existingFile.attachmentId, "ddddddddddddddddd");
        this.attachmentService.downloadAttachment(existingFile.attachmentId, fileName, AttachmentFileTypeEnum.image);
      } else {
        // إذا لم يكن الملف موجودًا، قم بتحميله مباشرة
        console.log('File not found in existing files, downloading new file.');
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
      }
    } else {
      // إذا كانت filesData فارغة، قم بتحميل الملف مباشرة
      console.log('filesData is empty, downloading new file.');
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    }
  }
  


  reviewAttachment(fileName: any, url: string): void {
    if (this.filesData && this.filesData.length > 0) {
      const existingFile = this.filesData.find(
        (file: any) => file.attachmentId === url || file.name === fileName
      );
  
      if (!existingFile) {
        this.router.navigate(['/attachment-view'], { queryParams: { url: url } });
        this.ref.close(this.urls);
        return
      }
  
      this.httpService
        .getFullUrl(
          `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/DownloadBase64Attachment/` +
            existingFile.attachmentId
        )
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
  
              // توجيه إلى مكون العرض مع الرابط
          //     const currentUrl = window.location.href; // الحصول على الرابط الحالي
          // console.log(currentUrl ,"lllllllllllll");
          // return

              this.router.navigate(['/attachment-view'], { queryParams: { url: unsafeUrl } });
              this.ref.close(this.urls)
              
            } catch (error) {
              console.error('Error decoding Base64 string:', error);
            }
          }
        });
    }
  }
 
  
  // وظيفة لعرض الملف مباشرة من Base64
  private showFile(base64Content: string, base64Padding: string) {
    const mimeType = base64Padding.split(';')[0].split(':')[1];
  
    // تأكد من صحة بيانات Base64
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
  
      // توجيه إلى مكون العرض مع الرابط
      this.router.navigate(['/attachment-view'], { queryParams: { url: unsafeUrl } });
      this.ref.close(this.urls);
    } catch (error) {
      console.error('Error decoding Base64 string:', error);
    }
  }
  
  // وظيفة لعرض الملف من الرابط مباشرة
  private showFileFromUrl(url: string) {
    // توجيه إلى مكون العرض مع الرابط
    this.router.navigate(['/attachment-view'], { queryParams: { url: url } });
    this.ref.close(this.urls);
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
      this.ref.close(this.urls);
    } catch (error) {
      console.error('Error decoding Base64 string:', error);
    }
  }
  
  
  
 
 updateFileName(index: number, newName: string) {
  setTimeout(() => {
    this.filesName[index] = newName;
    this.attachmentService.filesName = [...this.filesName];
  });
}

getFileType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase(); // Use optional chaining here
    return '.' +extension!
   
 
  
}
}

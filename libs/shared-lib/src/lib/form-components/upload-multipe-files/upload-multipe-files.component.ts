import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttachmentsService } from '../../services/attachment.service';
import { AttachmentDto, AttachmentFileTypeEnum, Pages } from '../../models';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { JournalEntryService } from 'projects/apps-accounting/src/app/modules/journal-entry/journal-entry.service';
import { switchMap } from 'rxjs';
import { EnvironmentService, HttpService } from 'shared-lib';

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
    private enviormentService: EnvironmentService




  ) {

  }
  ngOnInit(): void {
    this.urls = this.attachmentService.filesUrls
    this.filesName = this.attachmentService.filesName
    this.files = this.attachmentService.files
    console.log(this.filesData ,"filesDatafilesData");
    // if(this.filesData.length>0){
    //   this.urls= this.filesData
    // }
    if (this.filesData && this.filesData.length > 0) {
      this.filesData.forEach((file:any) => {
        this.urls.push(file.attachmentId);  // استخدم attachmentId لعرضه في الجدول
        this.filesName.push(file.name);
        this.files.push(file);  // يمكنك أيضاً الاحتفاظ بالكائن الكامل للملف إذا كنت بحاجة إلى ذلك
        this.editStates.push(false);  // إضافة حالة تحرير جديدة
      });
    }
  }
  attachmentUrl: SafeResourceUrl = '';

  urls: any = [];
  files: any = [];
  filesName: string[] = [];
  @Input() filesData: any;
  @Input() viewData: any;
  @Input() screen: any;

  @Input() imgExtentions = ['image/png', 'image/png', 'application/pdf'];
  @Output() sendFiles = new EventEmitter();
  editStates: boolean[] = [];

  showText: boolean = true;
  // onSelectFile(event: any) {
  //   let file = event.target.files;
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       var reader = new FileReader();

  //       reader.onload = (event: any) => {
  //         this.urls.push(event.target.result);
  //         this.attachmentService.filesUrls = this.urls

  //         this.files.push(file[i]);
  //         this.attachmentService.files = this.files
  //         this.filesName.push(file[i].name);
  //         this.attachmentService.filesName =  this.filesName

  //         let fileInfo: AttachmentDto = {
  //           fileContent: this.urls[i] as string,
  //           fileName: this.filesName[i],
  //         };
  //         this.attachmentService.filesInfo.push(fileInfo);
  //         this.attachmentService.uploadValidatedFile(fileInfo);

  //         this.editStates.push(false); // Initialize edit state for new file
  //       };

  //       reader.readAsDataURL(event.target.files[i]);
  //     }
  //   }
  // }
  // onSelectFile(event: any) {
  //   let file = event.target.files;
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       var reader = new FileReader();
  
  //       // Capture the current file and index inside a closure
  //       reader.onload = ((fileItem, index) => {
  //         return (event: any) => {
  //           this.urls.push(event.target.result);
  //           console.log(event.target.result, "kkkkkkkkkk");
  //           this.attachmentService.filesUrls = [...this.urls];
  // console.log(this.attachmentService.filesUrls , "kkkkkkkkkk");
  
  //           this.files.push(fileItem);
  //           this.attachmentService.files = [...this.files];
  
  //           this.filesName.push(fileItem.name);
  //           this.attachmentService.filesName = [...this.filesName];
  
  //           let fileInfo: AttachmentDto = {
  //             fileContent: event.target.result as string,
  //             fileName: fileItem.name,
  //           };
  //           this.attachmentService.filesInfo.push(fileInfo);
  //           this.attachmentService.uploadValidatedFile(fileInfo);
  
  //           this.editStates.push(false); // Initialize edit state for new file
  
  //           // Trigger change detection manually to fix ExpressionChangedAfterItHasBeenCheckedError
  //           this.cdRef.detectChanges();
  //         };
  //       })(file[i], i);
  
  //       reader.readAsDataURL(file[i]);
  //     }
  //   }
  // }
  onSelectFile(event: any) {
    let file = event.target.files;
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
    
        reader.onload = ((fileItem) => {
          return (event: any) => {
            this.urls.push(event.target.result); // يمكن تعديل ذلك ليتناسب مع ما تريد عرضه
            this.files.push(fileItem);
            this.filesName.push(fileItem.name);
  
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

  removeFile( test:any , url:any , index: number) {
     
        if (this.filesData && this.filesData.length > 0) {
          // تحقق إذا كان الملف موجودًا في الملفات المحملة مسبقًا
          const existingFile = this.filesData.find((file: any) => file.attachmentId === url || file.name === test);
          
          if (existingFile) {
            console.log(existingFile.attachmentId, "existingFile");
            if (this.screen == Pages.JournalEntry) {
            this.journalEntryService.deleteAttachment(existingFile.id).then(() => {
              this.journalEntryService.attachmentDeletedObser.subscribe((res: boolean) => {
                if (res) {
                  this.urls.splice(index, 1);
                  this.files.splice(index, 1);
                  this.editStates.splice(index, 1);
                }
              });
            });
            
            }
            
          } else {
            this.urls.splice(index, 1);
            this.files.splice(index, 1);
            this.editStates.splice(index, 1); // Remove edit state
          }
        }
      
   
  }


  toggleEditState(index: number) {
    this.editStates[index] = !this.editStates[index];
  }

  downloadFile(url: string, fileName: string) {
    if (this.filesData && this.filesData.length > 0) {
      // تحقق إذا كان الملف موجودًا في الملفات المحملة مسبقًا
      const existingFile = this.filesData.find((file: any) => file.attachmentId === url || file.name === fileName);
console.log(existingFile.attachmentId ,"ddddddddddddddddd");

    this.attachmentService.downloadAttachment(existingFile.attachmentId, fileName, AttachmentFileTypeEnum.image);
    }
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  }
  reviewAttachment(filesName:any , url: string): void {
    if (this.filesData && this.filesData.length > 0) {

    const existingFile = this.filesData.find((file: any) => file.attachmentId === url || file.name === filesName);
    console.log(existingFile,"existingFileexistingFile");
    this.attachmentService.getAttachment(existingFile.attachmentId)  
    this.attachmentService.viewAttachment(existingFile.attachmentId)  

      
  }

    // const safeUrl:any = this.sanitizer.bypassSecurityTrustResourceUrl('TempFile&2db72fc3-f728-45d2-ba9e-08dce089adf8');
  }
  
 
 updateFileName(index: number, newName: string) {
  setTimeout(() => {
    this.filesName[index] = newName;
    this.attachmentService.filesName = [...this.filesName];
  });
}


}

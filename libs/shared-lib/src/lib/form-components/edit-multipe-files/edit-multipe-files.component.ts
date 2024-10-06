import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { JournalEntryService } from 'projects/apps-accounting/src/app/modules/journal-entry/journal-entry.service';
import { AttachmentDto, AttachmentFileTypeEnum, AttachmentsService, EnvironmentService, HttpService, Pages } from 'shared-lib';

@Component({
  selector: 'lib-edit-multipe-files',
  templateUrl: './edit-multipe-files.component.html',
  styleUrl: './edit-multipe-files.component.scss'
})
export class EditMultipeFilesComponent {
  constructor(public attachmentService: AttachmentsService,
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
  fileExtension: string[] = [];
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
    console.log(this.attachmentService.attachemntIdsList,"kkkkkkkkkkkkkk");
    this.fileExtension = this.attachmentService.fileExtension;
    this.files = this.attachmentService.files;
    this.attachmentService.filesInfo.push(this.attachmentService.filesUrls);


    if (this.filesData && this.filesData.length > 0) {
      this.filesData.forEach((file: any) => {
        this.filesName.push(file.name);
        this.fileExtension.push(file.name.split('.').pop());

        this.files.push(file); // يمكنك أيضاً الاحتفاظ بالكائن الكامل للملف إذا كنت بحاجة إلى ذلك
        this.editStates.push(false); // إضافة حالة تحرير جديدة
      });
    }
     this.urls = this.attachmentService.attachemntIdsList
    this.subscrip()
  }

  // onSelectFile(event: any) {
  //   let file = event.target.files;
  //   if (event.target.files && event.target.files[0]) {
  //     const filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       const reader = new FileReader();

  //       reader.onload = ((fileItem) => {
  //         return (event: any) => {
  //           this.files.push(fileItem);
  //           this.filesName.push(fileItem.name);

  //           let fileInfo: AttachmentDto = {
  //             fileContent: event.target.result as string,
  //             fileName: fileItem.name,
  //           };
  //           this.attachmentService.filesInfo.push(fileInfo);
  //           this.attachmentService.uploadValidatedFile(fileInfo);


  //           this.editStates.push(false); // Initialize edit state for new file

  //           this.cdRef.detectChanges();
            
  //         };
  //       })(file[i]);

  //       reader.readAsDataURL(file[i]);

  //       this.arr = this.filesData || []
     
  //     }
  //   }
  // }
  // subscrip(){
  //   this.attachmentService.attachmentIdsObservable.subscribe((res:any)=>{
  //     console.log(res , "attachmentIdsObservableattachmentIdsObservableattachmentIdsObservable");
  //     res.forEach((url: any, index: number) => {
  //       if (!this.urls.find((item:any) => item.attachmentId === url)) {
  //           this.urls.push({
  //               id: 0,
  //               attachmentId: url,
  //               name:this.filesName[index] || url.name // Fallback if filesName is undefined
  //           });

  //           console.log(this.urls, "arr");
  //           console.log(this.filesName, "filesNamefilesName");
  //       }
  //   });
  //      this.arr=this.urls
  //      console.log(this.arr ,"this.arr");
  //      console.log(this.urls ,"this.urls");
       
  //   // this.processAttachments();
     
  //   })
  // }
  onSelectFile(event: any) {
    let files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
  
        reader.onload = ((fileItem) => {
          return (event: any) => {
            // Pushing the file information to `files` array
            this.files.push(fileItem);
            this.filesName.push(fileItem.name);
            this.fileExtension.push(fileItem.name.includes('.') ? files[i].name.split('.').pop() || '' : '');

            // Create an object of AttachmentDto and push to attachmentService.filesInfo
            let fileInfo: AttachmentDto = {
              fileContent: event.target.result as string,
              fileName: fileItem.name,
            };
            this.attachmentService.filesInfo.push(fileInfo);
            this.attachmentService.uploadValidatedFile(fileInfo);
  
            // Push an object with id, attachmentId, and name to the `urls` array
            // this.urls.push({
            //   id: 0,
            //   attachmentId: fileItem.name, // Set attachmentId to the file name or another unique identifier
            //   name: fileItem.name
            // });
            // this.urls = this.attachmentService.attachemntIdsList.map(attachment => {
        
            //   return {
            //     attachmentId: attachment // Create an object or simply return the attachment ID
            //   };
            // });
            this.save()
  
            this.editStates.push(false); // Initialize edit state for the new file
            this.cdRef.detectChanges();
          };
        })(files[i]);
  
        reader.readAsDataURL(files[i]);
      }
    }
  }
  
  subscrip() {
    this.attachmentService.attachmentIdsObservable.subscribe((res: any) => { 
      console.log(res ,"yyyyyyyyyyyyyyyyy");
      this.urls.forEach((element:any , index :number) => {
        if(!element.attachmentId){
          this.urls.splice(index, 1)
          this.urls.push({
            id:0,
            attachmentId:element,
            name:this.filesName[index]
          })
        }
      });
      // res.forEach((url: any, index: number) => {
      //   const existingItem = this.urls.find((item: any) => item.attachmentId != url.attachmentId || item.attachmentId != url)
      //     if (!existingItem) {
      //       console.log(url ,"44444444444");

      //       this.urls.push({
      //         id: 0,
      //         attachmentId: url,
      //         name:this.filesName[index]||url.name
      //       });
      //     }
      //   });
        this.save()

      });
  console.log(this.urls ,"ggggggggggggggggg");
  
    // });
  }
  
save(){
  this.arr=[]
  console.log(this.filesName ,"filesName");
  this.urls.forEach((element:any , index :number) => {
    if(element.attachmentId){
      this.arr.push(element)
    }else{
      this.arr.push({
        id:0,
        attachmentId:element,
        name:this.filesName[index]
      })
    }
  });
  // this.arr = [...this.urls]; // Create a shallow copy of `urls`
  this.sendFiles.emit(this.arr);
  // this.attachmentService.attachemntIdsList = this.arr
  console.log(this.arr ,"arrrrrrrr");

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

          this.sendFiles.emit({
            name: this.filesName,
            attachmentId: this.urls
          })

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

  removeFile(test: any, url: any, index: number) {
      console.log("1111111111111" ,url , test );
      
    if (this.urls && this.urls.length > 0) {
      // تحقق إذا كان الملف موجودًا في الملفات المحملة مسبقًا
      const existingFile = this.filesData.find((file: any) => file.attachmentId === url.attachmentId|| file.name === test);
console.log(existingFile);

      if (existingFile) {
        if (this.screen == Pages.JournalEntry) {
          console.log("donecccccccccccc");
          
          this.journalEntryService.deleteAttachment(existingFile.id).then(() => {
            this.journalEntryService.attachmentDeletedObser.subscribe((res: boolean) => {
              if (res) {
                this.urls.splice(index, 1);
                this.files.splice(index, 1);
                this.filesName.splice(index, 1);
                this.fileExtension.splice(index, 1);
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
        this.fileExtension.splice(index, 1);
        this.editStates.splice(index, 1);
        this.cdRef.detectChanges();
      }
    } else {
      this.urls.splice(index, 1);
      this.files.splice(index, 1);
      this.filesName.splice(index, 1);
      this.fileExtension.splice(index, 1);
      this.editStates.splice(index, 1);

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
        this.attachmentService.downloadAttachment(existingFile.attachmentId, fileName, AttachmentFileTypeEnum.image);
      } else {
        // إذا لم يكن الملف موجودًا، قم بتحميله مباشرة
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
      }
    } else {
      // إذا كانت filesData فارغة، قم بتحميل الملف مباشرة
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
        this.ref.close(this.arr);
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
              this.router.navigate(['/attachment-view'], { queryParams: { url: unsafeUrl } });
              this.ref.close(this.arr)

            } catch (error) {
              console.error('Error decoding Base64 string:', error);
            }
          }
        });
    }else{
      this.httpService.getFullUrl(
        `${this.enviormentService.AttachmentServiceConfig.AttachmentServiceUrl}/api/Attachment/DownloadBase64Attachment/` +
        url
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
            this.router.navigate(['/attachment-view'], { queryParams: { url: unsafeUrl } });
            this.ref.close(this.arr)

          } catch (error) {
            console.error('Error decoding Base64 string:', error);
          }
        }
      });
    }
    this.save()
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
      this.ref.close(this.arr);
    } catch (error) {
      console.error('Error decoding Base64 string:', error);
    }
  }

  // وظيفة لعرض الملف من الرابط مباشرة
  private showFileFromUrl(url: string) {
    // توجيه إلى مكون العرض مع الرابط
    this.router.navigate(['/attachment-view'], { queryParams: { url: url } });
    this.ref.close(this.arr);
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
      this.ref.close(this.arr);
    } catch (error) {
      console.error('Error decoding Base64 string:', error);
    }
  }




  updateFileName(index: number, newName: string) {
      this.filesName[index] =  newName.trim();
      this.attachmentService.filesName = this.filesName;
    
    this.urls[index].name=newName
  }

  // getFileType(fileName: string): string {
  //   const extension = fileName.split('.').pop()?.toLowerCase(); // Use optional chaining here
  //   return '.' + extension!
  // }
  getFileType(fileName: string | undefined): string {
    if (!fileName) {
      return 'unknown'; // Return a default value if fileName is undefined
    }
  
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'unknown';
  }
  
}

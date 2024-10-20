import { Component, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AttachmentsService, ComponentType, customValidators } from 'shared-lib';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss'
})
export class AttachmentsComponent implements OnInit  {

  attachments: FormArray;
  filesData : any = []
  allAttachments : any = []
  journalEntryAttachments : any = []
  edit:boolean 
  add:boolean
  viewData:boolean
  screen:any
  addAttachment() {
    this.attachments.push(this.fb.group({
      attachmentId: ['', customValidators.required],
      name: ['', customValidators.required]
    }))
  }
 

  removeAttachment(index: number){
    this.attachments.removeAt(index);
  }

  constructor(
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public attachmentService: AttachmentsService,
    ) {
    
  }
  ngOnInit() {
    if(this.config.data.page == ComponentType.edit ){
     this.add =false;
     this.edit =true;
     this.journalEntryAttachments = this.config.data.journalEntryAttachments
     if(this.config.data.journalEntryAttachments.length>0){
      this.attachmentService.attachemntIdsList=this.config.data.journalEntryAttachments
      this.screen=this.config.data.screen
     }
    }else if(this.config.data.page == ComponentType.add){
      this.edit =false;
     this.add =true;
    }else if(this.config.data.page == ComponentType.view){
      this.add =false;
      this.edit =true;
      this.journalEntryAttachments = this.config.data.journalEntryAttachments
      
      if(this.journalEntryAttachments.length>0){
       this.attachmentService.attachemntIdsList=this.config.data.journalEntryAttachments
      }
    this.viewData=true
    }
    }

  files(data:any) {
    this.allAttachments = data
  
  }
  onCancel(){
    this.ref.close(this.allAttachments)

  }
  save(){
    this.ref.close(this.allAttachments)
  }

}

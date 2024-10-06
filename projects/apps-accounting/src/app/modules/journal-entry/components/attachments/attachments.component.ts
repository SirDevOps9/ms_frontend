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
  test : any = []
  journalEntryAttachments : any = []
  edit:boolean 
  add:boolean
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
     }
    }else if(this.config.data.page == ComponentType.add){
      this.edit =false;
     this.add =true;
    }
    }

  files(data:any) {
    this.test = data
    this.attachmentService.attachemntIdsList = data
    this.journalEntryAttachments = data
  }
  onCancel(){
    this.ref.close()
  }
  save(){
    console.log(this.test ,"ffffffffffffffffff");
    this.attachmentService.attachemntIdsList = this.test

    this.ref.close(this.test)
  }

}

import { Component, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss'
})
export class AttachmentsComponent  {

  attachments: FormArray;
  filesData : any = []
  test : any = []
  addAttachment() {
    this.attachments.push(this.fb.group({
      attachmentId: ['', customValidators.required],
      name: ['', customValidators.required]
    }))
  }

  removeAttachment(index: number){
    this.attachments.removeAt(index);
  }

  constructor(public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    ) {
      this.filesData = config.data;
      console.log(this.filesData , "1111111111111111111111")
  }

  files(data:any) {
    this.test = data
  }
  onCancel(){
    this.ref.close()
  }
  save(){
    console.log(this.test ,"ffffffffffffffffff");
    
    this.ref.close(this.test)
  }

}

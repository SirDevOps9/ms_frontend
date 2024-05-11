import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.scss'
})
export class AttachmentsComponent {

  attachments: FormArray;

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
      this.attachments = config.data.attachments;
  }
}

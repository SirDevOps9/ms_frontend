import { Component, EventEmitter, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'lib-popup-page',
  templateUrl: './popup-page.component.html',
  styleUrl: './popup-page.component.scss'
})
export class PopupPageComponent {
  @Input() title: string;
  @Input() btnTitle: string = "Save"
  @Input() save: boolean=true;
  @Input() export: boolean=true;
  
  @Input() footer: boolean=true;
  @Input() disabled: boolean;
  @Input() closeFunction: () => void;
  @Input() saveFunction: () => void;
  @Input() showCancel : boolean = true
  @Input() showSave : boolean = true
  @Input() titleSave :string
  @Input() showSecondSave : boolean = true
  @Output() Submit = new EventEmitter<boolean>();
  @Output() Cancel = new EventEmitter<boolean>();

  close() {
    if (this.closeFunction) {
      this.closeFunction();  // Execute the passed function
    }else{
      this.Cancel.emit(true);

    }
  }
  
  onSubmit() {
    this.Submit.emit(true);
    
  }
  onCancel() {
    this.Cancel.emit(true);
    
  }
  constructor(
    private ref: DynamicDialogRef,
  ) {}
}

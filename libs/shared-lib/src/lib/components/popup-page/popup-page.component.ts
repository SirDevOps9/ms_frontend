import { Component, EventEmitter, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'lib-popup-page',
  templateUrl: './popup-page.component.html',
  styleUrl: './popup-page.component.scss'
})
export class PopupPageComponent {
  @Input() title: string;
  @Input() save: boolean=true;
  @Input() footer: boolean=true;
  @Input() disabled: boolean;
  @Input() closeFunction: () => void;
  @Input() saveFunction: () => void;
  @Output() Submit = new EventEmitter<boolean>();

  close() {
    if (this.closeFunction) {
      this.closeFunction();  // Execute the passed function
    }
  }
  
  onSubmit() {
    this.Submit.emit(true);
    
  }
  constructor(
    private ref: DynamicDialogRef,
  ) {}
}

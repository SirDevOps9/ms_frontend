import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
constructor(private ref : DynamicDialogRef){}
  onCancel() {
    this.ref.close()
  }
  onSubmit() {
    this.ref.close(true)

  }
}

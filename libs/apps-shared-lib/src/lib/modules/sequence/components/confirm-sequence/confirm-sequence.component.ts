import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'lib-confirm-sequence',
  templateUrl: './confirm-sequence.component.html',
  styleUrl: './confirm-sequence.component.scss'
})
export class ConfirmSequenceComponent {
  constructor(private ref : DynamicDialogRef , private config : DynamicDialogConfig){}
  data : any = []
  ngOnInit(): void {
    this.data = this.config.data
  }
  onCancel() {
    this.ref.close()
  }
  onSubmit() {
    this.ref.close(true)

  }
}

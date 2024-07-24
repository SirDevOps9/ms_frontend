import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-opening-balance',
  templateUrl: './confirm-opening-balance.component.html',
  styleUrl: './confirm-opening-balance.component.scss'
})
export class ConfirmOpeningBalanceComponent implements OnInit {
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

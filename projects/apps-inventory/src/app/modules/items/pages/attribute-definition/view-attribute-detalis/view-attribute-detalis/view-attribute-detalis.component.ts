import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemTypeDto } from '../../../../models/itemTypeDto';

@Component({
  selector: 'app-view-attribute-detalis',
  templateUrl: './view-attribute-detalis.component.html',
  styleUrls: ['./view-attribute-detalis.component.scss']
})
export class ViewAttributeDetalisComponent {
  data: ItemTypeDto[] = [];

  constructor(private ref : DynamicDialogRef , private config : DynamicDialogConfig){}

  ngOnInit() {
    this.data = this.config.data.itemAttributes
  }

  onCancel() {
    this.ref.close(true)
  }
  onSubmit(){}
}

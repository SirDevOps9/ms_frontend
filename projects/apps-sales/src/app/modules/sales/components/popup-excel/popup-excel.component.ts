import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-popup-excel',
  templateUrl: './popup-excel.component.html',
  styleUrl: './popup-excel.component.scss'
})
export class PopupExcelComponent {
  listOfExcel: any[] = [];

  cancel() {
    this.ref.close()
  }

  save() {
    this.ref.close(this.listOfExcel)
  }
  getValueOfExcel(e: any) {
    const keys = ['itemCode', 'itemName', 'uomCode', 'UOMName', 'itemVariantCode', 'ItemVariantName', 'price'];

    this.listOfExcel = e.slice(1).map((arr: any) => {
      return keys.reduce((obj: any, key, index) => {
        obj[key] = arr[index];
        return obj;
      }, {});
    });
  }
  constructor(
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
  ) {

  }
}

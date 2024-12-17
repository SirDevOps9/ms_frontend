import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AttachmentFileTypeEnum, AttachmentsService } from 'shared-lib';

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
  downloadExcel(){
    this.attachmentsService.downloadAttachment('AttachmentFile&697934BF-4E8F-4901-8DB8-DA46ECB5F2D1' , 'حقهؤث' , AttachmentFileTypeEnum.pdf )
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
    private attachmentsService:AttachmentsService
  ) {

  }
}

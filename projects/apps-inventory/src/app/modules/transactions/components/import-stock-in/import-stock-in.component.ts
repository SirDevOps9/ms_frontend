import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LanguageService, ToasterService } from 'shared-lib';

@Component({
  selector: 'app-import-stock-in',
  templateUrl: './import-stock-in.component.html',
  styleUrl: './import-stock-in.component.scss'
})
export class ImportStockInComponent {
  listOfExcel: any[] = [];
  cancel() {
    this.ref.close()
  }
  save() {
    this.ref.close(this.listOfExcel)
  }
  uploadChanged(e:any){
      const keys = ['itemCode', 'itemName', 'uomCode', 'UOMName', 'itemVariantCode', 'ItemVariantName','price'];
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
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private toasterService: ToasterService,
  ) {
  }
}










import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LanguageService, ToasterService } from 'shared-lib';

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
  test(e:any){
    console.log(e ,"44444444");
   

      const keys = ['itemCode', 'itemName', 'uomCode', 'UOMName', 'itemVariantCode', 'ItemVariantName','price'];
  
      this.listOfExcel = e.slice(1).map((arr: any) => {
        return keys.reduce((obj: any, key, index) => {
          obj[key] = arr[index];
          return obj;
        }, {});
      });
  
  
      console.log(this.listOfExcel ,"lllllllllllll");

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

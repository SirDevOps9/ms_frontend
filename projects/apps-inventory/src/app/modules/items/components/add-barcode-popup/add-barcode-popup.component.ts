import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-add-barcode-popup',
  templateUrl: './add-barcode-popup.component.html',
  styleUrl: './add-barcode-popup.component.scss'
})
export class AddBarcodePopupComponent implements OnInit {
  @ViewChild('barcodeImage', { static: true }) barcodeImage: ElementRef;
  @ViewChild('barCodeWrapper', { static: false }) barCodeWrapper!: ElementRef;

  constructor(private ref : DynamicDialogRef , private config : DynamicDialogConfig){

  }
  ngOnInit(): void {
    console.log(this.config.data)
    console.log(this.barcodeImage)
     if (this.barcodeImage && this.config.data) {
    JsBarcode(this.barcodeImage.nativeElement, this.config.data, {
      format: 'CODE128', // You can change the format if needed
    });
  }
  }

  // console.log(barcodeValue)
  // console.log(this.barcodeImage)
  // if (this.barcodeImage && e) {
  //   JsBarcode(this.barcodeImage.nativeElement, e, {
  //     format: 'CODE128', // You can change the format if needed
  //   });
  // }

  onCancel() {
    this.ref.close()
  }

  printBarCode() {
    const printContent = this.barCodeWrapper.nativeElement.innerHTML;
    const WindowPrt = window.open('', '', 'width=600,height=600');
    if (WindowPrt) {
      WindowPrt.document.write('<html><head><title>Print Barcode</title></head><body>');
      WindowPrt.document.write(printContent);
      WindowPrt.document.write('</body></html>');
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
    }
  }
  
}
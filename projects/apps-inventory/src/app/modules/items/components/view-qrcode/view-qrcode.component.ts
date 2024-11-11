import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-view-qrcode',
  templateUrl: './view-qrcode.component.html',
  styleUrl: './view-qrcode.component.scss'
})
export class ViewQRcodeComponent implements OnInit{
  @ViewChild('QrCodeWrapper', { static: false }) QrCodeWrapper!: ElementRef;

  qrData : string = ''
  constructor(private ref : DynamicDialogRef , private config : DynamicDialogConfig){}
  ngOnInit(): void {
   this.qrData = this.config.data
  }

  onCancel() {
    this.ref.close()
  }

  printQrCode() {
    // Convert the QR code to a canvas
    const qrCanvas = this.QrCodeWrapper.nativeElement.querySelector('canvas');
    const imgData = qrCanvas.toDataURL('image/png');

    // Open a new window for printing
    const WindowPrt = window.open('', '', 'width=600,height=600');
    if (WindowPrt) {
      WindowPrt.document.write('<html><head><title>Print QR Code</title></head><body>');
      WindowPrt.document.write(`<img src="${imgData}" />`);
      WindowPrt.document.write('</body></html>');
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
    }
    
  }

}

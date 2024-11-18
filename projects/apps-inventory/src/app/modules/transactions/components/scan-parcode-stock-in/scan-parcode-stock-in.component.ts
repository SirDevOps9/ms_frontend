import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { ItemsService } from '../../../items/items.service';
@Component({
  selector: 'app-scan-parcode-stock-in',
  templateUrl: './scan-parcode-stock-in.component.html',
  styleUrl: './scan-parcode-stock-in.component.scss'
})
export class ScanParcodeStockInComponent implements OnInit {
  scanForm: FormGroup;
  inputValue: any;
  @Output() barcodeScanned = new EventEmitter<any>();
  @ViewChild('scanner') scanner: ZXingScannerComponent;
  availableDevices: MediaDeviceInfo[] = [];
  scannedQRCode: string = '';
  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private itemsService: ItemsService,
    private cdr: ChangeDetectorRef
  ) {
    this.scanForm = this.fb.group({
      scan: new FormControl(''),
    });
  }
  ngOnInit() {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => {
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(devices => {
      this.availableDevices = devices.filter(device => device.kind === 'videoinput');
    })
    .catch(err => {
      console.error('Error fetching devices or accessing camera: ', err);
    });
  }
  onScanSuccess(qrCode: any): void {
    this.scannedQRCode = qrCode;
    console.log('Scanned QR Code:', qrCode);
    this.scanForm.controls['scan'].setValue(qrCode);
    // this.barcodeScanned.next(qrCode);
    this.onCancel(qrCode);
  }
  onInputManualBarcode(event: any): void {
    this.inputValue = event;
    if (this.inputValue) {
     
    }
  }
  onCancel(data: any) : any {
    this.ref.close(data);
  }
  onSubmit(): void {
  }
}
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemsService } from '../../../items.service';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
@Component({
  selector: 'app-scan-parcode-stock-in',
  templateUrl: './scan-parcode-stock-in.component.html',
  styleUrl: './scan-parcode-stock-in.component.scss'
})
export class ScanParcodeStockInComponent implements OnInit {
  itemDefinitionForm: FormGroup;
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
    this.itemDefinitionForm = this.fb.group({
      warehouseId: new FormControl(''),
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
    this.itemDefinitionForm.controls['warehouseId'].setValue(qrCode);
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
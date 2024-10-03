import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from '../../../items.service';
import { AddTransaction } from '../../../models/AddTransaction';
import { DatePipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ScanbarcodeComponent } from '../scanBarCode/scanbarcode/scanbarcode.component';

@Component({
  selector: 'app-add-stock-in',
  templateUrl: './add-stock-in.component.html',
  styleUrls: ['./add-stock-in.component.scss'],
  providers: [DatePipe]
})
export class AddStockInComponent implements OnInit {
  stockInForm: FormGroup;
  dataList: any[] = [];
  Datas: any=[]; // This will be bound to the table

  dataListSourceDocumentType: any[] = [
    { id: '1', name: 'Request Material' },
    { id: '2', name: 'Transfer' },
    { id: '3', name: 'Purchase Invoice' },
    { id: '4', name: 'Purchase Order' },
    { id: '5', name: 'Manufacturing BOM' },
    { id: '6', name: 'Direct' },
    { id: '7', name: 'Physical Count' }
  ];

  dataListSourceDocumentNumbers: any[] = [
    { id: '1', numbers: '1' },
    { id: '2', numbers: '2' },
    { id: '3', numbers: '3' },
    { id: '4', numbers: '4' }
  ];
  cdr: any;

  constructor(
    private fb: FormBuilder,
    private serviceStock: ItemsService,
    private dialog: DialogService
  ) {
    this.stockInForm = this.createFormAddStockIn(); // Initialize form in the constructor
  }

  ngOnInit(): void {
    this.getWareHousesDropDown();
    this.subscribetWareHousesDropDown();

    
    this.serviceStock.sendTransactionObs.subscribe((data: AddTransaction[]) => {
      if (this.stockInForm.valid) {
        const formValue = this.stockInForm.value;
        const formattedDate = new DatePipe('en-US').transform(formValue.date, 'yyyy-MM-dd');
        const payload = { ...formValue, date: formattedDate };
        console.log(payload);
      }
    });
    this.barcodeScanned()
  }

  

  createFormAddStockIn(): FormGroup {
    return this.fb.group({
      code: ['', Validators.required],
      date: ['', Validators.required],
      transactionType: ['IN', Validators.required],
      transactionStatus: [3, Validators.required],
      sourceDocumentType: ['', Validators.required],
      sourceDocumentNumber: ['', Validators.required],
      warehouseId: ['', Validators.required],
      note: ['', Validators.required],
      transactionDetails: this.fb.array([]),
    });
  }

  get transactionDetails(): FormArray {
    return this.stockInForm.get('transactionDetails') as FormArray;
  }

  addDebtor() {
    const transactionDetails = this.stockInForm.get('transactionDetails') as FormArray;
    const newDebtor = this.fb.group({
      itemBarcodeId: [''],
      itemId: [''],
      itemVariantId: [''],
      uomId: [''],
      quantity: [''],
      cost: [''],
      subTotal: [''],
      note: [''],
      batchNumber: [''], 
      batchExpiryDate: [''], 
    });
    transactionDetails.push(newDebtor);
  }
  

  getWareHousesDropDown() {
    this.serviceStock.getWareHousesDropDown();
  }

  subscribetWareHousesDropDown() {
    this.serviceStock.wareHousesDropDownLookup.subscribe((data: any) => {
      this.dataList = data;
    });
  }

  responseData: any = {};

  onSave() {
    const formData: AddTransaction = this.stockInForm.value;

    const mainData = {
      refNumber: this.responseData.data ? this.responseData.data.toString() : '',
      code: formData.code,
      date: formData.date,
      sourceDocumentType: formData.sourceDocumentType,
      sourceDocumentNumber: formData.sourceDocumentNumber,
      warehouseId: formData.warehouseId,
      note: formData.note,
    };

    const debtorsPayload = formData.transactionDetails.map(res => ({
      ...mainData,
      itemBarcodeId: res.itemBarcodeId,
      itemId: res.itemId,
      itemVariantId: res.itemVariantId,
      uomId: res.uomId,
      cost: res.cost,
      note: res.note,
      batchNumber: res.batchNumber,
      batchExpiryDate: res.batchExpiryDate,
    }));

    this.serviceStock.addTransaction(formData); // Pass the correct payload
  }

  onCancel() {}

  openBarcode() {
    const dialogRef = this.dialog.open(ScanbarcodeComponent, {
      width: '50%',
      height: '330px',
    });
  
    dialogRef.onClose.subscribe((result: any) => {
      if (result) {
        this.handleBarcodeScanned(result);
      }
    });
  }

  handleBarcodeScanned(data: any) {
    const transactionDetailsArray = this.stockInForm.get('transactionDetails') as FormArray;
  
    const newDebtor = this.fb.group({
      itemBarcodeId: [data.itemBarcodeId],
      itemId: [data.itemId],
      itemVariantId: [data.itemVariantId],
      uomId: [''], // املأ البيانات حسب الحاجة
      quantity: [data.quantity],
      cost: [data.cost],
      subTotal: [data.subTotal || 0],
      batchNumber: [''],
      batchExpiryDate: [''],
      note: [''],
    });
  
    transactionDetailsArray.push(newDebtor);
  
    // تحديث العرض
    this.cdr.markForCheck();
  }
  
  itemBarcodeId: string = '';

  scan(e: any) {
    console.log('Scanned value:', e.target.value);
  }
  // onScan(){
  //   t
  // }

  barcodeScanned() {
    this.serviceStock.barcodeScanned.subscribe(res=>{
      this.Datas = res 

    })
  }
  
}

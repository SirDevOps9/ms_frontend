import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { customValidators, FormsService, LanguageService, RouterService, ToasterService } from 'shared-lib';
import { SharedEnum } from '../../../models/sharedEnums';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-return-purchase',
  templateUrl: './edit-return-purchase.component.html',
  styleUrl: './edit-return-purchase.component.scss'
})
export class EditReturnPurchaseComponent {
  totalQuantity: number;
  totalOriginalQuantity: number;
  totalReturnQuantity: number;
  vatAmount: number;
  selectedLanguage: string
  rowDuplicate: number = -1;
  duplicateLine: boolean;
  vendorItems: any[];
  warehouses: any[];
  exportSelectedCols: string[] = [];
  searchTerm: string;
  addForm: FormGroup = new FormGroup({});
  showPost: boolean
  invoiceList: any
  ngOnInit(): void {

    this.initializeForm();
    this.latestVendor()
    this.latestWarehouses()
    this.initItemsData()
    this.subscribe();
    this.calculate();
  }
  calculate() {
    this.totalQuantity = 0;
    this.totalReturnQuantity = 0;
    this.totalOriginalQuantity = 0;

    this.totalQuantity = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('remainQuantity')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.totalReturnQuantity = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('returnQuantity')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.totalOriginalQuantity = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('originalQuantity')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }
  initItemsData() {
    this.PurchaseService.getLatestItems('');
  }
  latestVendor() {
    this.PurchaseService.latestVendor(undefined).subscribe((res: any) => {
      this.vendorItems = res
      if (this.addForm.get('vendorId')?.value) {
        this.setVendorData(this.addForm.get('vendorId')?.value);
      }
    })
  }
  latestWarehouses() {

    this.PurchaseService.LatestWarehouses(undefined).subscribe((res: any) => {
      this.warehouses = res
    })
  }

  onFilterVendor(SearchTerm: string) {
    this.PurchaseService.latestVendor(SearchTerm).subscribe((res: any) => {
      this.vendorItems = res
    })
  }

  setVendorData(vendorId: number) {
    this.vendorItems?.find((item) => {
      if (item.id === vendorId) {
        this.PurchaseService.invoiceLookup(undefined, vendorId, undefined)
      }
    });

  }
  onFilterItems(SearchTerm: string) {
    this.PurchaseService.getLatestItems(SearchTerm)

  }
  initializeForm() {
    this.addForm = this.fb.group({
      id: new FormControl(''),
      invoiceStatus: new FormControl(''),
      code: new FormControl(''),
      invoiceCode: new FormControl(''),
      invoiceDate: new FormControl(new Date(), [customValidators.required]),
      returnDescription: new FormControl('', [customValidators.required, customValidators.length(1, 100)]),
      warehouseId: new FormControl(''),
      warehouseName: new FormControl(''),
      vendorCode: new FormControl(''),
      currency: new FormControl(''),
      rate: new FormControl(''),
      paymentTerms: new FormControl(''),
      invoiceJournal: new FormControl(''),
      stockInId: new FormControl(''),
      stockInCode: new FormControl(''),
      journalId: new FormControl(''),
      journalCode: new FormControl(''),
      vendorId: new FormControl(''),
      vendorName: new FormControl(''),
      currencyRate: new FormControl(''),
      vendorRate: new FormControl(''),
      paymentTermId: new FormControl(''),
      paymentTermName: new FormControl(''),
      reference: new FormControl(''),
      invoiceDetails: this.fb.array([]),

    });

  }
  get invoiceDetailsFormArray() {
    return this.addForm.get('invoiceDetails') as FormArray;
  }

  setData(data: any) {
    this.addForm.patchValue({
      id: data.id,
      vendorId: data.vendorId,
      vendorName: data.vendorName,
      currencyRate: data.currencyRate,
      vendorRate: data.currencyRate,
      warehouseId: data.warehouseId,
    });
    this.invoiceDetailsFormArray.clear();
    data?.invoiceDetails?.forEach((detail: any, index: number) => {
      this.addNewRow()
      this.setRowDataById(index, detail)
    });
  }
  subscribe() {
    this.languageService.language$.subscribe((lang) => [
      this.selectedLanguage = lang
    ])
    this.PurchaseService.invoiceData.subscribe((invoiceList: any) => {
      this.invoiceList = invoiceList

    })
    this.PurchaseService.returnInvoiceData.subscribe((data: any) => {
      this.setData(data)
    })

  }
  routeToStockIn() {
    this.router.createUrlTree([`/inventory/transactions/stock-in/view/${this.addForm.get('stockInId')?.value}`])

  }
  routeTojournal() {
    this.router.createUrlTree([`/accounting/transcations/journalentry/view/${this.addForm.get('journalId')?.value}`])

  }
  setRowDataById(indexLine: number, selectedItem: any) {
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;
    // Ensure row form controls are present before updating
    if (rowForm) {
      rowForm.patchValue({

        id: selectedItem.id,
        itemCode: selectedItem.itemCode,
        description: selectedItem.description,
        uomNameEn: selectedItem.uomNameEn,
        uomNameAr: selectedItem.uomNameAr,
        remainQuantity: selectedItem.availableQuantity,
        subCost: selectedItem.subCost,
        returnQuantity: selectedItem.returnQuantity,
        originalQuantity: selectedItem.quantity,
        netCost: selectedItem.cost,
        grandTotal: selectedItem.grandTotal,
        trackingType: selectedItem.trackingType,
        hasExpiryDate: selectedItem.hasExpiryDate,
        vat: selectedItem.vatAmount,
        stockInId: selectedItem.stockInId,
        stockInCode: selectedItem.stockInCode,
        journalId: selectedItem.journalId,
        journalCode: selectedItem.journalCode



      });

      // Handle the nested form group
      const invoiceTrackingGroup = rowForm.get('invoiceTracking') as FormGroup;
      if (invoiceTrackingGroup) {
        invoiceTrackingGroup.patchValue({
          invoiceDetailId: selectedItem?.invoiceTracking?.invoiceDetailId || 0,
          vendorBatchNo: selectedItem.invoiceTracking?.vendorBatchNo || '',
          quantity: selectedItem.quantity,
          hasExpiryDate: selectedItem.hasExpiryDate,
          expireDate: selectedItem.invoiceTracking?.expireDate,
          systemPatchNo: selectedItem.invoiceTracking?.systemPatchNo || '',
          serialId: selectedItem.invoiceTracking?.serialId || null,
          trackingType: selectedItem.trackingType,
        });
      }
    }
    this.calculate();
  }

  addNewRow() {


    let newLine = this.fb.group(
      {
        id: new FormControl(0),
        itemCode: new FormControl(''),
        uomNameEn: new FormControl(''),
        uomNameAr: new FormControl(''),
        description: new FormControl(''),
        remainQuantity: new FormControl(''),
        returnQuantity: new FormControl(0),
        originalQuantity: new FormControl('',),
        netCost: new FormControl(''),
        subCost: new FormControl(''),
        vat: new FormControl(''),
        grandTotal: new FormControl(''),
        trackingType: new FormControl(''),
        hasExpiryDate: new FormControl(''),
        taxId: new FormControl(''),
        invoiceTracking: this.fb.group({
          invoiceDetailId: new FormControl(''),
          vendorBatchNo: new FormControl(''),
          quantity: new FormControl(''),
          hasExpiryDate: new FormControl(''),
          expireDate: new FormControl(''),
          systemPatchNo: new FormControl(''),
          serialId: new FormControl(''),
          trackingType: new FormControl(''),
        })

      }
    );
    this.invoiceDetailsFormArray.push(newLine);
    this.calculate();

  }

  onCancel() {
    this.routerService.navigateTo('transactions/purchase-invoice');

  }

  onSave() {

    if (!this.formsService.validForm(this.invoiceDetailsFormArray, false)) return;

    this.PurchaseService.addReturnInvoice(this.refactoredData(this.addForm.value))

  }

  setReturnQuantity(indexLine: number) {
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;
    if (rowForm.get('returnQuantity')?.value > rowForm.get('remainQuantity')?.value) {
      this.rowDuplicate = indexLine
      this.duplicateLine = true
    } else {
      this.rowDuplicate = -1
      this.duplicateLine = false
    }
    this.calculate()
  }

  async deleteRow(index: number, id: number) {



    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      // if (id == 0) {
      this.invoiceDetailsFormArray.removeAt(index);
      // }
      // else {
      //   this.PurchaseService.deleteRowReturnInvoice(id).subscribe({
      //     next: (res: any) => {
      //       this.toasterService.showSuccess(
      //         this.languageService.transalte('transactions.success'),
      //         this.languageService.transalte('transactions.deleteStockOut')
      //       );
      //       this.invoiceDetailsFormArray.removeAt(index);
      //     },
      //     error: (err: any) => {
      //       console.error('Error occurred while deleting:', err);
      //       this.toasterService.showError(
      //         this.languageService.transalte('transactions.error'),
      //         this.languageService.transalte('transactions.deleteFailed')
      //       );
      //     },
      //   });
      // }

    }

  }

  addToPost() {

  }



  refactoredData(data: any) {

    const refactoredData = {
      returnInvoiceDate: new Date(data.invoiceDate).toISOString(),
      invoiceHeaderId: data.id,
      returnDescription: data.returnDescription,
      returnInvoiceDetails: data.invoiceDetails
        .filter((detail: any) => detail.returnQuantity > 0) // Exclude items where quantity <= 0
        .map((detail: any) => ({
          quantity: detail.returnQuantity,
          invoiceDetailId: detail.id,
        })),
    };
    
    return refactoredData;

  }

  patchData(id: any) {
    this.PurchaseService.getReturnInvoiceById(id)
  }
  constructor(
    private routerService: RouterService,
    public  authService: AuthService,
    private languageService: LanguageService,
    private fb: FormBuilder,
    private formsService: FormsService,
    public  sharedEnums: SharedEnum,
    private toasterService: ToasterService,
    private PurchaseService: PurchaseTransactionsService,
    private router: Router,

  ) {
  }
}

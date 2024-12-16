import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { customValidators, FormsService, LanguageService, RouterService, ToasterService } from 'shared-lib';
import { SharedEnum } from '../../../models/sharedEnums';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  itemId: number;
  originalFormData: any;


  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['id'];
    this.initializeForm();
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
    this.PurchaseService.getReturnInvoiceByIdToEdit(this.itemId);
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
      returnInvoiceStatus: new FormControl(''),
      code: new FormControl(''),
      invoiceCode: new FormControl(''),
      invoiceDate: new FormControl(new Date(), [customValidators.required]),
      returnDescription: new FormControl('', [ customValidators.length(1, 100)]),
      warehouseId: new FormControl(''),
      warehouseName: new FormControl(''),
      vendorCode: new FormControl(''),
      currency: new FormControl(''),
      rate: new FormControl(''),
      paymentTerms: new FormControl(''),
      invoiceJournal: new FormControl(''),
      stockOutId: new FormControl(''),
      stockOutCode: new FormControl(''),
      journalId: new FormControl(''),
      journalCode: new FormControl(''),
      vendorId: new FormControl(''),
      vendorName: new FormControl(''),
      currencyRate: new FormControl(''),
      vendorRate: new FormControl(''),
      paymentTermId: new FormControl(''),
      paymentTermName: new FormControl(''),
      reference: new FormControl(''),
      invoiceHeaderCode: new FormControl(''),
      invoiceDetails: this.fb.array([]),

    });

  }
  get invoiceDetailsFormArray() {
    return this.addForm.get('invoiceDetails') as FormArray;
  }

  setData(data: any) {
    this.addForm.patchValue({
      id: data.id,
      invoiceCode: data.code,
      returnDescription: data.description,
      invoiceDate:data.returnInvoiceDate,
      warehouseName: data.warehouseName,
      vendorId: data.vendorId,
      vendorName: data.vendorName,
      currencyRate: data.currencyName,
      vendorRate: data.currencyRate,
      warehouseId: data.warehouseId,
      returnInvoiceStatus: data.returnInvoiceStatus,
      vendorCode: data.vendorCode,
      invoiceHeaderCode: data.invoiceHeaderCode,
      // warehouseId: data.warehouseId,
    });
    this.invoiceDetailsFormArray.clear();
    data?.returnInvoiceDetails?.forEach((detail: any, index: number) => {
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
    this.PurchaseService.returnItemsInvoiceData.subscribe((data: any) => {
      this.setData(data)
    })
    this.addForm.valueChanges
    .pipe(
      debounceTime(400), // تأخير قبل أن يتم تنفيذ الكود
      distinctUntilChanged() // التحقق من أن القيمة تغيرت
    )
    .subscribe((res: any) => {
      const x = this.refactoredData(this.originalFormData);
      const y = this.refactoredData(res);
      if (JSON.stringify(x) == JSON.stringify(y)) {
        this.showPost = true;
      } else {
        this.showPost = false;
      }
    });

  }
  routeToStockOut() {
    this.router.createUrlTree([`/inventory/transactions/stockout/view/${this.addForm.get('stockOutId')?.value}`])

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
        returnDescription: selectedItem.description,
        uomNameEn: selectedItem.uomNameEn,
        uomNameAr: selectedItem.uomNameAr,
        remainQuantity: selectedItem.availableQuantity,
        subCost: selectedItem.subCost,
        transactionRemainQuantity: selectedItem.transactionRemainQuantity,
        returnQuantity: selectedItem.toReturnQuantity,
        originalQuantity: selectedItem.originalQuantity,
        netCost: selectedItem.cost,
        grandTotal: selectedItem.grandTotal,
        trackingType: selectedItem.trackingType,
        hasExpiryDate: selectedItem.hasExpiryDate,
        vat: selectedItem.vatAmount,
        stockOutId: selectedItem.stockOutId,
        stockOutCode: selectedItem.stockOutCode,
        journalId: selectedItem.journalId,
        journalCode: selectedItem.journalCode



      });

      // Handle the nested form group
      const returnInvoiceTrackingGroup = rowForm.get('returnInvoiceTracking') as FormGroup;
      if (returnInvoiceTrackingGroup) {
        returnInvoiceTrackingGroup.patchValue({
          invoiceDetailId: selectedItem?.returnInvoiceTracking?.invoiceDetailId || 0,
          vendorBatchNo: selectedItem.returnInvoiceTracking?.vendorBatchNo || '',
          quantity: selectedItem.quantity,
          hasExpiryDate: selectedItem.hasExpiryDate,
          expireDate: selectedItem.returnInvoiceTracking?.expireDate,
          systemPatchNo: selectedItem.returnInvoiceTracking?.systemPatchNo || '',
          serialId: selectedItem.returnInvoiceTracking?.serialId || null,
          trackingType: selectedItem.trackingType,
        });
      }
    }
    this.originalFormData = this.addForm.value;

    this.calculate();
  }

  addNewRow() {


    let newLine = this.fb.group(
      {
        id: new FormControl(0),
        itemCode: new FormControl(''),
        uomNameEn: new FormControl(''),
        uomNameAr: new FormControl(''),
        returnDescription: new FormControl(''),
        remainQuantity: new FormControl(''),
        returnQuantity: new FormControl(0),
        transactionRemainQuantity: new FormControl(0),
        originalQuantity: new FormControl('',),
        netCost: new FormControl(''),
        subCost: new FormControl(''),
        vat: new FormControl(''),
        grandTotal: new FormControl(''),
        trackingType: new FormControl(''),
        hasExpiryDate: new FormControl(''),
        taxId: new FormControl(''),
        returnInvoiceTracking: this.fb.group({
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

    this.PurchaseService.editReturnInvoice(this.refactoredData(this.addForm.value))

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
      if (id == 0) {
      this.invoiceDetailsFormArray.removeAt(index);
      }
      else {
        this.PurchaseService.deleteRowReturnInvoice(id).subscribe({
          next: (res: any) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('messages.success'),
              this.languageService.transalte('messages.successfully')
            );
            this.invoiceDetailsFormArray.removeAt(index);
          },
          error: (err: any) => {
            this.toasterService.showError(
              this.languageService.transalte('messages.error'),
            err.message
            );
          },
        });
      }

    }

  }

  refactoredData(data: any) {

    const refactoredData = {
      returnInvoiceDate: new Date(data.invoiceDate).toISOString(),
      id: data.id,
      description: data.returnDescription,
      returnInvoiceDetails: data.invoiceDetails
        .filter((detail: any) => detail.returnQuantity > 0) // Exclude items where quantity <= 0
        .map((detail: any) => ({
          toReturnQuantity: detail.returnQuantity,
          id: detail.id,
        })),
    };
    
    return refactoredData;

  }

  patchData(id: any) {
    this.PurchaseService.getReturnInvoiceById(id)
  }
  addToPost() {
    this.PurchaseService.postReturnInvoice(this.itemId);
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
    private route: ActivatedRoute,


  ) {
  }
}


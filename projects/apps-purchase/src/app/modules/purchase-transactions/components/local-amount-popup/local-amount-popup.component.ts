import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedFinanceEnums } from 'projects/apps-finance/src/app/modules/finance/models';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { LanguageService, RouterService, FormsService, ToasterService, CurrentUserService, customValidators } from 'shared-lib';
import { PurchaseTransactionsService } from '../../purchase-transactions.service';
import { LatestItem } from '../../models';

@Component({
  selector: 'app-local-amount-popup',
  templateUrl: './local-amount-popup.component.html',
  styleUrl: './local-amount-popup.component.scss'
})
export class LocalAmountPopupComponent implements OnInit{
  latestItemsList: LatestItem[] = [];
  currentLang: string;
  rate : any;
  purchaseInvoiceForm: FormGroup = new FormGroup({});


  initLookups() {
    this.purchasetransactionsService.getLatestItemsList();
    this.purchasetransactionsService.lastestItem.subscribe((res) => {
      this.latestItemsList = res;
      if (res.length) {
        this.latestItemsList = res.map((elem: any, index: number) => ({
          ...elem,
          itemNumber: index + 1,
          displayName: `(${elem.itemCode}) ${elem.itemName}-${
            this.currentLang == 'en' ? elem.itemVariantNameEn : elem.itemVariantNameAr
          }`,
        }));
      }
    });
  }

  get stockIn() {
    return this.purchaseInvoiceForm.get('invoiceDetails') as FormArray;
  }

  initializeForm() {
    this.purchaseInvoiceForm = this.fb.group({
      invoiceDetails: this.fb.array([]),
    });
  }

  createStockIn() {
    return this.fb.group({
  
      itemId: [null, customValidators.required],
      itemCode: '',
      itemCodeName: '',
      itemVariantId: '',
      discount: 0,
      discountAmount: '',
    
      taxRatio: '',
      quantity: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],
      cost: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],
      subTotal: '',

     
      discountPercentage: '',
      vatPercentage: '',
      itemName:new FormControl(''),
     
    });
  }

  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder,
    private purchasetransactionsService: PurchaseTransactionsService,
    private router: RouterService,
    public formService: FormsService,
    public sharedFinanceEnums: SharedFinanceEnums,
    public sharedStock: SharedStock,
    private toasterService: ToasterService,
    private currentUserService: CurrentUserService,
    private config : DynamicDialogConfig,
    private ref : DynamicDialogRef
  ) {
    this.currentLang = this.languageService.getLang();
  }
  ngOnInit(): void {
    this.initLookups()
    this.initializeForm()

    if(this.config?.data?.formData?.length){
      let puchaseFormData = this.config?.data.formData;
     this.rate = this.config?.data.rate;

     console.log(puchaseFormData)


      puchaseFormData.forEach((element : any) => {
        let fbLocalForm = this.fb.group({...element})
        this.stockIn.push(fbLocalForm)
      });

      console.log(this.stockIn.value)

    }


  }

  onCancel() {
    this.ref.close()
  }
}

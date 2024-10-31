import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../../../purchase.service';

@Component({
  selector: 'app-edit-vendor-category',
  templateUrl: './edit-vendor-category.component.html',
  styleUrl: './edit-vendor-category.component.scss',
})
export class EditVendorCategoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private purchaseService  :PurchaseService,

  ) {}

  formGroup: FormGroup;
  accountsList: { id: number; name: string }[] = [];
  priceList: { id: number; name: string }[] = [];
  paymentTermsList: { id: number; name: string }[] = [];
  marketTypeList = [{ label: 'B2B' }, { label: 'B2C' }];
  id: number = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new FormControl('', customValidators.required),
      code: '',
      payableAccountId: 0,
      purchaseAccountId: 0,
      purchaseReturnAccountId: 0,
      discountAccountId: 0,
      pricePolicyId: 0,
      paymentTermId: 0,
      marketType: 0,
    });

    this.purchaseService.getChildrenAccountsDropDown();
    this.purchaseService.sendChildrenAccountsDropDownDataObservable.subscribe((res) => {
      this.accountsList = res;
    });

    this.purchaseService.getpriceListDropDown();
    this.purchaseService.sendPriceListsDropDownDataObservable.subscribe((res) => {
      this.priceList = res;
    });
    this.purchaseService.getpaymentTermsListDropDown();
    this.purchaseService.sendPaymentTermsDropDownDataObservable.subscribe((res) => {
      this.paymentTermsList = res;
    });

    this.purchaseService.getVendorCategoryByID(this.id);
    this.purchaseService.vendorCategoryDataByIDObservable.subscribe((res) => {
      this.formGroup.patchValue({ ...res });
    });
  }
 
  cancel() {
    this.routerService.navigateTo('/masterdata/vendor-category');
  }
  save() {
    if (!this.formsService.validForm(this.formGroup, false)) return;
    this.formGroup.value.id = this.id;

    this.purchaseService.EditVendorCategory(this.formGroup.value);

  }
}

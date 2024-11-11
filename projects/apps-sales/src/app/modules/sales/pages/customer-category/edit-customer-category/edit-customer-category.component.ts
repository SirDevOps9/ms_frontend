import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { SalesService } from '../../../sales.service';

@Component({
  selector: 'app-edit-customer-category',
  templateUrl: './edit-customer-category.component.html',
  styleUrl: './edit-customer-category.component.scss',
})
export class EditCustomerCategoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private salesService: SalesService,
    private formsService: FormsService,
    private routerService: RouterService,
    private route: ActivatedRoute
  ) {}

  formGroup: FormGroup;
  accountsList: { id: number; name: string }[] = [];
  priceList: { id: number; name: string }[] = [];
  paymentTermsList: { id: number; name: string }[] = [];
  marketTypeList = [{ label: 'B2B' }, { label: 'B2C' }];
  id: number = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new FormControl(null, customValidators.required),
      code: null,
      receivableAccountId: null,
      salesAccountId: null,
      salesReturnAccountId: null,
      discountAccountId: null,
      pricePolicyId: null,
      paymentTermId: null,
      marketType: null,
    });

    this.salesService.getChildrenAccountsDropDown();
    this.salesService.sendChildrenAccountsDropDownDataObservable.subscribe((res) => {
      this.accountsList = res;
    });

    this.salesService.getpriceListDropDown();
    this.salesService.sendPriceListsDropDownDataObservable.subscribe((res) => {
      this.priceList = res;
    });
    this.salesService.getpaymentTermsListDropDown();
    this.salesService.sendPaymentTermsDropDownDataObservable.subscribe((res) => {
      this.paymentTermsList = res;
    });

    this.salesService.getCustomerCategoryByID(this.id);
    this.salesService.customerCategoryDataByIDObservable.subscribe((res) => {
      console.log(res);
      this.formGroup.patchValue({ ...res });
    });
  }

  onSave() {
    if (!this.formsService.validForm(this.formGroup, false)) return;
    this.formGroup.value.id = this.id;

    this.salesService.EditCustomerCategory(this.formGroup.value);
  }
  onDiscard(){
    this.routerService.navigateTo(`/masterdata/customer-category`);
  }
}

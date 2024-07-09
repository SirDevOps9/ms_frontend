import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../general-setting.service';

@Component({
  selector: 'app-edit-customer-category',
  templateUrl: './edit-customer-category.component.html',
  styleUrl: './edit-customer-category.component.scss',
})
export class EditCustomerCategoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private generalSettingService: GeneralSettingService,
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
      priceListId: null,
      paymentTermId: null,
      marketType: null,
    });

    this.generalSettingService.getChildrenAccountsDropDown();
    this.generalSettingService.sendChildrenAccountsDropDownDataObservable.subscribe((res) => {
      this.accountsList = res;
    });

    this.generalSettingService.getpriceListDropDown();
    this.generalSettingService.sendPriceListsDropDownDataObservable.subscribe((res) => {
      this.priceList = res;
    });
    this.generalSettingService.getpaymentTermsListDropDown();
    this.generalSettingService.sendPaymentTermsDropDownDataObservable.subscribe((res) => {
      this.paymentTermsList = res;
    });

    this.generalSettingService.getCustomerCategoryByID(this.id);
    this.generalSettingService.customerCategoryDataByIDObservable.subscribe((res) => {
      console.log(res);
      this.formGroup.patchValue({ ...res });
    });
  }

  onSave() {
    if (!this.formsService.validForm(this.formGroup, false)) return;
    this.formGroup.value.id = this.id;

    this.generalSettingService.EditCustomerCategory(this.formGroup.value);
  }
}

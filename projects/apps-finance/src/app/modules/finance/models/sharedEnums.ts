import { Injectable } from '@angular/core';
import {
  commissionTypeString,
  costCenterConfig,
  OtherOptions,
  PaidBy,
  paiedDropDown,
  paymentmethodtype,
  paymentMethodTypeString,
} from './enums';
import { paymentInStatus } from '../../transcations/models';

@Injectable({
  providedIn: 'root',
})
export class SharedFinanceEnums {
  get paymentmethodtype(): typeof paymentmethodtype {
    return paymentmethodtype;
  }
  get paiedDropDown(): typeof paiedDropDown {
    return paiedDropDown;
  }
  get paymentMethodTypeString(): typeof paymentMethodTypeString {
    return paymentMethodTypeString;
  }
  get costCenterConfig(): typeof costCenterConfig {
    return costCenterConfig;
  }
  get commissionTypeString(): typeof commissionTypeString {
    return commissionTypeString;
  }
  get PaidBy(): typeof PaidBy {
    return PaidBy;
  }
  get OtherOptions(): typeof OtherOptions {
    return OtherOptions;
  }

  get PaymentInStatus(): typeof paymentInStatus {
    return paymentInStatus;
  }
}

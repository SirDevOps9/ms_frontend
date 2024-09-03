import { Injectable } from "@angular/core";
import { commissionTypeString, costCenterConfig, OtherOptions, PaidBy, paiedDropDown, paymentInStatus, paymentmethodtype, paymentMethodTypeString, paymentplaceString } from "./enums";


@Injectable({
    providedIn: 'root',
})
export class SharedFinanceTranscationEnums {
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

    get paymentplaceString(): typeof paymentplaceString {
        return paymentplaceString;
    }
    get paymentInStatus(): typeof paymentInStatus {
        return paymentInStatus;
    }
}
  

import { Injectable } from "@angular/core";
import { costCenterConfig, paiedDropDown, paymentmethodtype, paymentMethodTypeString } from "./enums";
import { commissionTypeString } from "./commissionType";


@Injectable({
    providedIn: 'root',
})
export class SharedJournalEnums {
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
}
  

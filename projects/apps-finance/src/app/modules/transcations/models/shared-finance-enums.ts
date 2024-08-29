import { Injectable } from "@angular/core";
import { paymentmethodtype, paymentplace } from "./enums";

@Injectable({
    providedIn: 'root',
})
export class SharedFinanceEnums {
    get PaymentPlace(): typeof paymentplace {
        return paymentplace;
    }

    get paymentMethodType(): typeof paymentmethodtype {
        return paymentmethodtype;
    }
}

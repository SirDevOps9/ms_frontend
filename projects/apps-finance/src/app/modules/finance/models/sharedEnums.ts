import { Injectable } from "@angular/core";
import { paiedDropDown, paymentmethodtype } from "./enums";


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
}
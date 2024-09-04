import { Injectable } from "@angular/core";
import { AccountNature } from "./account-nature";
import { BalanceType } from "./balance-type";

@Injectable({
    providedIn: 'root',
})
export class SharedPurchaseEnums {
    get BalanceType(): typeof BalanceType {
        return BalanceType;
    }

    get AccountNature(): typeof AccountNature {
        return AccountNature;
    }
}
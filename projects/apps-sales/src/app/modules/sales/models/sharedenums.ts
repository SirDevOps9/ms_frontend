import { Injectable } from "@angular/core";
import { BalanceType } from "./balancetype";
import { AccountNature } from "./account-nature";

@Injectable({
    providedIn: 'root',
})
export class SharedSalesEnums {
    get BalanceType(): typeof BalanceType {
        return BalanceType;
    }

    get AccountNature(): typeof AccountNature {
        return AccountNature;
    }
}

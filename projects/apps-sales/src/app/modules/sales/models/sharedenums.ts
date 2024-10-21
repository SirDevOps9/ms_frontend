import { Injectable } from "@angular/core";
import { AccountNature, BalanceType, ItemsQueryEnum } from ".";

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

    get ItemsQueryEnum(): typeof ItemsQueryEnum{
        return this.ItemsQueryEnum;
    }
}

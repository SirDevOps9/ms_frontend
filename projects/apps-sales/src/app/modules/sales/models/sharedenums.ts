import { Injectable } from "@angular/core";
import { AccountNature, BalanceType, GetItemsQueryEnum } from ".";

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

    get GetItemsQueryEnum(): typeof GetItemsQueryEnum{
        return GetItemsQueryEnum;
    }
}

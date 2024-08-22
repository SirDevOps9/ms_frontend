import { Injectable } from "@angular/core";
import { BalanceType } from "./balancetype";

@Injectable({
    providedIn: 'root',
})
export class SharedSalesEnums {
    get BalanceType(): typeof BalanceType {
        return BalanceType;
    }
}

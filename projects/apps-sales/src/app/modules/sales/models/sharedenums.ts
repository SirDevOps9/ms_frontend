import { Injectable } from "@angular/core";
import { BalanceType } from "./balancetype";

@Injectable({
    providedIn: 'root',
})
export class SharedJournalEnums {
    get BalanceType(): typeof BalanceType {
        return BalanceType;
    }
}

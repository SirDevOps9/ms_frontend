import { Injectable } from "@angular/core";
import { StockOutStatus } from "./stockOutStatus";

@Injectable({
    providedIn: 'root',
})
export class SharedStock {
    get stockOutStatus(): typeof StockOutStatus {
        return StockOutStatus;
    }

    
}
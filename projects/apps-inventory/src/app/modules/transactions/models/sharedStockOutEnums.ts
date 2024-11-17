import { Injectable } from "@angular/core";
import { StockOutStatus } from "./stockOutStatus";
import { StockOutTracking } from "./stockOutTracking";

@Injectable({
    providedIn: 'root',
})
export class SharedStock {
    get stockOutStatus(): typeof StockOutStatus {
        return StockOutStatus;
    }
    get StockOutTracking(): typeof StockOutTracking {
        return StockOutTracking;
    }

    
}
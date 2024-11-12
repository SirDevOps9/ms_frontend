import { Injectable } from "@angular/core";
import { TrackingStockIn } from "./trackingEnum";

@Injectable({
    providedIn: 'root',
})
export class SharedFinanceEnums {
    get TrackingStockIn(): typeof TrackingStockIn {
        return TrackingStockIn;
    }

    
}
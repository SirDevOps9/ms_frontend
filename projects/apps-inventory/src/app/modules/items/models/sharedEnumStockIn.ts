import { Injectable } from "@angular/core";
import { trackingType } from "./trackingType";

@Injectable({
    providedIn: 'root',
})
export class SharedFinanceEnums {
    get trackingType(): typeof trackingType {
        return trackingType;
    }

    
} 
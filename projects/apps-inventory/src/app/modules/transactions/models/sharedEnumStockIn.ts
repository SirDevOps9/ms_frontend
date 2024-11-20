import { Injectable } from "@angular/core";
import { trackingType } from "./trackingType";
import { OperationType } from "./OperationType";

@Injectable({
    providedIn: 'root',
})
export class SharedFinanceEnums {
    get trackingType(): typeof trackingType {
        return trackingType;
    }
    get OperationType(): typeof OperationType {
        return OperationType;
    }

    
} 
import { Injectable } from "@angular/core";
import { constCenterType } from "./costCenterType";
@Injectable({
    providedIn: 'root',
})
export class SharedCostEnums {
    get costType(): typeof constCenterType {
        return constCenterType;
    }

    
}
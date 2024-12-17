import { Injectable } from "@angular/core";
import { Tracking } from "./trackingEnum";
import { InvoiceStatus } from "./InvoiceStatusEnum";

@Injectable({
    providedIn: 'root',
})
export class SharedEnum {
  
    get Tracking(): typeof Tracking {
        return Tracking;
    }
    get InvoiceStatus(): typeof InvoiceStatus {
        return InvoiceStatus;
    }

    
}
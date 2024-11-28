import { Injectable } from "@angular/core";
import { Tracking } from "./trackingEnum";

@Injectable({
    providedIn: 'root',
})
export class SharedEnum {
  
    get Tracking(): typeof Tracking {
        return Tracking;
    }

    
}
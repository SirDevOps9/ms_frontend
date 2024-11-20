import { Injectable } from "@angular/core";
import { Pages } from "shared-lib";

@Injectable({
    providedIn: 'root',
})
export class SharedEnums {
    get Pages(): typeof Pages {
        return Pages;
    }
}
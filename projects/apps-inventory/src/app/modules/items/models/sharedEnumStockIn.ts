import { Injectable } from "@angular/core";
import { StockInOutSourceDocumentType } from "./StockInOutSourceDocumentType";

@Injectable({
    providedIn: 'root',
})
export class SharedFinanceEnums {
    get StockInOutSourceDocumentType(): typeof StockInOutSourceDocumentType {
        return StockInOutSourceDocumentType;
    }

    
}
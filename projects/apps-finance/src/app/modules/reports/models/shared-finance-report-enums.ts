import { Injectable } from "@angular/core";
import { SourceDocument } from "./source-document-dto";


@Injectable({
    providedIn: 'root',
})
export class SharedFinanceReportEnums {
    get SourceDocument(): typeof SourceDocument {
        return SourceDocument;
    }

}
  

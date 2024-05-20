import { Injectable } from "@angular/core";

import { CompanyTypes } from "projects/bussiness-owners/src/app/modules/company/models";

@Injectable({
    providedIn: 'root',
})
export class SharedBussinessOwnerEnums {
    get companyTypes(): typeof CompanyTypes {
        return CompanyTypes;
    }

 
}

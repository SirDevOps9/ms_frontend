import { Injectable } from '@angular/core';
import { CompanyTypes } from './company-type';

@Injectable({
  providedIn: 'root'
})
export class Sharedcompanyenums {

  get CompanyTypes(): typeof CompanyTypes {
    return CompanyTypes;
}
}

import { Injectable } from "@angular/core";
import { HttpService, LanguageService } from "shared-lib";

@Injectable({
    providedIn: 'root',
  })
  export class CurrentUserService {
 

    getCurrency(): number {
        // Replace with your logic to get the currency value
        return 3;
      }
    constructor(
      private httpService: HttpService,
      public languageService: LanguageService
    ) {}
  }
  
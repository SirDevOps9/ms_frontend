import { Injectable } from "@angular/core";
import { HttpService } from "./base.httpservice";
import { Observable } from "rxjs";
import { BaseDto } from "../models";
import { ResponseSubdomainDto } from "projects/bussiness-owners/src/app/modules/subscription/models";

@Injectable({
    providedIn: 'root',
  })
  export class SubdomainService {
    
    constructor(private httpService: HttpService) {        
    }

    getAllSubdomains(): Observable<ResponseSubdomainDto[]>{
        return this.httpService.get<ResponseSubdomainDto[]>('Subdomain');
    }
  }  
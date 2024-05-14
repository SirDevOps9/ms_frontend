import { Injectable } from "@angular/core";
import { HttpService } from "./base.httpservice";
import { Observable } from "rxjs";
import { BaseDto } from "../models";

@Injectable({
    providedIn: 'root',
  })
  export class SubdomainService {
    
    constructor(private httpService: HttpService) {        
    }

    getAllSubdomains(): Observable<BaseDto[]>{
        return this.httpService.get<BaseDto[]>('Subdomain');
    }
  }  
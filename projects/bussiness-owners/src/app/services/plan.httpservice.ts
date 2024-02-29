import { Observable } from "rxjs";
import { APIResponse, BaseService } from "shared-lib";
import { ResponsePlanDto } from "../models/plan/responseplandto";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class PlanService {
    private plan = `Plan`;

  
    constructor(private baseService: BaseService) {}
  

    getAll(): Observable<APIResponse<ResponsePlanDto[]>> {
      return this.baseService.get<APIResponse<ResponsePlanDto[]>>(
        `${this.plan}`
      );
    }
    
  }
  
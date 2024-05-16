import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDto, HttpService, PaginationVm } from 'shared-lib';
import { BussinessOwner, bussinesOwnerDetails } from './models';

@Injectable({
  providedIn: 'root'
})
export class BussinessOwnerProxyService {

  constructor(private baseService: HttpService) { }

  getAllPaginated(filterDto: FilterDto , quieries?:string): Observable<PaginationVm<BussinessOwner[]>> {
    
    return this.baseService.get<PaginationVm<BussinessOwner[]>>(
      `BusinessOwner?${filterDto.toQuery}&${quieries ? quieries : ''}`
    );
  }
  getBussinessGetBusinessOwnerById(id:string): Observable<bussinesOwnerDetails> {
    
    return this.baseService.get<bussinesOwnerDetails>(
      `BusinessOwner/GetBusinessOwnerById/${id}`
    );
  }
}

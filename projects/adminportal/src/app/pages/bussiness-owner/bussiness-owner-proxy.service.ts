import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDto, HttpService, PaginationVm } from 'shared-lib';
import { BussinessOwner } from './models';

@Injectable({
  providedIn: 'root'
})
export class BussinessOwnerProxyService {

  constructor(private baseService: HttpService) { }

  getAllPaginated(filterDto: FilterDto): Observable<PaginationVm<BussinessOwner[]>> {
    return this.baseService.get<PaginationVm<BussinessOwner[]>>(
      `BusinessOwner?${filterDto.toQuery}`
    );
  }
}

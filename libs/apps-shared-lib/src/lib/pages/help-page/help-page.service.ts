import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { CreateHelpPageDto } from './models/CreateHelpPageDto';

@Injectable({
  providedIn: 'root'
})
export class HelpPageService {

  constructor(
    private httpService: HttpService,) { }

  GetHelpPageByServiceId(
    serviceId: Number
  ): Observable<CreateHelpPageDto> {
    let query = `ERPHelpPage/GetHelpPageByServiceId?serviceId=${serviceId}`;
    return this.httpService.get<CreateHelpPageDto>(query);
  }
}

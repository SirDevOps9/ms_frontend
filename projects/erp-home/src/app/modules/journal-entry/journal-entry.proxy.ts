import { Injectable } from '@angular/core';
import {
  FilterDto,
  HttpService,
  PaginationVm,
} from 'shared-lib';
import { EditJournalEntry, GetJournalEntryByIdDto, JournalEntryDto } from './models';
import { JournalStatusUpdate } from './models/update-status';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JournalEntryProxy {

  getAll(): Observable<JournalEntryDto[]> {
    return this.httpService.get<JournalEntryDto[]>(
      // `Company?subscriptionId=${subscriptionId}`
      `JournalEntry`
    );
  }

  getAllPaginated(filterDto: FilterDto): Observable<PaginationVm<JournalEntryDto>> {
    console.log(filterDto);
    return this.httpService.get<PaginationVm<JournalEntryDto>>(
      `JournalEntry?${filterDto.toQuery}`
    );
  }

  getById(id:number): Observable<GetJournalEntryByIdDto> {
    return this.httpService.get<GetJournalEntryByIdDto>(
      `JournalEntry/GetById?Id=${id}`
    );
  }
  Edit(request:EditJournalEntry): Observable<boolean> {
    return this.httpService.put<boolean>(
      `JournalEntry/Edit`,
      request
    );
  }
  ChangeStatus(request:any): Observable<boolean> {
    return this.httpService.put<boolean>(
      `JournalEntry/ChangeStatus`,
      request
    );
    
  }


  constructor(private httpService: HttpService) {}
}

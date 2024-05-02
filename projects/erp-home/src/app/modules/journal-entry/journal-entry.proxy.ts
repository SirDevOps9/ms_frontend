import { Injectable } from "@angular/core";
import { FilterDto, HttpService, PaginationVm, lookupDto, lookupsListDto } from 'shared-lib';
import { JournalEntryDto } from "./models";
import { Observable } from "rxjs";
import { AddJournalEntryCommand } from "./models/addJournalEntryCommand";

@Injectable({
    providedIn : 'root'
})

export class JournalEntryProxy{
    getAll(
): Observable<JournalEntryDto[]> {
        return this.httpService.get<JournalEntryDto[]>(
          // `Company?subscriptionId=${subscriptionId}`
           `JournalEntry`
        );
      }
      getAllPaginated(
        filterDto: FilterDto
      ): Observable<PaginationVm<JournalEntryDto>> {
        console.log(filterDto);
              return this.httpService.get<PaginationVm<JournalEntryDto>>(
                 `JournalEntry?${filterDto.toQuery}`
              );
            }

      create(command: AddJournalEntryCommand):Observable<any>{
        return this.httpService.post('JournalEntry', command);
      }
      constructor(private httpService: HttpService) {}
}
import { Injectable } from "@angular/core";
import { FilterDto, HttpService, PaginationVm, lookupDto, lookupsListDto } from 'shared-lib';
import { JournalEntryDto } from "./models";
import { Observable } from "rxjs";
import { GetAllJournalTemplateDto } from "./models/journaltemplatedto";

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

      getAllJournalTemplate( 
        filterDto: FilterDto
      ): Observable<PaginationVm<GetAllJournalTemplateDto>>{
              return this.httpService.get<PaginationVm<GetAllJournalTemplateDto>>(
                `JournalEntryTemplete?${filterDto.toQuery}`
            )}


      constructor(private httpService: HttpService) {}
}
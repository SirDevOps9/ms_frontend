import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from './base.httpservice';
import { APIResponse, lookupDto, lookupsListDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LookupsService {
  private lookupsLoadedDataSource = new BehaviorSubject<boolean>(false);

  public lookupsLoaded = this.lookupsLoadedDataSource.asObservable();

  private lookupsDataSource = new BehaviorSubject<{
    [key: string]: lookupDto[];
  }>({});

  public lookups = this.lookupsDataSource.asObservable();

  private resetLookups(lookups: lookupsListDto[]) {
    let dictionary = Object.assign(
      {},
      ...lookups.map((l) => ({ [l.lookupName]: l.items }))
    );

    this.lookupsDataSource.next(dictionary);

    this.lookupsLoadedDataSource.next(true);
  }

  getLookup(name: string): lookupDto[] {
    const lookup = this.lookupsDataSource.value[name];

    return lookup;
  }

  loadLookups(names: string[]) {
    this.lookupsLoadedDataSource.next(false);
    this.httpService
      .get<APIResponse<lookupsListDto[]>>('Lookups/Lookups')
      .subscribe((response: APIResponse<lookupsListDto[]>) => {
        this.resetLookups(response.response);
      });
  }

  loadServiceLookups(url: string) {
    this.httpService
      .get<APIResponse<lookupsListDto[]>>(url)
      .subscribe((response: APIResponse<lookupsListDto[]>) => {
        this.resetLookups(response.response);
      });
  }

  constructor(private httpService: BaseService) {}
}

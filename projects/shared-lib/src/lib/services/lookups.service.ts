import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './base.httpservice';
import { APIResponse, LookupEnum, lookupDto, lookupsListDto } from '../models';

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
    // console.log("Reset");

    let dictionary = Object.assign(
      {},
      ...lookups.map((l) => ({ [l.lookupName]: l.items }))
    );
    this.lookupsDataSource.next(dictionary);
    this.lookupsLoadedDataSource.next(true);
  }

  getLookup(name: LookupEnum): lookupDto[] {
    // console.log(name, this.lookupsDataSource);
    const lookup = this.lookupsDataSource.value[name];
    // console.log(name, lookup);

    return lookup;
  }

  loadLookups(lookups: LookupEnum[]) {
    const queryParams = lookups.map((name) => `lookups=${name}`).join('&');
    this.lookupsLoadedDataSource.next(false);
    this.httpService
      .get<APIResponse<lookupsListDto[]>>('Lookup?' + queryParams)
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

  constructor(private httpService: HttpService) {}
}

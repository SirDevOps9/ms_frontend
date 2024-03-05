import { Pipe, PipeTransform } from '@angular/core';
import { LookupsService } from '../services';
import { lookupDto } from '../models';

@Pipe({
  name: 'lookups',
})
export class GetLookupPipe implements PipeTransform {
  transform(lookupName: string): lookupDto[] {
    return this.lookupsService.getLookup(lookupName);
  }

  constructor(public lookupsService: LookupsService) {}
}

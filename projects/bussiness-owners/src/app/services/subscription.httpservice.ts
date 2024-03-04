import { Observable } from 'rxjs';
import { APIResponse, BaseService } from 'shared-lib';
import { Injectable } from '@angular/core';
import { SubscriptionDto } from '../models/subscription/subscriptionDto';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private url = `Subscription`;

  constructor(private baseService: BaseService) {}

  getAll(): Observable<APIResponse<SubscriptionDto[]>> {
    return this.baseService.get<APIResponse<SubscriptionDto[]>>(`${this.url}`);
  }
}

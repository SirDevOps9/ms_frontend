import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppStoreProxy } from './app-store.proxy';
import { AppDto } from './models/appDto';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private appsDataSource = new BehaviorSubject<AppDto[]>([]);

  public apps = this.appsDataSource.asObservable();

  constructor(
    private appSotrProxy: AppStoreProxy,
  ) {}

  loadApps() {
    this.appSotrProxy.getAll().subscribe((response) => {
      this.appsDataSource.next(response);
    });
  }

}

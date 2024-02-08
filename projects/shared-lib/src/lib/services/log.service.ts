import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'any',
})
export class LogService {
  log(data: any, key: string = 'General') {
    if (!this.environment.production) {
      console.log(new Date().toLocaleTimeString(), key, data);
    }
  }

  constructor(
    public router: Router,
    @Inject('env') private environment: any,
    public route: ActivatedRoute
  ) {}
}

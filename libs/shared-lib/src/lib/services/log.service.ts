import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from './environment.service';
@Injectable({
  providedIn: 'any',
})
export class LogService {
  log(data: any, key: string = 'General') {
    if (!this.environmentService.production) {
      console.log(new Date().toLocaleTimeString(), key, data);
    }
  }

  constructor(
    public router: Router,
    private environmentService: EnvironmentService,
    public route: ActivatedRoute
  ) {}
}

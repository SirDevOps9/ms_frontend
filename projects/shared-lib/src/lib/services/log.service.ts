import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'any',
})
export class LogService {
  log(data: any, key: string = 'General') {
    if (true) {
      console.log(new Date().toLocaleTimeString(), key, data);
    }
  }

  constructor(public router: Router, public route: ActivatedRoute) {}
}

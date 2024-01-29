import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/localstorage.service';
import { StorageKeys } from '../constants/storagekeys';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard {
  constructor(public router: Router, private localStorage: StorageService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.localStorage.getItem(StorageKeys.USER_TOKEN) != null) {
      this.router.navigate(['']);
    }
    return true;
  }
}

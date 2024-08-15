import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  private previousUrl: string;
  private currentUrl: string;

  get skipLocationChange() {
    return false;
  }

  get currentParetId() {
    return this.route.parent!.snapshot.params['id'];
  }

  get currentId() {
    const value = this.route.snapshot.params['id'];
    return value;
  }
  get snapshot() {
    const value = this.route.snapshot;
    return value;
  }

  get CallBackUrl() {
    return this.route.snapshot.queryParams['callBackUrl'];
  }
  getId(){
    console.log(this.route.snapshot.params['id']);
    
    return this.route.snapshot.params['id']
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url, {
      skipLocationChange: this.skipLocationChange,
    });
  }
  refreshPage() {
    window.location.reload();
  }

  getRouteParams(paramName: string) {
    const value = this.route.snapshot.queryParams[paramName];
    return value;
  }

  queryParams(params: any): any {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  goToHomePage() {
    //if (this.environmentService.disableDxMode) this.navigateTo('/');
    document.location.href = '/';
  }
  public goToPrevious(): void {
    let previous = this.getPreviousUrl();

    if (previous)
      this.router.navigateByUrl(previous, {
        skipLocationChange: this.skipLocationChange,
      });
  }

  public getPreviousUrl() {
    console.log("sss");
    
    return this.previousUrl;
  }

  public getCurrentUrl() {
    return this.currentUrl;
  }

  public lastRouteSegement(): string {
    const segments = this.currentUrl.split('/');
    return segments[segments.length - 1];
  }

  constructor(private router: Router, public route: ActivatedRoute) {
    this.currentUrl = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }
}

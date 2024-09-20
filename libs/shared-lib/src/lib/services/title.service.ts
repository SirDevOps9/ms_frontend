import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { LanguageService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  setTitle(title: string) {
    this.titleService.setTitle(this.languageService.transalte(title));
    this.languageService.onLangChange().subscribe((res) => {
      this.titleService.setTitle(this.languageService.transalte(title));
    });
  }

  setTitleFromRoute() {
    this.router.events
      .pipe(
        filter(() => !!this.activatedRoute.snapshot),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data['pageTitle'];
        })
      )
      .subscribe((titleKey: string) => {
        if (titleKey) {
          this.setTitle(titleKey);
        }
      });
  }
  constructor(
    private titleService: Title,
    private languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
}

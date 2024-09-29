import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss',
})
export class BreadCrumbComponent implements OnInit {
  home: MenuItem | undefined;
  menuItems: MenuItem[] = [];
  langChangeSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/' };

    // Create initial breadcrumbs
    this.menuItems = this.createBreadcrumb(this.activatedRoute.root);

    // Update breadcrumbs on route change
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.menuItems = this.createBreadcrumb(this.activatedRoute.root);
    });

    // Update breadcrumbs on language change
    this.langChangeSubscription = this.languageService.onLangChange().subscribe(() => {
      this.menuItems = this.createBreadcrumb(this.activatedRoute.root);
    });
  }

  private createBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        this.languageService.getTranslation(label).subscribe((localized) => {
          breadcrumbs.push({ label: localized, routerLink: url });
        });
      }

      // Recursively create breadcrumbs for child routes
      if (child.children && child.children.length > 0) {
        return this.createBreadcrumb(child, url, breadcrumbs);
      }
    }
    return breadcrumbs;
  }

  ngOnDestroy(): void {
    // Unsubscribe from language change to prevent memory leaks
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService
  ) {}
}

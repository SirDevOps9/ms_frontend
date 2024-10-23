import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../../services';
import { Subscription } from 'rxjs';
import { BreadcrumbLabel } from 'shared-lib';

@Component({
  selector: 'lib-new-bread-crumb',
  templateUrl: './new-bread-crumb.component.html',
  styleUrls: ['./new-bread-crumb.component.scss'], // Fixed property name
})
export class NewBreadCrumbComponent implements OnInit, OnDestroy {
  home: MenuItem | undefined;
  menuItems: MenuItem[] = [];
  langChangeSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {

    // Create initial breadcrumbs
    this.menuItems = this.createBreadcrumb(this.activatedRoute.root);

    // Update breadcrumbs on route change
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
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
      const params = child.snapshot.params;
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
  
      const breadcrumbData = child.snapshot.data['breadcrumb'];
  
      if (Array.isArray(breadcrumbData)) {
        breadcrumbData.forEach((item) => {
          let localizedLabel$ = item.label ? this.languageService.getTranslation(item.label) : null;
  
          if (localizedLabel$) {
            localizedLabel$.subscribe((localized) => {
              const breadcrumbLink = item.route ? item.route.replace(':id', params['id']) : url;
              breadcrumbs.push({ ...item, label: localized, routerLink: breadcrumbLink });
            });
          } else {
            const label = typeof item.label === 'object' ? item.label.text : item.label;
            const breadcrumbLink = item.route ? item.route.replace(':id', params['id']) : url;
            breadcrumbs.push({ ...item, label: label, routerLink: breadcrumbLink });
          }
        });
      }
  
      return this.createBreadcrumb(child, url, breadcrumbs);
    }
  
    return breadcrumbs;
  }
  
 

  
  
  

  ngOnDestroy(): void {
    // Unsubscribe from language change to prevent memory leaks
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}

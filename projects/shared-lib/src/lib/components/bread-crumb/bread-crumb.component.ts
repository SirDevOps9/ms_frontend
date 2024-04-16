import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../../services';

@Component({
  selector: 'lib-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})
export class BreadCrumbComponent implements OnInit  {
 home: MenuItem | undefined;

menuItems: MenuItem[] ;
  ngOnInit(): void {
    this.menuItems = this.createBreadcrumb(this.activatedRoute.root);

    this.home ={ icon: 'pi pi-home', routerLink: '/plan' };
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(
      () => (this.menuItems = this.createBreadcrumb(this.activatedRoute.root))
    );
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
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        const localized = this.languageService.transalte(label);
        breadcrumbs.push({ label: localized, routerLink: url });
      }

      if (child.children && child.children.length > 0) {
        return this.createBreadcrumb(child, url, breadcrumbs);
      }
    }
    return breadcrumbs;
  }
  constructor(
    public languageService: LanguageService,

    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
}

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Actions, RouteFilter } from '../types';
import { AuthService } from '../services';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective {
  @Input() set appHasPermission(action: Actions) {
    let routeFilter = this.router.snapshot.data['filter'] as RouteFilter;
    routeFilter.Action = action;
    console.log('Directive', routeFilter);
    if (this.authService.hasPermission(routeFilter)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private router: ActivatedRoute
  ) {}
}

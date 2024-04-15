import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Actions, PermissionTreeNode } from '../models';
import { AuthService } from '../services';

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective {
  @Input() set appHasPermission(action: Actions) {
    console.log('Directive', action);
    if (this.checkPermission(action)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission(action: Actions): boolean {
    let tree = this.authService.getUserPermissions();
    const hasPermission = tree.some((node) => {
      const includesAction = node.Actions.includes(action);
      console.log(
        `Checking node with Actions: ${node.Actions}, includesAction: ${includesAction}`
      );
      return includesAction;
    });
    return hasPermission;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}
}

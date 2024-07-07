import { NgModule } from '@angular/core';
import {
  LoginComponent,
  LogoutRedirectComponent,
  LoginRedirectComponent,
  UnAuthorizedComponent,
} from './pages';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { loginRoutes } from './login.routes';
import { HasPermissionDirective } from './directives/hasPermission.directive';

@NgModule({
  declarations: [
    HasPermissionDirective,
    LoginComponent,
    LoginRedirectComponent,
    LogoutRedirectComponent,
    UnAuthorizedComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule.forRoot(loginRoutes),
    ReactiveFormsModule,
    MatPaginatorModule,
    TranslateModule,
  ],
  exports: [HasPermissionDirective],
})
export class MicrotecAuthLibModule {}

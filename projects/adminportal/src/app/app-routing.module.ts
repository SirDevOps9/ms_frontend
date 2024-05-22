import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from 'microtec-auth-lib';
import { LayoutComponent } from './_metronic/layout/layout.component';

export const routes: Routes = [
  {
    path: 'error',
    loadChildren: () => import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
  },
  // { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

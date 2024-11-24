import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'microtec-auth-lib';

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
  // {
  //   path: 'help-pages',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./modules/HelpPages/help-pages.module').then((m) => m.HelpPagesModule),
  // },
 
  // { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

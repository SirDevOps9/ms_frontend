import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sharedRoutes } from '../../../shared-lib/src/lib/shared.routes';
import { AuthGuard } from '../../../shared-lib/src/lib/guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  ...sharedRoutes,
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: AppComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
